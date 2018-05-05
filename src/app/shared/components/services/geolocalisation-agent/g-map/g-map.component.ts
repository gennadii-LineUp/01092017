import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GetCoordonneesByCellularService} from '../../../../../services/api/getCoordonneesByCellular.service';
import {CommonServices} from '../../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../../services/error-message-handler.service';
import {UserDataService} from '../../../../../models/user-data';
import {GetCoordonneesAllAgentService} from '../../../../../services/api/getCoordonneesAllAgent.service';
import {MarkerClass} from '../../../../../models/marker-class';
import {SetCoordonneesByCellularService} from '../../../../../services/api/setCoordonneesByCellular.service';
import {CoordonneeClass} from '../../../../../models/coordonnee-class';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss'],
  providers: [ErrorMessageHandlerService, GetCoordonneesByCellularService, GetCoordonneesAllAgentService, SetCoordonneesByCellularService]
})
export class GMapComponent implements OnInit, OnDestroy {
  successMessage = '';
  errorMessage = '';
  __lat = 14.735009;
  __lng = -17.473339;
  _lat: number;
  _lng: number;
  _coordonnees: CoordonneeClass;
  draggable: true;
  zoom = 13;
  marker_myself = '../../../../../../assets/img/arrow.png';
  marker_agent = '../../../../../../assets/img/paleblue_MarkerA.png';
  marker_activeAgent = '../../../../../../assets/img/orange_MarkerA.png';
  myself = new MarkerClass(undefined, undefined, '', '', '380686087517', this.marker_myself);
  // activeAgent = new MarkerClass(undefined, undefined, '', '', '380686087517', this.marker_activeAgent);
  _markers = this.userDataService.agentsMarkers_nearest;
  markers = this._markers;
  // markers = [new MarkerClass(14.739159, -17.461516, 'nom1', 'prenom1', 'AA', '../../../../../../assets/img/user.png'),
  //            new MarkerClass(14.733484, -17.465587, 'nom2', 'prenom2', 'BB', '../../../../../../assets/img/logo.png')
  // ];
  phone: string;
  alive = true;
  _activeAgent: MarkerClass;
  @Input() myCoordonnees: CoordonneeClass;
  @Input() set activeAgent (data: MarkerClass) {
    this._activeAgent = data;
    console.log(this._activeAgent);
    // const markers = this._markers;
    // markers.forEach((marker, i) => {
    //   if (marker.longitude === data.longitude
    //       && marker.latitude === data.latitude) {
    //     console.log('---------- ', i);
    //     markers.splice(i, 1);
    //   }
    // });
    // this.markers = markers;
  };
  get activeAgent (): MarkerClass {
    return this._activeAgent;
  }
  @Input() set agentsMarkers (data: Array<MarkerClass>) {
    // this.markers = [];
    this.markers = data;
    console.log(this.markers);
  }
  @Input() set lat(data: string) {
    this._lat = +data;
    console.log('new lat');
  };
  @Input() set lng(data: string) {
    this._lng = +data;
    console.log('new lng');
    this._coordonnees = new CoordonneeClass(this._lat, this._lng);
    setTimeout(this.setMyCoordonneesFromCellular(this._coordonnees), 100);
  };

  @Output() onAgentsMarkersAdded = new EventEmitter<Array<MarkerClass>>();

  constructor(public userDataService: UserDataService,
              public getCoordonneesByCellularService: GetCoordonneesByCellularService,
              public getCoordonneesAllAgentService: GetCoordonneesAllAgentService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public setCoordonneesByCellularService: SetCoordonneesByCellularService) {
    console.log('constructor');
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
                  ? (this.userDataService.getMyAccounts()['0'].telephone)
                  : localStorage.getItem('telephone');
      console.log(this.phone);
      this.getMyCoordonees(this.phone + '');
      // this.setDefaultCoord();
      this.loadAgentsCoordonees();
    });
  }

  ngOnInit() {
    console.log('ngOnInit');
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
                  ? (this.userDataService.getMyAccounts()['0'].telephone)
                  : localStorage.getItem('telephone');
      console.log(this.phone);
      this.getMyCoordonees(this.phone + '');
      // this.setDefaultCoord();
      this.loadAgentsCoordonees();
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  setDefaultCoord() {
    console.log('setDefaultCoord');
    this._lat = this.__lat;
    this._lng = this.__lng;
    this.myself = new MarkerClass(this._lat,
                                  this._lng,
                                  this.userDataService.getMyAccounts()['0'].nom,
                                  this.userDataService.getMyAccounts()['0'].prenom,
                                  this.userDataService.getMyAccounts()['0'].telephone,
                                  this.marker_myself);
  }

  public getMyCoordonees(phone: string) {
    this.getCoordonneesByCellularService.getMyCoordonneesByCellular(phone)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        const response = this.commonServices.xmlResponseParcer_simple( result._body );
        console.dir( response );
        if (+response.error === 0) {
          this.myself = new MarkerClass(+response.lattitude,
                                        +response.longitude,
                                        this.userDataService.getMyAccounts()['0'].nom,
                                        this.userDataService.getMyAccounts()['0'].prenom,
                                        this.userDataService.getMyAccounts()['0'].telephone,
                                        this.marker_myself);
          console.log(this._lat + '  ' + this._lng);
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }
      }, (err) => {
        // this.loading = false;
        console.log(err);
        if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
      });
  }

  public loadAgentsCoordonees() {
    // this.getCoordonneesAllAgentService.getCoordonneesAllAgents()
    //   .takeWhile(() => this.alive)
    //   .subscribe(result => {
    //     // this.loading = false;
    //     const response = this.commonServices.xmlResponseParcer___complex( result._body );
    //     console.dir( response );
    //     if (+response.error === 0 && response.listAgents.length) {
    //       // this.markers = [];
    //       // response.listAgents.forEach(item => {
    //       //   this.markers.push(new MarkerClass(item.lattitude, item.longitude,
    //       //                                   item.nom ? item.nom : '',
    //       //                                   item.prenom ? item.prenom : '',
    //       //                                   item.telephone ? item.telephone : '',
    //       //                                   ''));
    //       // });
    //       this.onAgentsMarkersAdded.emit(this.markers);
    //     } else {
    //       this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
    //     }
    //   }, (err) => {
    //     // this.loading = false;
    //     console.log(err);
    //     if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
    //   });
  }

  public markerClicked(title: any) {
    console.log(title);
    console.dir(title);
  }

  public setMyCoordonneesFromCellular(data: CoordonneeClass) {
    this.setCoordonneesByCellularService.setCoordonneesByCellular(+this.phone, data.latitude, data.longitude)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        console.log(result);
        // const response = this.commonServices.xmlResponseParcer_complex( result._body );
        // console.dir( response );
      }, (err) => {
        // this.loading = false;
        console.log(err);
        if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
      });
  }

}
