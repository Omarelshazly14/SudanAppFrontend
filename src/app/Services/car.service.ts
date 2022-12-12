import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Data/constants';
import { MngDataService } from './mng-data.service';
import { Car } from '../Data/Car';

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
