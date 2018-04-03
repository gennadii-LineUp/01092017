import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkerClass} from '../../../../models/marker-class';
import {SetCoordonneesByCellularService} from '../../../../services/api/setCoordonneesByCellular.service';
import {strictEqual} from 'assert';
import {CoordonneeClass} from '../../../../models/coordonnee-class';
import {UserDataService} from '../../../../models/user-data';
import {GetCoordonneesAllAgentService} from '../../../../services/api/getCoordonneesAllAgent.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';

declare var navigator: any;
declare var cordova: any;

@Component({
  selector: 'app-services-geolocalisation-agent',
  templateUrl: './geolocalisation-agent.component.html',
  styleUrls: ['./geolocalisation-agent.component.scss'],
  providers: [GetCoordonneesAllAgentService]
})
export class GeolocalisationAgentComponent implements OnInit, OnDestroy {
  latitude = 14.735009;
  longitude = -17.473339;
  myCoord = new CoordonneeClass(this.latitude, this.longitude);
  // coord: CoordonneeClass;
  userRole = '';
  alive = true;
  geoloading = false;
  phone: string;
  status_agentsMarkers = false;
  activeAgent = new MarkerClass(undefined, undefined, '', '', '380686087517', '');
  agentsMarkers: Array<MarkerClass>;

  constructor(public activatedRoute: ActivatedRoute,
              public userDataService: UserDataService,
              public getCoordonneesAllAgentService: GetCoordonneesAllAgentService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
        ? (this.userDataService.getMyAccounts()['0'].telephone)
        : localStorage.getItem('telephone');
      console.log(this.phone);
      // this.getMyCoordonees(this.phone + '');
      this.startGettingMyCoordTouch();
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
    // this.loadMap();
    this.loadAgentsCoordonees();

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
        ? (this.userDataService.getMyAccounts()['0'].telephone)
        : localStorage.getItem('telephone');
      console.log(this.phone);
      this.startGettingMyCoordTouch();
      // this.getMyCoordonees(this.phone + '');
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public loadAgentsCoordonees() {
    this.getCoordonneesAllAgentService.getCoordonneesAllAgents()
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        const response = this.commonServices.xmlResponseParcer___complex( result._body );
        console.dir( response );
        if (+response.error === 0 && response.listAgents.length) {
          this.agentsMarkers = [];
          response.listAgents.forEach(item => {
            this.agentsMarkers.push(new MarkerClass(+item.lattitude, +item.longitude,
                                            item.nom ? item.nom : '',
                                            item.prenom ? item.prenom : '',
                                            item.telephone ? item.telephone : '',
                                            ''));
          });
          console.log(this.agentsMarkers);
          this.userDataService.agentsMarkers = this.agentsMarkers;
          this.status_agentsMarkers = true;
        } else {
          // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }
      }, (err) => {
        // this.loading = false;
        console.log(err);
        // if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
      });
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

  public startGettingMyCoordTouch() {
    this.geoloading = true;
    console.log('startGettingMyCoord  touchend');
    // try {
    //   console.log(cordova);
    // } catch (e) {
    //   console.log(e);
    // }
    // try {
    //   console.log(navigator);
    // } catch (e) {
    //   console.log(e);
    // }

    navigator.geolocation.getCurrentPosition((position) => {
        // const element = document.getElementById('geolocation');
        // element.innerHTML = 'Latitude: '  + position.coords.latitude + '<br />' +
        //                     'Longitude: ' + position.coords.longitude + '<br />';
        console.log(position.coords);

        this.latitude = +position.coords.latitude;
        this.longitude = +position.coords.longitude;
        console.log('touchend:  latitude', this.latitude, this.longitude);
        this.myCoord.latitude = this.latitude;
        this.myCoord.longitude = this.longitude;
        // console.log(this.myCoord);
        this.geoloading = false;
      },
      (error) => {
        this.geoloading = false;
        alert('Scanning failed: ' + error);
        console.log(error);
        this.showError(error);
        this.myCoord.latitude = 15.0458118;
        this.myCoord.longitude = -16.858833;
      });
  }

  public startGettingMyCoordClick() {
    this.geoloading = true;
    console.log('startGettingMyCoord  CLICK');
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);

        this.latitude = +position.coords.latitude;
        this.longitude = +position.coords.longitude;
        console.log('position.coords.latitude', position.coords.latitude, position.coords.longitude);
        this.myCoord.latitude = this.latitude;
        this.myCoord.longitude = this.longitude;
        this.geoloading = false;
        console.log(this.myCoord);
       },
      (error) => {
        this.geoloading = false;
        alert('Scanning failed: ' + error);
        console.log(error);
        this.showError(error);
        this.myCoord.latitude = 15.0458118;
        this.myCoord.longitude = -16.858833;
      });
  }

  gotoAgentLocation(agent: MarkerClass, $event: any) {
    this.activeAgent = agent;
    console.log(this.activeAgent);
    this.latitude = agent.latitude;
    this.longitude = agent.longitude;

    const els = window.document.getElementsByClassName('search__user active');
    console.log(els);
    if (els && els.length) {
      for (let i = 0; i < els.length; i++) {
        (<HTMLDivElement>els[i]).classList.remove('activeAgentClass');
      }
    }
    (<HTMLDivElement>$event.target).classList.toggle('activeAgentClass');
  }

  showError(error) {
    const element = document.getElementById('geolocation');
    switch (error.code) {
      case error.PERMISSION_DENIED:
        element.innerHTML = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        element.innerHTML = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        element.innerHTML = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        element.innerHTML = 'An unknown error occurred.';
        break;
    }
  }
}
