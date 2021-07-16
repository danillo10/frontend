import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = environment.API_ENDPOINT;

    public get loggedIn(): boolean {
        return localStorage.getItem('access_token') !==  null;
    }

    public get getToken(): string {
        return localStorage.getItem('access_token');
    }
}