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
  selector: 'app-approve-swap',
  templateUrl: './approve-swap.component.html',
  styleUrls: ['./approve-swap.component.css']
})
export class ApproveSwapComponent implements OnInit, OnDestroy {

  elementId;
  reason;
  decision;
  closeResult = '';
  public dtOptions: DataTables.Settings = {};
  public elements: any[] = [];
  public employees: [] = [];
  public elementsTypes: [] = [];
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
    private modalService: NgbModal,
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
  refreshEntitiesTable() {
    this.repo.getData(`${this.title}s`, { approve: -1, includes: 'Employee,EmployeeSwapped,Accepter' })
      .subscribe(data => {
        console.log(data);
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
        alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
      });
  }

  openM(content, id, decision, reason) {
    //alert(44);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    //const modalRef = this.modalService.open(content);
    this.elementId = id;
    this.decision = decision;
    this.reason = reason;
    //alert(55);
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
  approveElement() {
    var element: any = {};
    element.id = this.elementId;
    element.approvalDecision = this.decision ? this.decision : false;
    element.approvalRejectReason = this.reason;
    debugger;
    this.repo.saveElement(`${this.title.toLowerCase()}s`, element.id, element)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.modalService.dismissAll();
        if (element.approvalDecision) {
          this.toastr.success('Great!', `${this.title.toLowerCase()} has been approved.`);
        }
        else {
          this.toastr.warning('Be aware!', `${this.title.toLowerCase()} has been rejected.`);
        }
        //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }
}
