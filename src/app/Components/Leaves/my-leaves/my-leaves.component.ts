import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ILeave } from '../../../Data/leave';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.css']
})
export class MyLeavesComponent implements OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};
  public leaves: any[] = [];
  public employees: [] = [];
  public leavesTypes: [] = [];
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
    this.data.setTitle('Leaves');
    this.employeeSrv.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), 'leaveType')
      .subscribe(data => {
        this.leavesTypes = data;
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
    this.repo.getData('leaves', { userId: this.employeeId })
      .subscribe(data => {
        this.leaves = data;
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
  openEdit(leaveid) {
      $('.' + leaveid + '.view').toggle();
      $('.' + leaveid + '.edit').toggle();
    //window.location.href = 'emp/' + employeeid;
  }

  updateLeave(leave) {
    if (leave.startDate == '' || leave.endDate == '') {
      alert('please fill dates!');
      return;
    }
    debugger;
    this.repo.saveElement('leaves', leave.id, leave)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.success('Great!', 'leave has been updated.');
         //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }
}
