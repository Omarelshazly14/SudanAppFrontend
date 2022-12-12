import { Component, OnInit } from '@angular/core';
import '../../../assets/js/pages/dashboard2.js';
import '../../../assets/js/demo.js';
import { MngDataService } from '../../Services/mng-data.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  public title = 'لوحة التحكم';

  constructor(
    public data: MngDataService,
  ) {
  }

  ngOnInit(): void {
    this.data.setTitle(`${this.title}`);
  }

}
