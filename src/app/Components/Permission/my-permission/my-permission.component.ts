import { HttpErrorResponse } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-my-permission',
  templateUrl: './my-permission.component.html',
  styleUrls: ['./my-permission.component.css']
})
export class MyPermissionComponent implements OnInit, OnDestroy{

  public dtOptions: DataTables.Settings = {};
  public permissions: any[] = [];
  public employees: [] = [];
  public permissionsTypes: [] = [];
  public employeeId;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  public dtTrigger: Subject<any[]> = new Subject();

  constructor(
    public data: MngDataService,
    private repo: RepositoryService,
    private lookupSrv: LookUpService,
    private _router: Router,
    private employeeSrv: EmployeeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.data.setTitle('Permissions');
    this.employeeSrv.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), 'permissionType')
      .subscribe(data => {
        this.permissionsTypes = data;
      });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.refreshEntitiesTable();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  refreshBySelectChange() {
    $('#tblItems').DataTable().destroy();
    this.refreshEntitiesTable();
  }
  refreshEntitiesTable() {
    debugger;
    this.repo.getData('permissions', { userId: this.employeeId })
      .subscribe(data => {
        this.permissions = data;
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
  openEdit(permissionid) {
    $('.' + permissionid + '.view').toggle();
    $('.' + permissionid + '.edit').toggle();
    //window.location.href = 'emp/' + employeeid;
  }

  updatePermission(permission) {
    if (permission.scheduledTime == '' || permission.scheduledDay == '') {
      alert('please fill dates!');
      return;
    }
    debugger;
    this.repo.saveElement('permissions', permission.id, permission)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.success('Great!', 'permission has been updated.');
        //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }
}
