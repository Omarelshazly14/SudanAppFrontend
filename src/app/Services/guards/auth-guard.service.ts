import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MyAuthService } from '../myAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: MyAuthService,
    private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = route.data['roles'] as Array<string>;
    if (!roles) {
      return this.checkIsUserAuthenticated();
    }
    else {
      return this.checkForAdministrator();
    }
  }
  private checkIsUserAuthenticated() {
    return this._authService.isAuthenticated();
  }
  private checkForAdministrator() {
    return this._authService.checkIfUserIsAdmin();
  }
  private redirectToUnauthorized() {
    this._router.navigate(['/unauthorized']);
    return false;
  }
}
