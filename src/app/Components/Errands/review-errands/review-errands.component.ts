import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ILookUpData } from '../../../Data/lookup-data';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-review-errands',
  templateUrl: './review-errands.component.html',
  styleUrls: ['./review-errands.component.css']
})
export class ReviewErrandsComponent implements OnInit, OnDestroy {

  errandId;
  reason;
  decision;
  closeResult = '';
  public dtOptions: DataTables.Settings = {};
  public errands: any[] = [];
  public employees: [] = [];
  public errandsTypes: [] = [];

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
    this.data.setTitle('Requested Errands');
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
  refreshEntitiesTable() {
    this.repo.getData('errands', {review:-1,includes:'Employee'})
      .subscribe(data => {
        console.log(data);
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
        alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
      });
  }

    openM(content,id,decision,reason) {
    //alert(44);
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      //const modalRef = this.modalService.open(content);
      this.errandId = id;
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
  reviewErrand() {
    var errand:any = {};
    errand.id = this.errandId;
    errand.ReviewDecision = this.decision ? this.decision : false;
    errand.reviewRejectReason = this.reason;
    debugger;
    this.repo.saveElement('errands', errand.id, errand)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.modalService.dismissAll();
        this.toastr.success('Great!', 'errand has been reviewed.');
        //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }

}
