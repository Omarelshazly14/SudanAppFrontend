import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../Data/constants';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CarOwner } from '../Data/carOwner';


@Injectable({
    providedIn: 'root'
})
export class CarOwnerService {

    private apiServer = Constants.apiRoot;

    constructor(private httpClient: HttpClient) { }
    create(owner): Observable<CarOwner> {
        return this.httpClient.post<CarOwner>(this.apiServer + '/api/CarOwner/Add', owner)
            .pipe(
                catchError(this.errorHandler)
            )
    }
    getById(id): Observable<CarOwner> {
        return this.httpClient.get<CarOwner>(this.apiServer + '/api/CarOwner/GetCarOwnerById?ownerId=' + id)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    getAll(listId, pageNumber): Observable<CarOwner[]> {
        return this.httpClient.get<CarOwner[]>(this.apiServer + `/api/CarOwner?ListId=${listId}&PageNumber=${pageNumber}`)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    update(id, owner): Observable<CarOwner> {
        return this.httpClient.put<CarOwner>(this.apiServer + '/api/CarOwner/Update/' + id, owner)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    delete(id) {
        return this.httpClient.delete<CarOwner>(this.apiServer + '/api/CarOwner/' + id)
            .pipe(
                catchError(this.errorHandler)
            )
    }
    getAllOwnerCodes() {
        return this.httpClient.get<any>(this.apiServer + '/api/CarOwner/GetAllCarOwnerCodes')
            .pipe(
                catchError(this.errorHandler)
            )
    }
    errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}