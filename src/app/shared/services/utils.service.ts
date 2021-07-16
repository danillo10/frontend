import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiHttpService } from "app/shared/services/api-http.service";
import { Constants } from "app/config/constants";

@Injectable()
export class UtilsService
{

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
    {}

    getAddress(cep): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };

            let formatCEP = cep.replace(".", "");

            // const apiUrl = 'https://brasilapi.com.br/api/cep/v1/'+formatCEP;
            const apiUrl = `https://viacep.com.br/ws/${formatCEP}/json/`;

            this._apiHttpService.get(apiUrl, httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getBanks(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            };

            const apiUrl = 'https://brasilapi.com.br/api/banks/v1';

            this._apiHttpService.get(apiUrl, httpOptions)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
