import { Component, OnInit } from '@angular/core';
import { MngDataService } from '../../Services/mng-data.service';

@Component({
  selector: 'app-main-sidbar',
  templateUrl: './main-sidbar.component.html',
  styleUrls: ['./main-sidbar.component.css']
})
export class MainSidbarComponent implements OnInit {

  constructor(
    public data: MngDataService,
  ) { }
  ngOnInit(): void {
  }

}
