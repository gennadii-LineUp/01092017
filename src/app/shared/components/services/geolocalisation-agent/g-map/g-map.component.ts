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
  marker_agent = '../../../../../../assets/img/A.png';
  myself: MarkerClass;
  markers = [new MarkerClass(14.739159, -17.461516, 'nom1', 'prenom1', 'AA', '../../../../../../assets/img/user.png'),
             new MarkerClass(14.733484, -17.465587, 'nom2', 'prenom2', 'BB', '../../../../../../assets/img/logo.png')
  ];
  phone: string;
  alive = true;
  @Input() set coordonnees (data: CoordonneeClass) {
    this._coordonnees = new CoordonneeClass(data.latitude, data.longitude);
    console.log(this._coordonnees);
    this.setMyCoordonneesFromCellular(data);
  }
  @Input() set lat(data: string) {
    // this._lat = (data && data.length > 0) ? +data : this.__lat;
    this._lat = +data;
    console.log('new lat');
  };
  @Input() set lng(data: string) {
    // this._lng = (data && data.length > 0) ? +data : this.__lng;
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
                                  '../../../../../../assets/img/track-8.png');
  }

  public getMyCoordonees(phone: string) {
    this.getCoordonneesByCellularService.getMyCoordonneesByCellular(phone)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        const response = this.commonServices.xmlResponseParcer_simple( result._body );
        console.dir( response );
        if (+response.error === 0) {
          this._lat = +response.lattitude;
          this._lng = +response.longitude;
          this.myself = new MarkerClass(this._lat, this._lng,
                                        this.userDataService.getMyAccounts()['0'].nom,
                                        this.userDataService.getMyAccounts()['0'].prenom,
                                        this.userDataService.getMyAccounts()['0'].telephone,
                                        '../../../../../../assets/img/track-8.png');
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
    this.getCoordonneesAllAgentService.getCoordonneesAllAgents()
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        const response = this.commonServices.xmlResponseParcer___complex( result._body );
        console.dir( response );
        if (+response.error === 0 && response.listAgents.length) {
          // this.markers = [];
          // response.listAgents.forEach(item => {
          //   this.markers.push(new MarkerClass(item.lattitude, item.longitude,
          //                                   item.nom ? item.nom : '',
          //                                   item.prenom ? item.prenom : '',
          //                                   item.telephone ? item.telephone : '',
          //                                   ''));
          // });
          this.onAgentsMarkersAdded.emit(this.markers);
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }
      }, (err) => {
        // this.loading = false;
        console.log(err);
        if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
      });
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
