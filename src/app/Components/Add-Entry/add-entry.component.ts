import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Car } from "src/app/Data/Car";
import { Driver } from "src/app/Data/Driver";
import { CarOwner } from "src/app/Data/carOwner";
import { Entry } from "src/app/Data/Entry";
import { CarService } from "src/app/Services/car.service";
import { DriverService } from "src/app/Services/driver.service";
import { EntryService } from "src/app/Services/entry-service";
import { MngDataService } from "src/app/Services/mng-data.service";
import { CarOwnerService } from "src/app/Services/carOwner.service";

@Component({
    selector: 'add-entry',
    templateUrl: 'add-entry.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
    addDriver: FormGroup;
    showDriverDetails: boolean = true;
    drivers: any[];
    cars: any[];
    ownerCodes: any[];
    driverSearchText: string = '';
    carSearchText: string = '';
    ownerSearchText: string = '';
    driverId: number;
    addCar: FormGroup;
    showCarDetails: boolean = false;
    carId: number;
    addEntry: FormGroup;
    showQRCode: boolean = false;
    qrCodeSrc: any;
    qrText: string = '';
    readerResult: any;
    title: string = "إضافة رحلة جديدة";
    @ViewChild('myCanvas') public canvas: ElementRef;
    @ViewChild('qrCode') public qrCode: ElementRef;

    constructor(private fb: FormBuilder,
        private _entryService: EntryService,
        private data: MngDataService,
        private _driverService: DriverService,
        private _carService: CarService,
        private _ownerService: CarOwnerService
    ) {
        // this.addDriver = this.fb.group({
        //     name: ['', [Validators.required, Validators.minLength(3)]],
        //     userName: ['', [Validators.required, Validators.minLength(3)]],
        //     email: ['', [Validators.required, Validators.email]],
        //     password: ['', [Validators.required, Validators.minLength(6)]],
        //     licenseNo: ['', [Validators.required, Validators.minLength(3)]],
        //     licenseImg: ['', [Validators.required]],
        //     passportId: ['', [Validators.required, Validators.minLength(3)]],
        //     ownerCode: ['', [Validators.required]]
        // });
        // this.addCar = this.fb.group({
        //     carPlateNumber: ['', [Validators.required, Validators.minLength(3)]],
        //     imgCarNumber: ['', [Validators.required, Validators.minLength(3)]],
        //     licenseNumber: ['', [Validators.required, Validators.minLength(3)]],
        //     imglicenseNumber: ['', [Validators.required, Validators.minLength(3)]],
        // })
        this.addEntry = this.fb.group({
            driverId: ['', [Validators.required]],
            carId: ['', [Validators.required]],
            ownerCarCode: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.data.setTitle(`${this.title}`);
        this.getDriversList();
        this.getCarsList();
        this.getOwnerCodesList();
    }
    getDriversList() {
        this._driverService.getDriversDropDown().subscribe(res => {
            this.drivers = res;
        })
    }
    getCarsList() {
        this._carService.getCarsDropDown().subscribe(res => {
            this.cars = res;
        })
    }
    getOwnerCodesList() {
        this._ownerService.getAllOwnerCodes().subscribe(res => {
            this.ownerCodes = res;
        })
    }
    // getBase64(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         this.readerResult = reader.result;
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }

    submitDriver() {
        const val = this.addDriver.value;
        // console.log(this.addDriver)
        // var inputs = document.querySelectorAll('input[type=file]');
        // inputs.forEach(async (input: any) => {
        //     //deal with each input
        //     let file = input.files[0];
        //     await this.getBase64(file)
        //     setTimeout(() => {
        //         val.licenseImg = this.readerResult;
        //     }, 500)

        // });

        if (this.addDriver.status == 'VALID') {
            var newDriver = new Driver(val.name, val.userName, val.email, val.password, val.licenseNo, val.licenseImg, val.passportId, val.ownerCode)

            this._driverService.addDriver(newDriver).subscribe(res => {
                if (res.id > 0) {
                    this.showDriverDetails = false;
                    this.showCarDetails = true;
                    this.driverId = res.id;
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
    submitCar() {
        const val = this.addCar.value;

        // var inputs = document.querySelectorAll('input[type=file]');
        // inputs.forEach((input: any) => {
        //     //deal with each input
        //     let file = input.files[0];
        //     if (input.id == "imgCarNumber")
        //         val.imgCarNumber = this.getBase64(file)

        //     if (input.id == "imglicenseNumber")
        //         val.imglicenseNumber = this.getBase64(file)
        // });

        if (this.addCar.status == "VALID") {
            var newCar = new Car(val.carPlateNumber, val.imgCarNumber, val.licenseNumber, val.imglicenseNumber, this.addDriver.value.ownerCode, this.driverId);
            this._carService.addCar(newCar).subscribe(res => {
                if (res > 0) {
                    this.showCarDetails = false;
                    this.carId = res;
                    this.qrText = `${this.driverId}-${this.carId}-${this.addDriver.value.ownerCode}`;
                    this.showQRCode = true;
                    // this.submitEntry();
                } else if (res == 0) {
                    alert("الرجاء التأكد من صحة البيانات")
                }
            }, (err) => {
                console.log(err)
                alert("الرجاء التأكد من صحة البيانات")
            })
        }
    }

    // submitEntry() {
    //     var newEntry = new Entry(this.driverId, this.carId, this.addDriver.value.ownerCode);

    //     this._entryService.addEntry(newEntry).subscribe(
    //         res => {
    //             if (res > 0) {
    //                 // this.snackBar.open("تم إضافة الرحلة بنجاح", "", {
    //                 //     duration: 2000,
    //                 //     verticalPosition: "bottom",
    //                 //     horizontalPosition: "center",
    //                 // });
    //                 this.qrText = res.toString();
    //                 this.showQRCode = true;
    //                 // this.getQrReady();
    //             } else {
    //                 // this.snackBar.open("حدث خطأ، حاول مرة أخرى", "", {
    //                 //     duration: 2000,
    //                 //     verticalPosition: "bottom",
    //                 //     horizontalPosition: "center",
    //                 // });
    //                 console.log("Error")
    //             }
    //         },
    //         (err) => { console.log(err) }
    //     );
    // }
    submit() {
        if (this.addEntry.status == "VALID") {
            this.qrText = `${this.addEntry.value.driverId}-${this.addEntry.value.carId}-${this.addEntry.value.ownerCarCode}`;
            this.showQRCode = true;
        }
    }
    getQrReady() {
        const c: HTMLCanvasElement = this.canvas.nativeElement;
        var ctx = c.getContext("2d");
        var backgr = document.getElementById('Qr').getElementsByTagName('img')[1];
        ctx.drawImage(backgr, 0, 0);
        var qr = document.getElementsByClassName('qrcode')[0].getElementsByTagName('img')[0];
        ctx.drawImage(qr, 45, 225);
        ctx.font = "50px Cairo";
        var date = new Date();
        ctx.fillText(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, 615, 290);
        var selectedCar = this.cars.find(car => car.id == this.addEntry.value.carId)
        ctx.fillText(`${selectedCar.carPlateNumber}`, 620, 355);

        this.downloadCanvas(c);
        window.location.href = 'entries';
    }
    downloadCanvas(c: HTMLCanvasElement) {
        var image = c.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = `QR_${this.qrText}.png`;
        link.href = image;
        link.click();
    }
    onChangeURL(url) {
        this.qrCodeSrc = url;
    }
    // saveAsImage(parent: any) {
    //     let parentElement = null
    //     // fetches base 64 data from image
    //     // parentElement contains the base64 encoded image src
    //     // you might use to store somewhere
    //     parentElement = parent.qrcElement.nativeElement.querySelector("img").src

    //     if (parentElement) {
    //         // converts base 64 encoded image to blobData
    //         let blobData = this.convertBase64ToBlob(parentElement)
    //         // saves as image
    //         const blob = new Blob([blobData], { type: "image/png" })
    //         const url = window.URL.createObjectURL(blob)
    //         const link = document.createElement("a")
    //         link.href = url
    //         // name of the file
    //         link.download = "Qrcode"
    //         link.click()
    //     }
    // }
    // private convertBase64ToBlob(Base64Image: string) {
    //     // split into two parts
    //     const parts = Base64Image.split(";base64,")
    //     // hold the content type
    //     const imageType = parts[0].split(":")[1]
    //     // decode base64 string
    //     const decodedData = window.atob(parts[1])
    //     // create unit8array of size same as row data length
    //     const uInt8Array = new Uint8Array(decodedData.length)
    //     // insert all character code into uint8array
    //     for (let i = 0; i < decodedData.length; ++i) {
    //         uInt8Array[i] = decodedData.charCodeAt(i)
    //     }
    //     // return blob image after conversion
    //     return new Blob([uInt8Array], { type: imageType })
    // }
}