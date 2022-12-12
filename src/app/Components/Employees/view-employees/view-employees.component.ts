import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { IEmployee } from '../../../Data/employee';
import { ILookUpData } from '../../../Data/lookup-data';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';

@Component({
  selector: 'app-view-employees',
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};
  public employees: IEmployee[] = [];
  public jobs: ILookUpData[] = [];
  public departments: ILookUpData[] = [];
  public titles: ILookUpData[] = [];
  public vendors: ILookUpData[] = [];
  public newEmployee: IEmployee = {
    id: 0,
    firstName: '',
    employeeStatusId: 1,
  };
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<IEmployee[]> = new Subject();

  constructor(
    // tslint:disable-next-line:variable-name
    private mngdataSrv: MngDataService,
    private lookupSrv: LookUpService,
    private _employeeService: EmployeeService,
    private _router: Router,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'job')
      .subscribe(data => {
        this.jobs = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'title')
      .subscribe(data => {
        this.titles = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'vendor')
      .subscribe(data => {
        this.vendors = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'department')
      .subscribe(data => {
        this.departments = data;
      });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.refreshEmployeesTable();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  refreshEmployeesTable() {
    this._employeeService.getEmployees()
      .subscribe(data => {
        this.employees = data;
        this.dtTrigger.next();
      },
        err => {
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
        }
      );
  }
  openEdit(employeeid) {
    //  $('.' + employeeid + '.view').toggle();
    //  $('.' + employeeid + '.edit').toggle();
    window.location.href = 'emp/' + employeeid;
  }

  updateEmployee(employee) {
    if (employee.name == '') {
      alert('please fill category name!');
      return;
    }
    const ac = (document.getElementById('ac_' + employee.id) as any).checked;
    if (ac) {
      employee.active = 1;
    } else {
      employee.active = 0;
    }
    //add roles
    this._employeeService.saveEmployee(employee.id, employee)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEmployeesTable();
        // alert('updated');
      },
        err => {
          console.log(err);
          if (err) {
            var errorStr = '';
            if (err.Id) {
              errorStr += 'Id: ' + err.join(', ');
            }
            if (err.Name) {
              errorStr += 'Name: ' + err.join(', ');
            }
            alert(errorStr);
          }
          $('#tblItems').DataTable().destroy();
          this.refreshEmployeesTable();
          // alert('error');
        });
    this.openEdit(employee.id);
  }
  addEmployee(employee: IEmployee) {
    if (employee.firstName == '') {
      alert('please fill category name!');
      return;
    }
    const ac = (document.getElementById('chkNewEmployee') as any).checked;
    if (ac) {
      employee.employeeStatusId = 1;
    } else {
      employee.employeeStatusId = 0;
    }
    employee.id = 0;
    this._employeeService.addEmployee(employee)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEmployeesTable();
        alert('Added successfully');
      },
        err => {
          console.log(err);
          if (err) {
            var errorStr = '';
            if (err.Name) {
              errorStr += 'Name: ' + err.join(', ');
            }
            alert(errorStr);
          }
          // alert('error');
        });
    this.newEmployee = {
      id: null,
      firstName: '',
      employeeStatusId: 1,
    };
  }

  //openCalcCostConfig(cat) {
  //  const modalRef = this.modalService.open(CalcCostConfigComponent);
  //  modalRef.componentInstance.category = cat;
  //}

}
