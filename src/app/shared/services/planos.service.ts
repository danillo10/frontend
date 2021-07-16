import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiHttpService } from './api-http.service';
import { Constants } from 'app/config/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanosService {

    constructor(
        public http: HttpClient, 
        private _apiHttpService: ApiHttpService,
        private _constants: Constants
    ) { }

    getPlanos(): Observable<any>{
        const token = this._constants.getToken;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }

        const requestUrl = this._constants.API_ENDPOINT+"/api/v1/plano";

        return this._apiHttpService.get(requestUrl, httpOptions)
        .pipe(res => res)
    }
}
