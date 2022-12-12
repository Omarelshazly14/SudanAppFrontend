import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AppConfigServiceService {

  //config: Config;
  private appConfig: Config;

  constructor(
    //private http: HttpClient,
    private injector: Injector
  ) { }

  loadAppConfig() {
    let http = this.injector.get(HttpClient);

    return http.get('./assets/app-config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      })
  }

  public get config() {
    return this.appConfig;
  }
}
