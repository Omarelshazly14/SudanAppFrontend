import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { RepositoryService } from '../../../Services/repository.service';

@Component({
  selector: 'app-request-swap',
  templateUrl: './request-swap.component.html',
  styleUrls: ['./request-swap.component.css']
})
export class RequestSwapComponent implements OnInit {

  public elementsTypes: [] = [];
  public employees: [] = [];
  public userId;
  public title = 'Swap';

  constructor(
    public data: MngDataService,
    private employeeSrv: EmployeeService,
    private lookupSrv: LookUpService,
    private repo: RepositoryService,
    private toastr: ToastrService,
    //private modalService: NgbModal
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
  }
  public saveElement(element: NgForm) {
    if (!element.valid) {
      alert('errors in data!!!');
      return;
    }
    this.repo.addElement(`${this.title}s`, element.value)
      .subscribe(res => {
        this.toastr.success('Great!', `${this.title.toLowerCase()} has been created.`);
        element.resetForm();
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
