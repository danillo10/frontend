import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { ClienteModel } from 'app/shared/models/cliente.model';
import { UtilsService } from 'app/shared/services/utils.service';
import { ClientesService } from 'app/shared/services/clientes.service';
import { Estados } from 'app/shared/constants/estados/estados';
import { PlanosService } from 'app/shared/services/planos.service';
import { PlanosInterface } from 'app/shared/interfaces/planos.interface';

@Component({
  selector: 'cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class ClienteComponent implements OnInit, OnDestroy 
{
    cliente: ClienteModel;
    planos: PlanosInterface[] = [];
    pageType: string;
    clienteForm: FormGroup;
    contatoForm: FormGroup;
    estados = new Estados();

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _clientesService: ClientesService,
        private _planosService: PlanosService,
        private _utilsService: UtilsService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar
    )
    {
        // Set the default
        this.cliente = new ClienteModel();
        this.clienteForm = this.createClienteForm();

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

        // Subscribe to update product on changes
        this._clientesService.onClienteChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(cliente => {
                if (cliente)
                {
                    this.cliente = new ClienteModel(cliente);
                    this.pageType = 'edit';
                    this.clienteForm = this.createClienteForm();
                }
                else
                {
                    this.pageType = 'new';
                    this.cliente = new ClienteModel();
                }

            });
        
            this.getPlanos();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createClienteForm(): FormGroup
    {
        return this._formBuilder.group({
            id                          : [this.cliente.id],
            nome                        : [this.cliente.nome],
            email                       : [this.cliente.email],
            telefone                    : [this.cliente.telefone],
            estado                      : [this.cliente.estado],
            cidade                      : [this.cliente.cidade],
            data_nascimento             : [this.cliente.data_nascimento],
            plano_id                    : [this.cliente.plano_id],
            created_at                  : [this.cliente.created_at],
            updated_at                  : [this.cliente.updated_at]
        });
    }

    addCliente(): void
    {
        const data = this.clienteForm.getRawValue();
        this._clientesService.createCliente(data)
            .then(() => {

                this._clientesService.onClientesChanged.next(data);

                this._matSnackBar.open('Cliente adicionado!', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this._location.back();
            });
    }

    editCliente(): void
    {
        const data = this.clienteForm.getRawValue();

        this._clientesService.editCliente(data)
            .then(() => {

                this._clientesService.onClienteChanged.next(data);

                this._matSnackBar.open('Cliente editado!', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                this._location.back();
            });
    }

    getPlanos(){
        this._planosService.getPlanos()
        .subscribe((planos: any) => {
            this.planos = planos.data;
        })
    }

}