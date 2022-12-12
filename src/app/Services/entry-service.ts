import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Data/constants';
import { MngDataService } from './mng-data.service';
import { Entry } from '../Data/Entry';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    constructor(private http: HttpClient, private data: MngDataService) {
    }

    addEntry(entry: Entry) {
        return this.http.post<any>(`${Constants.apiRoot}/api/Entry/AddEntry`, entry);
    }
}
