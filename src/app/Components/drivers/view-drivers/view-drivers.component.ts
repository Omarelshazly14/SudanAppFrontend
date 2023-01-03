import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DriverService } from 'src/app/Services/driver.service';
import { MngDataService } from 'src/app/Services/mng-data.service';

@Component({
  selector: 'app-view-drivers',
  templateUrl: './view-drivers.component.html',
  styleUrls: ['./view-drivers.component.css']
})
export class ViewDriversComponent implements OnInit, OnDestroy {

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  public dtTrigger: Subject<any[]> = new Subject();
  public drivers=[];
  public dtOptions: DataTables.Settings = {};
  constructor(
    private data: MngDataService,
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.data.setTitle('Drivers');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.refreshEntitiesTable();
    //this.getDrivers();

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
public getDrivers=()=>{
  this.driverService.getDrivers()
  .subscribe(data => {
    this.drivers = data;
  }
  );
}
refreshEntitiesTable() {
  //debugger;
  this.driverService.getDrivers()
    .subscribe(data => {
      this.drivers = data;
      this.dtTrigger.next();
    }
    );
}
openEdit(id) {
  window.location.href = 'driver/' + id;
}
viewProfile(id) {
  window.location.href = 'driver/profile/' + id;
}

}
