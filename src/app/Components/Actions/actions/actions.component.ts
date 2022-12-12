import { HttpErrorResponse } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit, OnDestroy {

  public dtOptions: DataTables.Settings = {};
  public elements: any[] = [];
  public employees: [] = [];
  public elementsTypes: [] = []; 
  public disciplinaryActionsTypes: [] = [];
  public violationsTypes: [] = [];
  public employeeId;
  public title = 'disciplinaryAction';
  public title1 = 'Disciplinary Action';
  closeResult = '';

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
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.data.setTitle(`${this.title1}s`);
    this.employeeSrv.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), `${this.title.toLowerCase()}Type`)
      .subscribe(data => {
        this.disciplinaryActionsTypes = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), 'violationType')
      .subscribe(data => {
        this.violationsTypes = data;
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
    this.repo.getData(`${this.title}s`, { userId: this.employeeId })
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
  }
  openM(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
