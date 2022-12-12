import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from '../Data/constants';
import * as moment from "moment";
import { MngDataService } from './mng-data.service';

@Injectable({
    providedIn: 'root'
})
export class MyAuthService {

    constructor(private http: HttpClient, private data: MngDataService) {
    }

    login(userName: string, password: string) {
        return this.http.post<any>(`${Constants.apiRoot}/api/Admin/login`, { userName, password, "Role": "administrator" });
    }
    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    isAuthenticated() {
        return this.data.isUserAuthenticated;
    }
    checkIfUserIsAdmin() {
        return this.data.isUserAdmin;
    }
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }
}
