import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from 'src/app/Services/driver.service';
import { MngDataService } from 'src/app/Services/mng-data.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  public driver:any;
  private sub;
  private id;

  constructor(
    private activatedroute: ActivatedRoute,
    private data: MngDataService,
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    this.data.setTitle('Edit Driver');
    this.sub = this.activatedroute.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
      this.getDriver();
    });
  }
  public getDriver=()=>{
    this.driverService.getDriver(this.id)
    .subscribe(data => {
      this.driver = data;
    }
    );
  }
}
