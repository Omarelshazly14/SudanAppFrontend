import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/Services/car.service';
import { Car } from "src/app/Data/car";
import { MngDataService } from 'src/app/Services/mng-data.service';
import { DriverService } from 'src/app/Services/driver.service';

@Component({
    selector: 'car-create',
    templateUrl: './addCar.component.html',
    styleUrls: ['./addCar.component.scss']
})

export class AddCarComponent implements OnInit {
    carForm: FormGroup;
    id: string = null
    title: string = "إضافة سيارة جديدة";
    drivers: any[];
    searchText: string = '';
    constructor(
        public fb: FormBuilder,
        private router: Router,
        private carService: CarService,
        private route: ActivatedRoute,
        private data: MngDataService,
        private driverService: DriverService
    ) { }

    ngOnInit() {
        this.carForm = this.fb.group({
            id: [],
            carPlateNumber: [''],
            imgCarNumber: [''],
            licenceNumber: [''],
            imglicenceNumber: [''],
            ownerCode: [''],
            driverId: []
        })
        this.route.params.subscribe(params => {
            if (!isNaN(Number(params["id"]))) {
                this.title = "تعديل بيانات السيارة";
                this.id = params["id"];
                this.getCarById(Number(this.id));
            }
            this.data.setTitle(`${this.title}`);
        })
        this.getDriversList()
    }
    getDriversList() {
        this.driverService.getDriversDropDown().subscribe(res => {
            this.drivers = res
        })
    }
    getCarById(carId) {
        this.carService.getById(carId).subscribe((res: Car) => {
            this.carForm.value.carPlateNumber = res.carPlateNumber;
            this.carForm.value.imgCarNumber = res.imgCarNumber;
            this.carForm.value.licenceNumber = res.licenceNumber;
            this.carForm.value.imglicenceNumber = res.imglicenceNumber;
            this.carForm.value.ownerCode = res.ownerCode;
            this.carForm.value.driverId = res.driverId;
        })
    }

    submitForm() {
        if (this.id) {
            this.updateCar();
        } else {
            this.addCar();
        }
    }
    updateCar() {
        this.carForm.value.id = Number(this.id);
        this.carService.update(Number(this.id), this.carForm.value).subscribe(res => {
            console.log('car updated!');
            this.router.navigateByUrl('/car')
        })
    }
    addCar() {
        this.carService.addCar(this.carForm.value).subscribe(res => {
            console.log('car created!')
            this.router.navigateByUrl('/car')
        })
    }
}