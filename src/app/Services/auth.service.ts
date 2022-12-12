import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Subject } from 'rxjs';
import { Constants } from '../Data/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  checkIfUserIsHrAdmin() {
    throw new Error('Method not implemented.');
  }
  private _userManager: UserManager;
  private _user: User;
  private _loginChangedSubject = new Subject<boolean>();

  public loginChanged = this._loginChangedSubject.asObservable();

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
  constructor() {
    this._userManager = new UserManager(this.idpSettings);
    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });
  }
  public login = () => {
    return this._userManager.signinRedirect();
  }
  public loginRedirect = (url) => {
    return this._userManager.signinRedirect(url);
  }
  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._user = user;
        this._loginChangedSubject.next(this.checkUser(user));
        return user;
      })
  }
  public logout = () => {
    this._userManager.signoutRedirect();
  }
  public finishLogout = () => {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }
  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        if (this._user !== user) {
          this._loginChangedSubject.next(this.checkUser(user));
        }
        this._user = user;
        return this.checkUser(user);
      })
  }
  public getAccessToken = (): Promise<string> => {
    return this._userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.access_token : null;
      })
  }
  private checkUser = (user: User): boolean => {
    return !!user && !user.expired;
  }
  public checkIfUserIsAdmin = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        //return user?.profile.role === 'hrAdminRole';
        return user?.profile?.role?.includes('hrAdmin');
      })
  }
  public checkIfUserIsHR = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        //return user?.profile.role === 'hrAdminRole';
        return user?.profile?.role?.includes('hr');
      })
  }
  public checkIfUserIsOfficer = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        //return user?.profile.role === 'hrAdminRole';
        return user?.profile?.role?.includes('Officer');
      })
  }
  public getUser = (): Promise<any> => {
    return this._userManager.getUser()
      .then(user => {
        //return user?.profile.role === 'hrAdminRole';
        return user;
      })
  }
}
