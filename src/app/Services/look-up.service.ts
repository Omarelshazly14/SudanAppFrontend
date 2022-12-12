import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  private url = environment.API_URL;

  constructor(private http: HttpClient) { }

  add(entity: any, controller: string): Observable<any> {
    return this.http.post(this.url.api + '/' + controller, entity)
  }

  adds(entities: any, controller: string): Observable<any> {
    return this.http.post(this.url.api + '/' + controller + '/addmany', entities)
  }

  update(entity: any, controller: string): Observable<any> {
    return this.http.put(this.url.api + '/' + controller + '/' + entity.id, entity)
  }

  get(id, controller: string): Observable<any> {
    return this.http.get(this.url.api + '/' + controller + '/' + id)
  }

  gets(controller: string): Observable<any> {
    return this.http.get(this.url.api + '/' + controller)
  }

  loadidname(lang, controller: string): Observable<any> {
    return this.http.get(this.url.api + '/' + controller + "/loadidname/" + lang)
  }

  getEntityVal(id, entity) {
    var elem = entity.find(e => e.id == id);
    return elem ? elem.name : '';
  }
}
