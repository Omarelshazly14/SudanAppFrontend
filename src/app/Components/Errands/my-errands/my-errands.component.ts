import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IErrand } from '../../../Data/errand';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-my-errands',
  templateUrl: './my-errands.component.html',
  styleUrls: ['./my-errands.component.css']
})
export class MyErrandsComponent implements OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};
  public errands: any[] = [];
  public employees: [] = [];
  public errandsTypes: [] = [];
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
    this.data.setTitle('Errands');
    this.employeeSrv.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), 'errandType')
      .subscribe(data => {
        this.errandsTypes = data;
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
    this.repo.getData('errands', { userId: this.employeeId })
      .subscribe(data => {
        this.errands = data;
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
  openEdit(errandid) {
      $('.' + errandid + '.view').toggle();
      $('.' + errandid + '.edit').toggle();
    //window.location.href = 'emp/' + employeeid;
  }

  updateErrand(errand) {
    if (errand.startDate == '' || errand.endDate == '') {
      alert('please fill dates!');
      return;
    }
    debugger;
    this.repo.saveElement('errands', errand.id, errand)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.success('Great!', 'errand has been updated.');
         //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }
}
