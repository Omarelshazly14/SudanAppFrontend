import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Car } from "src/app/Data/Car";
import { Driver } from "src/app/Data/Driver";
import { Entry } from "src/app/Data/Entry";
import { CarService } from "src/app/Services/car.service";
import { DriverService } from "src/app/Services/driver.service";
import { EntryService } from "src/app/Services/entry-service";
import { MngDataService } from "src/app/Services/mng-data.service";

@Component({
    selector: 'add-entry',
    templateUrl: 'add-entry.component.html'
})
export class AddEntryComponent implements OnInit {
    addDriver: FormGroup;
    showDriverDetails: boolean = true;
    driverId: number;
    addCar: FormGroup;
    showCarDetails: boolean = false;
    carId: number;
    addEntry: FormGroup;
    showAddEntry: boolean = false;
    title: string = "إضافة رحلة جديدة"
    constructor(private fb: FormBuilder, private _entryService: EntryService, private data: MngDataService, private _driverService: DriverService, private _carService: CarService) {
        this.addDriver = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            userName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            licenseNo: ['', [Validators.required, Validators.minLength(3)]],
            licenseImg: ['', [Validators.required]],
            passportId: ['', [Validators.required, Validators.minLength(3)]],
            ownerCode: ['', [Validators.required]]
        });
        this.addCar = this.fb.group({
            carPlateNumber: ['', [Validators.required, Validators.minLength(3)]],
            imgCarNumber: ['', [Validators.required, Validators.minLength(3)]],
            licenseNumber: ['', [Validators.required, Validators.minLength(3)]],
            imglicenseNumber: ['', [Validators.required, Validators.minLength(3)]],
        })
        // this.addEntry = this.fb.group({
        //     driverId: ['', [Validators.required, Validators.min(0)]],
        //     carId: ['', [Validators.required, Validators.min(0)]],
        //     ownerCarCode: ['', Validators.required]
        // })
    }
    ngOnInit(): void {
        this.data.setTitle(`${this.title}`);
    }
    submitDriver() {
        const val = this.addDriver.value;
        console.log(this.addDriver)
        if (this.addDriver.status == 'VALID') {
            var newDriver = new Driver(val.name, val.userName, val.email, val.password, val.licenseNo, val.licenseImg, val.passportId, val.ownerCode)

            this._driverService.addDriver(newDriver).subscribe(res => {
                if (res > 0) {
                    console.log("Driver Added");
                    this.showDriverDetails = false;
                    this.showCarDetails = true;
                    this.driverId = res;
                }
            }, (err) => console.log(err))
        }
    }
    submitCar() {
        const val = this.addCar.value;
        if (this.addCar.status == "VALID") {
            var newCar = new Car(val.carPlateNumber, val.imgCarNumber, val.licenseNumber, val.imglicenseNumber);
            this._carService.addCar(newCar).subscribe(res => {
                if (res > 0) {
                    console.log("Car Added");
                    this.showCarDetails = false;
                    this.showAddEntry = true;
                    this.carId = res;
                    this.submitEntry();
                }
            }, (err) => console.log(err))
        }
    }

    submitEntry() {
        // const val = this.addEntry.value;
        // console.log(this.addEntry);
        var newEntry = new Entry(this.driverId, this.carId, this.addDriver.value.ownerCode);

        this._entryService.addEntry(newEntry).subscribe(
            res => {
                if (res > 0) {
                    // this.snackBar.open("تم إضافة الرحلة بنجاح", "", {
                    //     duration: 2000,
                    //     verticalPosition: "bottom",
                    //     horizontalPosition: "center",
                    // });
                    console.log("added successfully");
                } else {
                    // this.snackBar.open("حدث خطأ، حاول مرة أخرى", "", {
                    //     duration: 2000,
                    //     verticalPosition: "bottom",
                    //     horizontalPosition: "center",
                    // });
                    console.log("Error")
                }
            },
            (err) => { console.log(err) }
        );
    }
}