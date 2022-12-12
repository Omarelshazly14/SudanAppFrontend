import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { NgForm, NgModel } from '@angular/forms';
import { RepositoryService } from '../../../Services/repository.service';
import { ToastrService } from 'ngx-toastr';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { AddEmployeeComponent } from '../../Employees/add-employee/add-employee.component';

@Component({
  selector: 'app-request-leaves',
  templateUrl: './request-leaves.component.html',
  styleUrls: ['./request-leaves.component.css']
})
export class RequestLeavesComponent implements OnInit {

  public leavesTypes: [] = [];
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
    this.employeeSrv.getEmployees()
      .subscribe(data => {
        this.employees = data;
      });
    this.lookupSrv.loadidname(this.data.getLang(), 'leaveType')
      .subscribe(data => {
        this.leavesTypes = data;
      });
  }
  calculateNumberOfDays(leaveForm: NgForm, numberOfDays: NgModel) {
    var sdate = new Date($('#startDate').val() as string);
    var edate = new Date($('#endDate').val() as string);
    var ageDifMs = edate.getTime() - sdate.getTime();
    var period = ageDifMs/(1000 * 60 * 60 * 24);// new Date(ageDifMs); // miliseconds from epoch
    //$('#Age').val(Math.abs(ageDate.getUTCFullYear() - 1970));
    //$('#Age').trigger('input');
    //candForm.value['Age'] = Math.abs(ageDate.getUTCFullYear() - 1970);
    leaveForm.updateModel(numberOfDays, period + 1);
  }
  public saveLeave(leave: NgForm) {
    if (!leave.valid) {
      alert('errors in data!!!');
      return;
    }
    this.repo.addElement('leaves', leave.value)
      .subscribe(res => {
        this.toastr.success('Great!', 'leave has been created.');
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
