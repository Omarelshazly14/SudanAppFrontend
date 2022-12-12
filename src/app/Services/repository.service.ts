////import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient,/*, HttpHeaders*/ 
HttpHeaders,
HttpRequest} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { /*from,*/ Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(
    private http: HttpClient,
    //private _authService: AuthService
  ) { }
  public getData = (route: string, head?: Object): Observable<any> => {
    //alert(this.createCompleteRoute(route, environment.API_URL.api));
    var headers: any = {};
    if (head) {
      for (const [key, value] of Object.entries(head)) {
        headers[key] = String(value);
      }
    }
    const httpOptions = { headers: new HttpHeaders(headers) };
    return this.http.get(this.createCompleteRoute(route, environment.API_URL.api), httpOptions);
  }

  public saveElement = (route: string, id: any, element: any): Observable<any> => {
    return this.http.put(`${this.createCompleteRoute(route, environment.API_URL.api)}/${id}`, element)
  }

  public addElement = (route: string, element: any): Observable<any> => {
    return this.http.post(this.createCompleteRoute(route, environment.API_URL.api), element)
  }

  public addElements = (route: string, elements: any): Observable<any> => {
    return this.http.post(`${this.createCompleteRoute(route, environment.API_URL.api)}/addmany`, elements)
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}
