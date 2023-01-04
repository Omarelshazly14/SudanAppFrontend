import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapModule, MapAPILoader, BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, MapServiceFactory, BingMapServiceFactory } from "angular-maps";
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-bing-map',
  templateUrl: './bing-map.component.html',
  styleUrls: ['./bing-map.component.css']
})
export class BingMapComponent implements OnInit {
  @Output() map = new EventEmitter();
  _map: any;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    if (typeof Microsoft !== 'undefined') {
        console.log('BingMapComponent.ngOnInit');
        this.loadMap();
        this.map.emit(this._map);
    }
  }


  //map = null;
  loadMap() {
    this._map = new Microsoft.Maps.Map(document.getElementById('mapa'), {
        credentials: 'Aovt4x9PKNKXAOCG8cnJ3trl3oTdMsyIYEouxI0093XhqUbv8XFaug_Am_F9Uacf',
    });
  }
}
