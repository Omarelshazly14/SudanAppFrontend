import { Component, Input, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { HotTableRegisterer } from '@handsontable/angular';
//import { debug } from 'console';
import Handsontable from 'handsontable';
//import { Observable } from 'rxjs';
import { ILookUpData } from '../../../Data/lookup-data';
import { EmployeeService } from '../../../Services/employee.service';
import { LookUpService } from '../../../Services/look-up.service';
import { MngDataService } from '../../../Services/mng-data.service';
import { CustomEditor } from '../../../../assets/js/custom.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  //@Input() name;
  Title: any;
  tableSettings: any;
  hot: any;
  public genders: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public accounts: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public attachmentTypes: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public departments: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public employmentTypes: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public graduations: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public hiringStatuses: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public maritalStatuses: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public militaryStatuses: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public jobs: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public titles: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];
  public vendors: /*Observable<ILookUpData[]>;//*/ILookUpData[] = [];

  constructor(
    private router: Router,
    private mngdataSrv: MngDataService,
    private lookupSrv: LookUpService,
    private employeeSrv: EmployeeService,
    //public activeModal: NgbActiveModal
  ) { }
  private hotRegisterer = new HotTableRegisterer();
  id = 'hotInstance';
  ngOnInit(): void {
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
    this.tableSettings = {
      rowHeaders: true,
      columns: [
        { data: 'd', type: 'text' },
      ],
      licenseKey: 'non-commercial-and-evaluation',
      colHeaders:
        ["."],
    };
    var hotElem = document.getElementById('hot');
    this.hot = new Handsontable(hotElem, this.tableSettings);
    $(document).ready(() => {
      setTimeout(() => {
        this.tableSettings = this.setTableSettings(this.genders, this.departments, this.employmentTypes, this.graduations, this.hiringStatuses, this.maritalStatuses, this.militaryStatuses, this.jobs, this.titles, this.vendors);
        this.hot.updateSettings(this.tableSettings);
      }, 1000);
      Handsontable.validators.registerValidator('empty.validation', this.emptyValidator);
      Handsontable.validators.registerValidator('empty.numeric.validation', this.emptyNumericValidator);
    });
  }
  dataset: any = [
    {
     id: 1,
     flag: "EUR",
     currencyCode: "EUR",
     currency: "Euro",
     level: 0.9033,
     units: "EUR / USD",
     asOf: "08/19/2019",
     onedChng: 0.0026
    },
    {
     id: 2,
     flag: "JPY",
     currencyCode: "JPY",
     currency: "Japanese Yen",
     level: 124.387,
     units: "JPY / USD",
     asOf: "08/19/2019",
     onedChng: 0.0001
    }
  ];

  calculateAge(empForm: NgForm, age: NgModel) {
    var birthdate = new Date($('#birthDate').val() as string);
    var ageDifMs = Date.now() - birthdate.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    empForm.updateModel(age, Math.abs(ageDate.getUTCFullYear() - 1970))
  }
  saveEmployee(empForm: NgForm): void {
    if (empForm.invalid) {
      return;
    }
    var newObj: any = new Object();
    for (var key in empForm.value) {
      newObj[key] = empForm.value[key];
    }
    debugger;
    this.dataset.push(newObj);
    this.hot.loadData(this.dataset);
    var countRows = this.hot.countSourceRows() - 1;
    var countCols = this.hot.countCols() - 1;
  }
  saveEmployees(): void {
    debugger;
    var employees: any[] = [];
    //convert array to employees array
    //var countRows = this.hotRegisterer.getInstance(this.id).countSourceRows() - 1;
    var countRows = this.hot.countSourceRows() - 1;
    var countCols = this.hot.countCols() - 1;
    if (countRows < 0) {
      alert('please add data!!');
      return;
    }
    this.hot.validateCells((valid) => {
      if (false) {
        alert('some data is invalid please review data!!');
        return;
        // ... code for validated cells
      }
      else if(true) {
        var cols: any = this.hot.getSettings().columns;//(0, 0, countRows, countCols);
        var dset = this.hot.getData(0, 0, countRows, countCols);
        console.log(dset);
        for (var i = 0; i < dset.length; i++) {
          var obj: any = {};
          for (var j = 0; j < cols.length; j++) {
            var col = cols[j].data;
           switch (col) {
             case 'genderId':
               switch (dset[i][j]) {
                 case 'ذكر':
                   obj[col] = 1;
                   break;
                 case 'أنثى':
                   obj[col] = 2;
                   break;
                 default:
                   obj[col] = null;
               }
               break;
             case 'maritalStatusId':
               switch (dset[i][j]) {
                 case 'أعزب':
                   obj[col] = 1;
                   break;
                 case 'متزوج':
                   obj[col] = 2;
                   break;
                 case 'مطلق':
                   obj[col] = 3;
                   break;
                 case 'أرمل':
                   obj[col] = 4;
                   break;
                 default:
                   obj[col] = null;
               }
               break;
             case 'militaryStatusId':
               switch (dset[i][j]) {
                 case 'غير مطلوب':
                   obj[col] = 1;
                   break;
                 case 'مؤجل':
                   obj[col] = 2;
                   break;
                 case 'مطلوب':
                   obj[col] = 3;
                   break;
                 default:
                   obj[col] = null;
               }
               break;
             case 'graduationId':
               switch (dset[i][j]) {
                 case 'طالب':
                   obj[col] = 1;
                   break;
                 case 'متوسط':
                   obj[col] = 2;
                   break;
                 case 'عالي':
                   obj[col] = 3;
                   break;
                 case 'بدون':
                   obj[col] = 4;
                   break;
                 default:
                   obj[col] = null;
               }
               break;
             case 'vendors':
               switch (dset[i][j]) {
                 case 'MEK':
                   obj[col] = [{ id: 1 }];
                   break;
                 case 'Call Center':
                   obj[col] = [{ id: 1 }];
                   break;
                 case 'Operation':
                   obj[col] = [{ id: 1 }];
                   break;
                 default:
                   obj[col] = null;
               }
               break;
             case 'assignedToId':
               switch (dset[i][j]) {
                 case 'salama':
                   obj[col] = '332a414d-ebf2-4cfa-9f34-1f2aee9c05af';
                   break;
                 default:
                   obj[col] = '332a414d-ebf2-4cfa-9f34-1f2aee9c05af';
               }
               break;
             default:
               obj[col] = dset[i][j];
           }
            obj[col] = dset[i][j];
          }
          employees.push(obj);
        }
        console.log(employees);
        this.employeeSrv.addEmployees(employees)
          .subscribe((res: any) => {

          });
      }
    })


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

  setTableSettings(genders, departments, employmentTypes, graduations, hiringStatuses, maritalStatuses, militaryStatuses, jobs, titles, vendors) {
    return {
      rowHeaders: true,
      height: '40vh',
      allowInsertColumn: true,
      allowInsertRow: true,
      allowRemoveColumn: true,
      allowRemoveRow: true,
      autoWrapRow: true,
      autoWrapCol: true,
      stretchH: "all",
      manualRowResize: true,
      manualColumnResize: true,
      manualRowMove: true,
      manualColumnMove: true,
      // rowHeaders: true,
      dropdownMenu: true,
      filters: true,
      contextMenu: true,
      columns: [
        { data: 'empCode', type: 'text'},
        { data: 'firstName', type: 'text', validator: 'empty.validation' },
        { data: 'secondName', type: 'text' },
        { data: 'lastName', type: 'text', validator: 'empty.validation' },
        {
          data: 'genderId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && genders.find(x => x.id == value)) {
                td.innerHTML = genders.find(x => x.id == value).name;
              }
              else {
                value = genders && genders.length > 0 && genders.find(x => x.name.toLowerCase() == value.toLowerCase()) ? genders.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
              //td.innerHTML = value && genders.find(x => x.id == value) ? genders.find(x => x.id == value).name : '';
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(genders),

        },
        { data: 'mobile1', type: 'text', validator: 'empty.validation' },
        { data: 'mobile2', type: 'text' },
        { data: 'email', type: 'text' },
        { data: 'birthDate', type: 'date', dateFormat: 'YYYY-MM-DD' },
        {
          data: 'maritalStatusId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && maritalStatuses.find(x => x.id == value)) {
                td.innerHTML = maritalStatuses.find(x => x.id == value).name;
              }
              else {
                value = maritalStatuses && maritalStatuses.length > 0 && maritalStatuses.find(x => x.name.toLowerCase() == value.toLowerCase()) ? maritalStatuses.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(maritalStatuses),
        },
        {
          data: 'militaryStatusId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && militaryStatuses.find(x => x.id == value)) {
                td.innerHTML = militaryStatuses.find(x => x.id == value).name;
              }
              else {
                value = militaryStatuses && militaryStatuses.length > 0 && militaryStatuses.find(x => x.name.toLowerCase() == value.toLowerCase()) ? militaryStatuses.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(militaryStatuses),
        },
        { data: 'nationalID', type: 'numeric' },
        { data: 'region', type: 'text' },
        {
          data: 'graduationId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && graduations.find(x => x.id == value)) {
                td.innerHTML = graduations.find(x => x.id == value).name;
              }
              else {
                value = graduations && graduations.length > 0 && graduations.find(x => x.name.toLowerCase() == value.toLowerCase()) ? graduations.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(graduations),
        },
        { data: 'qualification', type: 'text', validator: 'empty.validation' },
        { data: 'hiringDate', type: 'date', dateFormat: 'YYYY-MM-DD' },
        {
          data: 'hiringStatusId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && hiringStatuses.find(x => x.id == value)) {
                td.innerHTML = hiringStatuses.find(x => x.id == value).name;
              }
              else {
                value = hiringStatuses && hiringStatuses.length > 0 && hiringStatuses.find(x => x.name.toLowerCase() == value.toLowerCase()) ? hiringStatuses.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(hiringStatuses),
        },
        {
          data: 'jobId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && jobs.find(x => x.id == value)) {
                td.innerHTML = jobs.find(x => x.id == value).name;
              }
              else {
                value = jobs && jobs.length > 0 && jobs.find(x => x.name.toLowerCase() == value.toLowerCase()) ? jobs.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(jobs),
        },
        {
          data: 'titleId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && titles.find(x => x.id == value)) {
                td.innerHTML = titles.find(x => x.id == value).name;
              }
              else {
                value = titles && titles.length > 0 && titles.find(x => x.name.toLowerCase() == value.toLowerCase()) ? titles.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(titles),
        },
        {
          data: 'departmentId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && departments.find(x => x.id == value)) {
                td.innerHTML = departments.find(x => x.id == value).name;
              }
              else {
                value = departments && departments.length > 0 && departments.find(x => x.name.toLowerCase() == value.toLowerCase()) ? departments.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(departments),
        },
        {
          data: 'employeeTypeId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && employmentTypes.find(x => x.id == value)) {
                td.innerHTML = employmentTypes.find(x => x.id == value).name;
              }
              else {
                value = employmentTypes && employmentTypes.length > 0 && employmentTypes.find(x => x.name.toLowerCase() == value.toLowerCase()) ? employmentTypes.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(employmentTypes),
        },
        {
          data: 'vendorId',
          type: 'handsontable',
          renderer(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.dom.empty(td);
            if (value) {
              debugger;
              if (value && vendors.find(x => x.id == value)) {
                td.innerHTML = vendors.find(x => x.id == value).name;
              }
              else {
                value = vendors && vendors.length > 0 && vendors.find(x => x.name.toLowerCase() == value.toLowerCase()) ? vendors.find(x => x.name.toLowerCase() == value.toLowerCase()).id : '';
                setTimeout(() => {
                  cellProperties.instance.setDataAtCell(row, col, value); // Update a single cell
                  cellProperties.instance.resumeRender();
                }, 100);
              }
            }
            else {
              td.innerHTML = '';
            }
            td.classList.add("htAutocomplete");
            td.innerHTML += '<div class="htAutocompleteArrow">▼</div>';
            return td;
          },
          handsontable: this.hotSet(vendors),
        },
      //  { data: 'assignedToId', type: 'dropdown', editor: 'select', selectOptions: ['salama'], validator: 'empty.validation' },
      ],
      colHeaders:
        [
          "Emp Code"
          , "First Name"
          , "Second Name"
          , "Last Name"
          , "Gender"
          , "Mobile1"
          , "Mobile2"
          , "Email"
          , "Birth Day"
          , "Marital Status"
          , "Military Status"
          , "National ID"
          , "Region"
          , "Graduation"
          , "Qualification"
          , "Hiring Date"
          , "Hiring Status"
          , "Job"
          , "Title"
          , "Department"
          , "Employee Type"
          , "Vendor"
        //  , "Assigned Reqruiter"
        ]
      ,
      licenseKey: 'non-commercial-and-evaluation',
    }
  }

  columnHeaders() {
    return
    [
        "Emp Code"
      , "First Name"
      , "Second Name"
      , "Last Name"
      , "Mobile1"
      , "Mobile2"
      , "Birth Day"
      , "Age"
      , "Gender"
      , "Marital Status"
      , "Military Status"
      , "National ID"
      , "Region"
      , "Graduated"
      , "Qualification"
      , "Assigned Reqruiter"
      , "Vendor"
    ]
      ;
  }
  hotSet(arr) {
    return {
      colHeaders: false,
      data: arr = [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }],
      hiddenColumns: {
        columns: [0],
        indicators: true
      },
      colWidths: 100,
      getValue() {
        const selection = this.getSelectedLast();
        return this.getSourceDataAtRow(Math.max(selection[0], 0)).id;
      }
    }
  }

}
