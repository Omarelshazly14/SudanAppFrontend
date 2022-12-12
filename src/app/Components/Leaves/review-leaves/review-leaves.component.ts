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
  selector: 'app-review-leaves',
  templateUrl: './review-leaves.component.html',
  styleUrls: ['./review-leaves.component.css']
})
export class ReviewLeavesComponent implements OnInit, OnDestroy {

  leaveId;
  reason;
  decision;
  closeResult = '';
  public dtOptions: DataTables.Settings = {};
  public leaves: any[] = [];
  public employees: [] = [];
  public leavesTypes: [] = [];

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
    this.data.setTitle('Requested Leaves');
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
  refreshEntitiesTable() {
    this.repo.getData('leaves', {review:-1,includes:'Employee'})
      .subscribe(data => {
        console.log(data);
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
      this.leaveId = id;
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
  reviewLeave() {
    var leave:any = {};
    leave.id = this.leaveId;
    leave.ReviewDecision = this.decision ? this.decision : false;
    leave.reviewRejectReason = this.reason;
    debugger;
    this.repo.saveElement('leaves', leave.id, leave)
      .subscribe(data => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.modalService.dismissAll();
        this.toastr.success('Great!', 'leave has been reviewed.');
        //alert('updated');
      }, err => {
        $('#tblItems').DataTable().destroy();
        this.refreshEntitiesTable();
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }

}
