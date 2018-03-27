import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkerClass} from '../../../../models/marker-class';
import {SetCoordonneesByCellularService} from '../../../../services/api/setCoordonneesByCellular.service';
import {strictEqual} from 'assert';
import {CoordonneeClass} from '../../../../models/coordonnee-class';

declare var navigator: any;
declare var cordova: any;

@Component({
  selector: 'app-services-geolocalisation-agent',
  templateUrl: './geolocalisation-agent.component.html',
  styleUrls: ['./geolocalisation-agent.component.scss']
})
export class GeolocalisationAgentComponent implements OnInit, OnDestroy {
  latitude = 14.735009;
  longitude = -17.473339;
  coord = new CoordonneeClass(this.latitude, this.longitude);
  // coord: CoordonneeClass;
  userRole = '';
  alive = true;
  agentsMarkers: Array<MarkerClass>;

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public setAgentsMarkersFunction(markers: Array<MarkerClass>) {
    this.agentsMarkers = markers;
    console.log(this.agentsMarkers);
  }

  public startGettingMyCoord() {
    console.log('startGettingMyCoord');
    // console.log(cordova);

    navigator.geolocation.getCurrentPosition((position) => {
        // const element = document.getElementById('geolocation');
        // element.innerHTML = 'Latitude: '  + position.coords.latitude + '<br />' +
        //                     'Longitude: ' + position.coords.longitude + '<br />';
        console.log(position.coords);

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
          // this.coord = new CoordonneeClass((position.coords.latitude.length) ? +position.coords.latitude : 15.0458118,
          //                                 (position.coords.longitude.length) ? +position.coords.longitude : -16.858833);

        // console.log(this.coord);
      },
      (error) => {
        alert('Scanning failed: ' + error);
        console.log(error);
        this.coord.latitude = 15.0458118;
        this.coord.longitude = -16.858833;
      });
  }

}
