import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Data/constants';

@Injectable({
  providedIn: 'root'
})
export class EntriesLocsService {

  constructor(
    private http: HttpClient,
  ) { }

  getEntriesLocs() {
    return this.http.get<any>(`${Constants.apiRoot}/api/Entry/GetEntriesLastLocations`);
}

}
