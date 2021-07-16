import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/operators';

import { ClientesService } from 'app/shared/services/clientes.service';
import { ClienteModel } from 'app/shared/models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ClientesComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = ['nome', 'telefone', 'email', 'created_at', 'actions'];
    dialogRef: any;
    refresh: Subject<any> = new Subject();

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;
    public clientes: any;

    constructor(
        private _clientesService: ClientesService,
        private _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the widgets from the service
        this.setClientes();

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                    return;

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
    
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    setClientes(): void
    {
        this.clientes = this._clientesService.clientes.map(item => {
            return new ClienteModel(item);
        });
        
        this.dataSource = new FilesDataSource(this.clientes, this.paginator, this.sort);
    }

    deleteCliente(cliente): void
    {
        if (confirm("Quer mesmo deletar " + cliente.nome)) {
            this._clientesService
                .deleteCliente(cliente)
                .then((data: any) => {
                    if(data.SP) return this._matSnackBar.open(data.msg, "OK", {
                        verticalPosition: "top",
                        duration: 2000
                    });

                    this._matSnackBar.open("Cliente removido!", "OK", {
                        verticalPosition: "top",
                        duration: 2000,
                    });

                    this.setClientes();
                });
        }
    }
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {any} _clientes
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _clientes: any,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._clientes;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._clientes.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'name_social_reason':
                    [propertyA, propertyB] = [a.nome, b.nome];
                    break;
                case 'person':
                    [propertyA, propertyB] = [a.tipo, b.tipo];
                    break;
                case 'cpf_cnpj':
                    [propertyA, propertyB] = [a.contato, b.contato];
                    break;
                case 'created_at':
                    [propertyA, propertyB] = [a.dataCadastro, b.dataCadastro];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
  }