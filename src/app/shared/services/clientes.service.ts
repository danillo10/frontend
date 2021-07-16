import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiHttpService } from "app/shared/services/api-http.service";
import { Constants } from "app/config/constants";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ClientesService implements Resolve<any>
{
    clientes: any[];
    cliente: any;
    onClientesChanged: BehaviorSubject<any>;
    onClienteChanged: BehaviorSubject<any>;
    routeParams: any;

    /**
     * Constructor
     *
     * @param {ApiHttpService} _apiHttpService
     * @param {Constants} _constants
     */
    constructor(
        private _apiHttpService: ApiHttpService,
        private _constants: Constants,
    )
    {
        this.onClientesChanged = new BehaviorSubject({});
        this.onClienteChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getClientes()
            ]).then(
                () => {
                    resolve(null);
                },
                reject
            );
        });
    }

    getClientes(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onClienteChanged.next(false);
                resolve(false);
            }
            else
            {
                const token = this._constants.getToken;
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    })
                };

                var requestUrl;
                if ( this.routeParams.id )
                    requestUrl = this._constants.API_ENDPOINT+"/api/v1/cliente/" + this.routeParams.id;
                else
                    requestUrl = this._constants.API_ENDPOINT+"/api/v1/cliente";

                this._apiHttpService.get(requestUrl, httpOptions)
                    .subscribe((response: any) => {
                        if(response.success && this.routeParams.id){
                            this.cliente = response.data;
                            this.onClienteChanged.next(this.cliente);
                        }
                        else if(response.success){
                            this.clientes = response.data;
                            this.onClientesChanged.next(this.clientes);
                        }
    
                        resolve(response);
                    }, reject);
            }
        });
    }

    createCliente(cliente): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const token = this._constants.getToken;
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })
            };

            this._apiHttpService.post(this._constants.API_ENDPOINT+"/api/v1/cliente", cliente, httpOptions)
                .subscribe((response: any) => {
                    if ( response.success )
                        this.clientes.push(response.data)

                    resolve(response);
                }, reject);
        });
    }

    editCliente(cliente): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const token = this._constants.getToken;
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })
            };

            this._apiHttpService.put(`${this._constants.API_ENDPOINT}/api/v1/cliente/${cliente.id}`, cliente, httpOptions)
                .subscribe((response: any) => {
                    if ( response.success )
                        this.clientes.push(response.data)

                    resolve(response);
                }, reject);
        });
    }

    deleteCliente(cliente): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const token = this._constants.getToken;
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                })
            };

            this._apiHttpService.delete(this._constants.API_ENDPOINT+"/api/v1/cliente/" + cliente.id, httpOptions)
                .subscribe((response: any) => {
                    if ( response.success )
                        this.clientes.splice(cliente.id, 1)

                    resolve(response);
                }, reject);
        });
    }
}
