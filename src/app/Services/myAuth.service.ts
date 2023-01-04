import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Constants } from '../Data/constants';
import * as moment from "moment";
import { MngDataService } from './mng-data.service';
import { UserManager, UserManagerSettings } from 'oidc-client';

@Injectable({
    providedIn: 'root'
})
export class MyAuthService {
    private _userManager: UserManager;

    constructor(private http: HttpClient, private data: MngDataService) {
        this._userManager = new UserManager(this.idpSettings);
    }
    private get idpSettings(): UserManagerSettings {
        return {
            authority: Constants.idpAuthority,
            client_id: Constants.clientId,
            redirect_uri: `${Constants.clientRoot}/signin-callback`,
            scope: "openid profile HRapi roles",
            response_type: "code",
            post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`,
            automaticSilentRenew: true,
            silent_redirect_uri: `${Constants.clientRoot}/assets/silent-callback.html`
        }
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
