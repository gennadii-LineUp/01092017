import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkerClass} from '../../../../models/marker-class';
import {SetCoordonneesByCellularService} from '../../../../services/api/setCoordonneesByCellular.service';
import {strictEqual} from 'assert';
import {CoordonneeClass} from '../../../../models/coordonnee-class';
import {UserDataService} from '../../../../models/user-data';

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
  phone: string;
  agentsMarkers: Array<MarkerClass>;

  constructor(public activatedRoute: ActivatedRoute,
              public userDataService: UserDataService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
        ? (this.userDataService.getMyAccounts()['0'].telephone)
        : localStorage.getItem('telephone');
      console.log(this.phone);
      // this.getMyCoordonees(this.phone + '');
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
    // this.loadMap();
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
        ? (this.userDataService.getMyAccounts()['0'].telephone)
        : localStorage.getItem('telephone');
      console.log(this.phone);
      // this.getMyCoordonees(this.phone + '');
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public loadMap() {
    console.log('loadMap');
    console.log(navigator);
    console.log(cordova);
    console.log(cordova.plugins);
    const div = document.getElementById('map_canvas');

    // Initialize the map view
    // cordova.plugins.google.maps.Map.getMap(div);
    cordova.plugins.googlemaps.Map.getMap(div);
    // const map = cordova.plugin.google.maps.Map.getMap(div);

    // Wait until the map is ready status.
    // map.addEventListener(cordova.plugin.google.maps.event.MAP_READY, this.onMapReady());
  }

  public onMapReady() {
    console.log('map is ready');
}

  public map_buttonClick() {
    console.log('map_buttonClick');
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
