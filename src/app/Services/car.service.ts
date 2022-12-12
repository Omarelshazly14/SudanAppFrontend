import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../Data/Car';
import { Constants } from '../Data/constants';
import { MngDataService } from './mng-data.service';

@Injectable({
    providedIn: 'root'
})
export class CarService {

    constructor(private http: HttpClient, private data: MngDataService) {
    }

    addCar(car: Car) {
        return this.http.post<any>(`${Constants.apiRoot}/api/Car/Add`, car);
    }
}
