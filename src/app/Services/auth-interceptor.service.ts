import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MngDataService } from './mng-data.service';
import { Constants } from '../Data/constants';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private _router: Router,
    private data: MngDataService,
    private spinner: NgxSpinnerService
  ) { }
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${idToken}`)
      });
      return next.handle(cloned).pipe(
        finalize(() => {
          this.spinner.hide();
        })
      ) as Observable<HttpEvent<any>>;;
    }
    else {
      this._router.navigate(['/login']);
      return next.handle(req);
    }
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (req.url.startsWith(Constants.apiRoot)) {
  //     return from(
  //       this._authService.getAccessToken()
  //         .then(token => {
  //           //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //           const headers = req.headers.set('Authorization', `Bearer ${token}`);
  //           const authRequest = req.clone({ headers });
  //           return next.handle(authRequest)
  //             .pipe(
  //               catchError((err: HttpErrorResponse) => {
  //                 if (err && (err.status === 401 || err.status === 403)) {
  //                   this._router.navigate(['/unauthorized']);
  //                 }
  //                 throw 'error in a request ' + err.status;
  //               })
  //             )
  //             .toPromise();
  //         })
  //     );
  //   }
  //   else {
  //     return next.handle(req);
  //   }
  // }
}
