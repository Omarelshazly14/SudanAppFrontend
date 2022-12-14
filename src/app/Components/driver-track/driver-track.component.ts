import { Component, OnInit } from '@angular/core';
//import { BingMapsLoader } from 'src/app/Services/map-loader.service';
import { BingMapsLoader } from '../../services/map-loader.service';

@Component({
  selector: 'app-driver-track',
  templateUrl: './driver-track.component.html',
  styleUrls: ['./driver-track.component.css']
})
export class DriverTrackComponent implements OnInit {

  mapReady = false;
  constructor() { 
    BingMapsLoader.load()
    .then(res => {
        console.log('BingMapsLoader.load.then', res);
        this.mapReady = true;
      });
  }

  ngOnInit(): void {
  }

}
