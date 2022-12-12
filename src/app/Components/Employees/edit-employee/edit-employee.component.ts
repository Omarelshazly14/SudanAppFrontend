import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ILookUpData } from '../../../Data/lookup-data';
import { IEmployee } from '../../../Data/employee';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { IdentityAdminService } from '../../../Services/identity-admin.service';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private mngdataSrv: MngDataService,
    private lookupSrv: LookUpService,
    private employeeSrv: EmployeeService,
    private ids: IdentityAdminService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public sub;
  public id;
  public Title: any;
  public tableSettings: any;
  public emp: IEmployee;
  public employeeForm: NgForm;
  public genders: ILookUpData[] = [];
  public accounts: ILookUpData[] = [];
  public attachmentTypes: ILookUpData[] = [];
  public departments: ILookUpData[] = [];
  public employmentTypes: ILookUpData[] = [];
  public graduations: ILookUpData[] = [];
  public hiringStatuses: ILookUpData[] = [];
  public maritalStatuses: ILookUpData[] = [];
  public militaryStatuses: ILookUpData[] = [];
  public jobs: ILookUpData[] = [];
  public titles: ILookUpData[] = [];
  public vendors: ILookUpData[] = [];
  public closeResult = '';

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });
    this.mngdataSrv.setTitle('Employees');
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'gender')
      .subscribe(data => {
        this.genders = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'account')
      .subscribe(data => {
        this.accounts = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'attachmentType')
      .subscribe(data => {
        this.attachmentTypes = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'department')
      .subscribe(data => {
        this.departments = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'employmentType')
      .subscribe(data => {
        this.employmentTypes = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'graduation')
      .subscribe(data => {
        this.graduations = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'hiringStatus')
      .subscribe(data => {
        this.hiringStatuses = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'maritalStatus')
      .subscribe(data => {
        this.maritalStatuses = data;
      });
    this.lookupSrv.loadidname(this.mngdataSrv.getLang(), 'militaryStatus')
      .subscribe(data => {
        this.militaryStatuses = data;
      });
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
    this.getEmployee(this.id);
  }
  getEmployee(id) {
    $('#overlay').show();
    this.employeeSrv.getEmployee(id)
      .subscribe(data => {
        this.emp = data;
        $('#overlay').hide();
      });
  }
  saveEmployee(emp) {
    $('#overlay').show();
    this.employeeSrv.saveEmployee(emp.id, emp)
      .subscribe(data => {
        this.getEmployee(emp.id);
        $('#overlay').hide();
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  allowNumbersOnly(keyEvent: { which: any; keyCode: any; }) {
    var result = (keyEvent.which) ? keyEvent.which : keyEvent.keyCode;
    if (result > 31 && (result < 48 || result > 57)) {
      return false;
    } else {
      return true;
    }
  }

  emptyValidator(value: string, callback: (arg0: boolean) => void) {
    // ...your custom logic of the validator
    if (!value || value == '') {
      callback(false);
    }
    else {
      callback(true);
    }
  }

  emptyNumericValidator(value: string, callback: (arg0: boolean) => void) {
    // ...your custom logic of the validator /^[ 0-9]$/
    if (!value || !/^\d+$/.test(value) || value == '') {
      callback(false);
    }
    else {
      callback(true);
    }
  }
  createAccessAccount(employee) {
    this.ids.getAnyUserInfo2(null)
      .subscribe(data => {
        console.log(data);
      })
  }
  openAccessAccount(content) {
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
}
