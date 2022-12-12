import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = environment.API_URL;

  constructor(private http: HttpClient) { }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.url.api + '/employees', employee)
  }

  addEmployees(employees: any): Observable<any> {
    return this.http.post(this.url.api + '/employees/addmany', employees)
  }

  getEmployee(id: any): Observable<any> {
    return this.http.get(this.url.api + '/employees/' + id)
  }

  saveEmployee(id: any, employee: any): Observable<any> {
    debugger;
    return this.http.put(this.url.api + '/employees/' + id, employee)
  }

  getEmployees(employeeStatus?: any, includes?: any): Observable<any> {
    var headers: any = {};
    if (includes) {
      //if (includes.includes('Vendors')) {
      //  includes += ',Vendors';
      //}
      headers['includes'] = includes;
    }
    //else {
    //  headers['includes'] = 'vendors';
    //}
    if (employeeStatus) headers['employeeStatus'] = employeeStatus + '';
    return this.http.get(this.url.api + '/employees/', { headers: headers })
  }
}
