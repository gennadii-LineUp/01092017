import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkerClass} from '../../../../models/marker-class';
import {CoordonneeClass} from '../../../../models/coordonnee-class';
import {UserDataService} from '../../../../models/user-data';
import {GetCoordonneesAllAgentService} from '../../../../services/api/getCoordonneesAllAgent.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';

declare var navigator: any;
declare var cordova: any;

export class AgentTempClass {
  tel: string;
  lat: number;
  lon: number;

  constructor( tel: string,
               lat: number,
               lon: number) {

    this.tel = tel;
    this.lat = lat;
    this.lon = lon;
  }
}

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
  userRole = '';
  alive = true;
  geoloading = false;
  phone: string;
  status_agentsMarkers = false;
  activeAgent = new MarkerClass(undefined, undefined, '', '', '380686087517', '');
  agentsMarkers_nearest: Array<MarkerClass>;
  _agentsMarkers_nearest: Array<MarkerClass>;
  agentsMarkers_numberOfNearest = 5;

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
      this.startGettingMyCoordTouch();
    });
  }

  ngOnInit() {

    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
    this.loadAgentsCoordonees();

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
        ? (this.userDataService.getMyAccounts()['0'].telephone)
        : localStorage.getItem('telephone');
      this.startGettingMyCoordTouch();
    } else {
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
          this.agentsMarkers_nearest = [];
          this._agentsMarkers_nearest = [];
          let agentsMarkers_all = [];
          response.listAgents.forEach(item => {
            agentsMarkers_all.push(new MarkerClass(+item.lattitude, +item.longitude,
                                            item.nom ? item.nom : '',
                                            item.prenom ? item.prenom : '',
                                            item.telephone ? item.telephone : '',
                                            ''));
          });
          console.log(agentsMarkers_all);

          this._agentsMarkers_nearest = agentsMarkers_all.slice();
          this.findClosestAgents();
        }
      }, (err) => {
        // this.loading = false;
        console.log(err);
        // if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
      });
  }

  test() {
    this.findClosestAgents();
  }

  public findClosestAgents() {
    let nearestAgent: MarkerClass;
    let agentsMarkers_nearest = Array<MarkerClass>(0);
    const length = this._agentsMarkers_nearest.length;

      for (let i=0; i<length; i++) {
        if (this._agentsMarkers_nearest && this._agentsMarkers_nearest.length) {
          let agentsTemp = this.createAgentsTemp();
          nearestAgent = this.UserLocation(agentsTemp);
          if (nearestAgent && +nearestAgent.telephone) {
            agentsMarkers_nearest.push(nearestAgent);
          }
        }
      }
    this.agentsMarkers_nearest = agentsMarkers_nearest;
    console.log(this.agentsMarkers_nearest);
    console.log(this._agentsMarkers_nearest);
    this.userDataService.agentsMarkers_nearest = this.agentsMarkers_nearest;
    this.status_agentsMarkers = true;

  }
  // =====================================================
// Convert Degress to Radians
  createAgentsTemp(_arr?: Array<MarkerClass>): Array<AgentTempClass> {
    let arr = (_arr && _arr.length) ? _arr : this._agentsMarkers_nearest;
    let agentsTemp = Array<AgentTempClass>(0);
    arr.forEach((marker) => {
      agentsTemp.push(new AgentTempClass(marker.telephone,
                                        this.Deg2Rad(marker.latitude),
                                        this.Deg2Rad(marker.longitude)));
    });
    return agentsTemp;
  }

  public Deg2Rad(deg: number): number {
    return deg * Math.PI / 180;
  }

  // Callback function for asynchronous call to HTML5 geolocation
  public UserLocation(agentsTemp: Array<AgentTempClass>): MarkerClass {
    if (this.myCoord && Math.abs(this.myCoord.latitude) && Math.abs(this.myCoord.longitude)) {
      let nearestAgent: MarkerClass;
      const myPosition = new AgentTempClass('tele', this.Deg2Rad(this.myCoord.latitude), this.Deg2Rad(this.myCoord.longitude));
      nearestAgent = this.NearestAgent(myPosition.lat, myPosition.lon, agentsTemp);
      // console.log(nearestAgent);
      if (nearestAgent && +nearestAgent.telephone) {
        return nearestAgent;
      }
    }
  }

  public NearestAgent(latitude: number, longitude: number, _agents: Array<AgentTempClass>): MarkerClass {
    let agents = _agents;
    let mindif = 99999;
    let closest;
    let agent_index: number;
    let agent: MarkerClass;
    for (let index = 0; index < agents.length; ++index) {
      let dif = this.PythagorasEquirectangular(latitude, longitude, agents[index].lat, agents[index].lon);

      if (dif < mindif) {
        closest = index;
        mindif = dif;
      }
    }

    this._agentsMarkers_nearest.forEach((_agent, i) => {
      if (+_agent.telephone === +agents[closest].tel) {
        agent = _agent;
        agent_index = i;
      }
    });
    this._agentsMarkers_nearest.splice(agent_index, 1);
    return agent;
  }

  PythagorasEquirectangular(_lat1: number, _lon1: number, _lat2: number, _lon2: number): number {
    let lat1 = this.Deg2Rad(_lat1);
    let lat2 = this.Deg2Rad(_lat2);
    let lon1 = this.Deg2Rad(_lon1);
    let lon2 = this.Deg2Rad(_lon2);
    const R = 6371; // km
    let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    let y = (lat2 - lat1);
    let d = Math.sqrt(x * x + y * y) * R;
    return d;
  }
  // =====================================================

  public loadMap() {
    // console.log('loadMap');
    // console.log(navigator);
    // console.log(cordova);
    // console.log(cordova.plugins);
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
    this.agentsMarkers_nearest = markers;
    console.log(this.agentsMarkers_nearest);
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
        this.geoloading = false;
        this.loadAgentsCoordonees();
      },
      (error) => {
        this.geoloading = false;
        alert('Scanning failed: ' + error);
        console.log(error);
        this.showError(error);
        this.myCoord.latitude = this.latitude;
        this.myCoord.longitude = this.longitude;
        this.loadAgentsCoordonees();
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
    this.latitude = agent.latitude;
    this.longitude = agent.longitude;

    const els = window.document.getElementsByClassName('search__user active');
    if (els && els.length) {
      for (let i = 0; i < this.agentsMarkers_numberOfNearest; i++) {
        (<HTMLDivElement>els[i]).classList.remove('activeAgentClass');
      }
    }
    const clickedNode = $event.target;
    console.log(clickedNode);
    if (clickedNode.classList.contains('search__user')) {
      clickedNode.classList.toggle('activeAgentClass');
    } else {
      const parent1 = clickedNode.parentElement;
      console.log(parent1);
      if (parent1.classList.contains('search__user')) {
        parent1.classList.toggle('activeAgentClass');
      } else {
        const parent2 = parent1.parentElement;
        console.log(parent2);
        if (parent2.classList.contains('search__user')) {
          parent2.classList.toggle('activeAgentClass');
        } else {
          const parent3 = parent2.parentElement;
          console.log(parent3);
          if (parent3.classList.contains('search__user')) {
            parent3.classList.toggle('activeAgentClass');
          } else {
            const parent4 = parent3.parentElement;
            console.log(parent4);
            if (parent4.classList.contains('search__user')) {
              parent4.classList.toggle('activeAgentClass');
            }
          }
        }
      }
    }
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

  public sendCall(phoneNumber: string) {
    console.log(phoneNumber);
  }
}
