import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-request-permission',
  templateUrl: './request-permission.component.html',
  styleUrls: ['./request-permission.component.css']
})
export class RequestPermissionComponent implements OnInit {

  public permissionsTypes: [] = [];
  public employees: [] = [];
  public userId;

  constructor(
    public data: MngDataService,
    private employeeSrv: EmployeeService,
    private lookupSrv: LookUpService,
    private repo: RepositoryService,
    private toastr: ToastrService,
    //private modalService: NgbModal
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
  }
  calculateNumberOfDays(permissionForm: NgForm, numberOfDays: NgModel) {
    var sdate = new Date($('#startDate').val() as string);
    var edate = new Date($('#endDate').val() as string);
    var ageDifMs = edate.getTime() - sdate.getTime();
    var period = ageDifMs / (1000 * 60 * 60 * 24);// new Date(ageDifMs); // miliseconds from epoch
    //$('#Age').val(Math.abs(ageDate.getUTCFullYear() - 1970));
    //$('#Age').trigger('input'); 
    //candForm.value['Age'] = Math.abs(ageDate.getUTCFullYear() - 1970);
    permissionForm.updateModel(numberOfDays, period + 1);
  }
  public savePermission(permission: NgForm) {
    if (!permission.valid) {
      alert('errors in data!!!');
      return;
    }
    this.repo.addElement('permissions', permission.value)
      .subscribe(res => {
        this.toastr.success('Great!', 'permission has been created.');
      }, err => {
        this.toastr.error('Bad!', 'error has been occurred.');
      });
  }
  //openM(content) {
  //  alert(44);
  //  const modalRef = this.modalService.open(content);
  //  modalRef.componentInstance.name = 'World';
  //}
}
