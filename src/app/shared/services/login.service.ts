import { Injectable } from '@angular/core';

import { ApiHttpService } from "app/shared/services/api-http.service";
import { Constants } from "app/config/constants";

@Injectable()
export class LoginService {
    /**
     * Constructor
     *
     * @param {ApiHttpService} _apiHttpService
     * @param {Constants} _constants
     */
    constructor(
        private _apiHttpService: ApiHttpService,
        private _constants: Constants
    ) { }

	public doLogin(values): Promise<any> {
		return new Promise((resolve, reject) => {
			this._apiHttpService.post(this._constants.API_ENDPOINT+"/api/login", values)
				.subscribe((data: any) => {
                    localStorage.setItem('access_token', data.token);
                    resolve(true);
                },
                reject);
		});
    }

	public doLogout(): Promise<any> {
		return new Promise((resolve, reject) => {
			this._apiHttpService.get(this._constants.API_ENDPOINT+"/api/logout")
				.subscribe((data: any) => {
                    alert(data);
                    resolve(true);
                },
                reject);
		});
    }
}