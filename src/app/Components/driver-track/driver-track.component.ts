import { Component, OnInit } from '@angular/core';
import { EntriesLocsService } from 'src/app/Services/entries-locs.service';
import { MapModule, MapAPILoader, BingMapAPILoaderConfig, BingMapAPILoader, WindowRef, DocumentRef, MapServiceFactory, BingMapServiceFactory } from "angular-maps";
//import { BingMapsLoader } from 'src/app/Services/map-loader.service';
import { BingMapsLoader } from '../../services/map-loader.service';

@Component({
  selector: 'app-driver-track',
  templateUrl: './driver-track.component.html',
  styleUrls: ['./driver-track.component.css']
})
export class DriverTrackComponent implements OnInit {

  map=null;
  mapReady = false;
  infobox;
  pushpins = [];
  locs;
constructor(
    private entrieslocsSRV: EntriesLocsService,
  ) { 
    BingMapsLoader.load()
    .then(res => {
        console.log('BingMapsLoader.load.then', res);
        this.mapReady = true;
        Microsoft.Maps.loadModule( 'Microsoft.Maps.Traffic', function ()
                {
                    var manager = new Microsoft.Maps.Traffic.TrafficManager( this.map );
                    manager.show();
                } );
      });
  }
  getMap(_map){
    while (!this.mapReady) {
            
    }
    this.map = _map;
    setInterval(()=>{this.getLastLocs();},5000);
    this.getLastLocs();
    //console.log(this.map);
  }

  ngOnInit(): void {
  }

  public getLastLocs = () => {
    this.entrieslocsSRV.getEntriesLocs()
      .subscribe(res => {
        if (res) {
          debugger;
          this.locs = res as [];
          this.infobox = new Microsoft.Maps.Infobox( new Microsoft.Maps.Location( 0.0, 0.0 ), { visible: false } );
          this.infobox.setMap( this.map );
          for ( var i = 0; i < this.locs.length; i++ )
          {
              if ( this.locs[i] )
              {
                  var locsUser = new Microsoft.Maps.Location( this.locs[i].x, this.locs[i].y );
                
                  var pushpin = new Microsoft.Maps.Pushpin( locsUser, {  text: 'c', title: this.locs[i].Driver/*, subTitle: 'Subtitle'*/ } );
                  pushpin.metadata = {
                      title: this.locs[i].Driver,
                      description: '<table>'
                      +'<tr>Driver: <td></td>'+this.locs[i].driver+'<br/><td></td></tr>'
                      +'<tr>Car: <td></td>'+this.locs[i].car+'<br/><td></td></tr>'
                      +'<tr>Owner: <td></td>'+this.locs[i].owner+'<br/><td></td></tr>'
                      +'<tr>RFID: <td></td>'+this.locs[i].rfid+'<br/><td></td></tr>'
                      +'<tr>X: <td></td>'+this.locs[i].x+'<br/><td></td></tr>'
                      +'<tr>Y: <td></td>'+this.locs[i].y+'<br/><td></td></tr>'
                      +'<tr>Speed: <td></td>'+this.locs[i].speed+'<br/><td></td></tr>'
                      +'<tr>Date: <td></td>'+this.locs[i].createdMob+'<td></td></tr>'
                      +'</table>'
                  };
                  debugger;
                  //}
                  Microsoft.Maps.Events.addHandler( pushpin, 'click', ( args:any )=>
                  {
                      this.infobox.setOptions( {
                          location: args.target.getLocation(),
                          title: args.target.metadata.title,
                          description: args.target.metadata.description,
                          //htmlContent:args.target.metadata.description,
                          visible: true
                      } );
                  } );
                  this.pushpins.push( pushpin );
                  pushpin.setOptions( { enableHoverStyle: true } );
              }
          }
          for ( var i = this.map.entities.getLength() - 1; i >= 0; i-- )
          {
              var pushpinD = this.map.entities.get( i );
              if ( pushpinD instanceof Microsoft.Maps.Pushpin )
              {
                  this.map.entities.removeAt( i );
              }
          }
          this.map.entities.push( this.pushpins );
  }
      })
  }


}
