import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../Data/Car';
import { Constants } from '../Data/constants';
import { MngDataService } from './mng-data.service';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private apiServer = Constants.apiRoot;

    constructor(private httpClient: HttpClient, private data: MngDataService) {
    }

    addCar(car: Car) {
        return this.httpClient.post<any>(this.apiServer + `/api/Car/Add`, car);
    }

    // create(car: Car): Observable<any> {
    //     return this.httpClient.post<any>(this.apiServer + '/api/Car/Add', JSON.stringify(car))
    //         .pipe(
    //             catchError(this.errorHandler)
    //         )
    // }
    getById(id): Observable<any> {
        return this.httpClient.get<any>(this.apiServer + '/api/Car/GetCarById?carId=' + id)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    getAll(listId, pageNumber): Observable<any> {
        return this.httpClient.get<any[]>(this.apiServer + `/api/Car?ListId=${listId}&PageNumber=${pageNumber}`)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    update(id, car): Observable<Car> {
        return this.httpClient.put<any>(this.apiServer + '/api/Car/' + id, car)
            .pipe(
                catchError(this.errorHandler)
            )
    }

    delete(id) {
        return this.httpClient.delete<Car>(this.apiServer + '/api/Car/' + id)
            .pipe(
                catchError(this.errorHandler)
            )
    }
    getCarsDropDown() {
        return this.httpClient.get<any>(`${Constants.apiRoot}/api/Car/GetAllCarsDropDown`)
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
