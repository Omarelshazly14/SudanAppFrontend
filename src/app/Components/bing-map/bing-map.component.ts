import { Component, OnInit } from '@angular/core';
import { MapModule, MapAPILoader, BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, MapServiceFactory, BingMapServiceFactory } from "angular-maps";

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css']
})
export class BingMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if (typeof Microsoft !== 'undefined') {
        console.log('BingMapComponent.ngOnInit');
        this.loadMap();
    }
  }


  map = null;
  loadMap() {
    this.map = new Microsoft.Maps.Map(document.getElementById('mapa'), {
        credentials: 'Aovt4x9PKNKXAOCG8cnJ3trl3oTdMsyIYEouxI0093XhqUbv8XFaug_Am_F9Uacf',
    });
  }
}
