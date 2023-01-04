import { Component, OnInit } from '@angular/core';
import { CarOwner } from "src/app/Data/carOwner";
import { CarOwnerService } from "src/app/Services/carOwner.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeOwner } from 'src/app/Data/Enums';
import { MngDataService } from 'src/app/Services/mng-data.service';

@Component({
    selector: 'carOwner-create',
    templateUrl: './addCarOwner.component.html',
    styleUrls: ['./addCarOwner.component.scss']
})

export class AddCarOwnerComponent implements OnInit {
    ownerForm: FormGroup;
    id: string = null;
    ownerTypes = TypeOwner;
    title: string = "إضافة مالك جديد";
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private ownerService: CarOwnerService,
        private route: ActivatedRoute,
        private data: MngDataService
    ) { }

    ngOnInit() {
        this.ownerForm = this.fb.group({
            id: [],
            name: ['', [Validators.required, Validators.minLength(3)]],
            userName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            recordNo: ['', [Validators.required, Validators.minLength(3)]],
            passportNo: ['', [Validators.required, Validators.minLength(3)]],
            typeOwner: [[Validators.required]],
            // phoneNo: [''],
            // contactNo: [''],
        })
        this.route.params.subscribe(params => {
            if (!isNaN(Number(params["id"]))) {
                this.title = "تعديل بيانات المالك";
                this.id = params["id"];
                this.getOwnerById(Number(this.id));
            }
        });
        this.data.setTitle(`${this.title}`);
    }

    getOwnerById(ownerId) {
        this.ownerService.getById(ownerId).subscribe((res: CarOwner) => {
            this.ownerForm.value.name = res.name;
            // this.ownerForm.value.ownerCode = res.ownerCode;
            this.ownerForm.value.recordNo = res.recordNo;
            this.ownerForm.value.passportNo = res.passportNo;
            this.ownerForm.value.typeOwner = res.typeOwner;
        })
    }

    submitForm() {
        if (this.id) {
            this.updateCarOwner();
        } else {
            this.addCarOwner();
        }
    }
    updateCarOwner() {
        this.ownerForm.value.id = Number(this.id);
        this.ownerService.update(Number(this.id), this.ownerForm.value).subscribe(res => {
            console.log('owner updated!')
            this.router.navigateByUrl('/carOwner')
        })
    }
    addCarOwner() {
        this.ownerService.create(this.ownerForm.value).subscribe(res => {
            console.log('owner created!')
            if (res.id > 0) {
                this.router.navigateByUrl('/carOwner')
            } else if (res.id == 0) {
                alert("برجاء المحاولة بإسم مستخدم آخر")
            }
        }, (err) => {
            if (err.error.id == -1) {
                alert("كود مالك السيارة خطأ، برجاء إدخال كود صحيح")
            } else if (err.error.id == -2) {
                alert("اسم المستخدم او البريد الإلكتروني غير صالح او مستخدم من قبل، برجاء المحاولة باسم مستخدم أو إيميل آخر")
            } else {
                alert("خطأ في إضافة السائق، برجاء التأكد من صحة البيانات")
            }
        })
    }
}