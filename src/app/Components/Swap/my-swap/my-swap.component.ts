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
  selector: 'app-my-swap',
  templateUrl: './my-swap.component.html',
  styleUrls: ['./my-swap.component.css']
})
export class MySwapComponent implements OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};
  public elements: any[] = [];
  public employees: [] = [];
  public elementsTypes: [] = [];
  public employeeId;
  public title = 'Swap';

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
    this.data.setTitle(`${this.title}s`);
    this.employeeSrv.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), `${this.title.toLowerCase()}Type`)
      .subscribe(data => {
        this.elementsTypes = data;
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
    this.repo.getData(`${this.title}s`, { userId: this.employeeId, includes: 'EmployeeSwapped' })
      .subscribe(data => {
        this.elements = data;
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
  openEdit(elementid) {
    $('.' + elementid + '.view').toggle();
    $('.' + elementid + '.edit').toggle();
    //window.location.href = 'emp/' + employeeid;
  }

  updateElement(element) {
    if (element.scheduledTime == '' || element.scheduledDay == '') {
      alert('please fill dates!');
      return;
    }
    debugger;
    this.repo.saveElement(`${this.title}s`, element.id, element)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.success('Great!', `${this.title.toLowerCase()} has been updated.`);
        //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }
  resetElement() {
    $('#tblItems').DataTable().destroy();
    this.refreshEntitiesTable();
    this.toastr.info('Be Aware!', `${this.title.toLowerCase()} has'nt been updated.`);
  }
}
