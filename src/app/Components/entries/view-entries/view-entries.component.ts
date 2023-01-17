import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EntryService } from 'src/app/Services/entry-service';
import { MngDataService } from 'src/app/Services/mng-data.service';

@Component({
    selector: 'view-entries',
    templateUrl: './view-entries.component.html',
    styleUrls: ['./view-entries.component.css']
})
export class ViewEntriesComponent implements OnInit, OnDestroy {

    public dtTrigger: Subject<any[]> = new Subject();
    public entries = [];
    public dtOptions: DataTables.Settings = {};
    constructor(
        private data: MngDataService,
        private _entryService: EntryService
    ) { }

    ngOnInit(): void {
        this.data.setTitle('الرحلات');
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };
        this.refreshEntitiesTable();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
    refreshEntitiesTable() {
        //debugger;
        this._entryService.getAllEntries()
            .subscribe(data => {
                this.entries = data;
                this.dtTrigger.next();
            }
            );
    }
    goToDriverDetails(id) {
        window.location.href = 'driver/profile/' + id;
    }
    viewProfile(id) {
        window.location.href = 'driver/profile/' + id;
    }
}