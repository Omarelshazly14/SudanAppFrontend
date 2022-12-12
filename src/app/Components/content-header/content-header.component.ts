import { Component, OnInit } from '@angular/core';
import { MngDataService } from '../../Services/mng-data.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  Title: string;
  constructor(private data: MngDataService) {
    this.Title = "";
  }

  ngOnInit(): void {
    this.data.Title.subscribe(title => this.Title = title)
  }

}
