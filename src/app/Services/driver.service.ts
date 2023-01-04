import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Data/constants';
import { MngDataService } from './mng-data.service';
import { Driver } from '../Data/Driver';

@Injectable({
    providedIn: 'root'
})
export class DriverService {

    constructor(private http: HttpClient, private data: MngDataService) {
    }

    addDriver(driver: Driver) {
        return this.http.post<any>(`${Constants.apiRoot}/api/Employee/RegisterDriver`, driver);
    }
    getDriversDropDown() {
        return this.http.get<any>(`${Constants.apiRoot}/api/Driver/GetAllDriversDropDown`)
    }
}
