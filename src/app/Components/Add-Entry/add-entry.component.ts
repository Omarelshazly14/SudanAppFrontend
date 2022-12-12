import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Entry } from "src/app/Data/Entry";
import { EntryService } from "src/app/Services/entry-service";
import { MngDataService } from "src/app/Services/mng-data.service";

@Component({
    selector: 'add-entry',
    templateUrl: 'add-entry.component.html'
})
export class AddEntryComponent implements OnInit {
    form: FormGroup;
    title: string = "إضافة رحلة جديدة"
    constructor(private fb: FormBuilder, private _entryService: EntryService, private data: MngDataService) {
        this.form = this.fb.group({
            driverId: ['', [Validators.required, Validators.min(0)]],
            carId: ['', [Validators.required, Validators.min(0)]],
            ownerCarCode: ['', Validators.required]
        })
    }
    ngOnInit(): void {
        this.data.setTitle(`${this.title}`);
    }

    submitEntry() {
        const val = this.form.value;
        console.log(this.form);
        if (val.driverId && val.carId && val.ownerCarId) {
            var newEntry = new Entry(val.driverId, val.carId, val.ownerCarCode);

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
}