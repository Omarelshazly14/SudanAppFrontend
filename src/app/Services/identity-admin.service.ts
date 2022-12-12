import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppConfigServiceService } from './app-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class IdentityAdminService {

  private authority: string;
  private admin_api_url: string;

  constructor(
    private http: HttpClient,
    private environment2: AppConfigServiceService,
  ) {
    this.authority = environment2.config.ADMIN_API.url;
    this.admin_api_url = environment2.config.ADMIN_API.api_url;
  }
  public getAnyUserInfo = (form: any): Observable<any> => {
    //alert(this.createCompleteRoute(route, environment.API_URL.api));
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let credent = {
      client_id: 'ClientIdadmin_api_swaggerui',
      client_secret: 'b830c0d2-a47a-fa04-e758-6ca605c0ac6c',
      grant_type: 'password',
      username: 'salama',
      password: 'Aa!1Aa!1',
      scope: 'ClientIdadmin_api',
    };
    let scredent = new URLSearchParams(Object.entries(credent)).toString();
    return from(
      this.http.post(this.authority + '/connect/token', scredent, options)
        .pipe(mergeMap((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`);
          return this.http.get(this.admin_api_url + '/Users/feee0eee-2fa2-4bd9-bbec-29287121025c', { headers: headers }).toPromise();
        }))
    );
  }
  public getAnyUserInfo2 = (form: any): Observable<any> => {
    //alert(this.createCompleteRoute(route, environment.API_URL.api));
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let credent = {
      client_id: 'ClientIdadmin_api_swaggerui',
      //client_secret: 'b830c0d2-a47a-fa04-e758-6ca605c0ac6c',
      grant_type: 'implicit',
      callback_url: 'https://localhost:44302/swagger/oauth2-redirect.htm',
      response_type: 'id_token token',
      redirect_uri:'',
      username: 'salama',
      password: 'Aa!1Aa!1',
      scope: 'ClientIdadmin_api',
    };
    let scredent = new URLSearchParams(Object.entries(credent)).toString();
    return from(
      this.http.get(this.authority + '/connect/authorize?'+ scredent)
        .pipe(mergeMap((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token.access_token}`);
          return this.http.get(this.admin_api_url + '/Users/feee0eee-2fa2-4bd9-bbec-29287121025c', { headers: headers }).toPromise();
        }))
    );
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
