import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {GetCoordonneesByCellularService} from '../../../../../services/api/getCoordonneesByCellular.service';
import {CommonServices} from '../../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../../services/error-message-handler.service';
import {UserDataService} from '../../../../../models/user-data';
import {GetCoordonneesAllAgentService} from '../../../../../services/api/getCoordonneesAllAgent.service';
import {MarkerClass} from '../../../../../models/marker-class';
import {SetCoordonneesByCellularService} from '../../../../../services/api/setCoordonneesByCellular.service';
import {CoordonneeClass} from '../../../../../models/coordonnee-class';

declare var navigator: any;
declare var cordova: any;

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss'],
  providers: [ErrorMessageHandlerService, GetCoordonneesByCellularService, GetCoordonneesAllAgentService, SetCoordonneesByCellularService]
})
export class GMapComponent implements OnInit, OnDestroy {
  successMessage = '';
  errorMessage = '';
  _lat: number;
  _lng: number;
  _coordonnees: CoordonneeClass;
  draggable: true;
  zoom = 13;
  marker_myself = '../../../../../../assets/img/arrow.png';
  marker_agent = '../../../../../../assets/img/paleblue_MarkerA.png';
  marker_activeAgent = '../../../../../../assets/img/orange_MarkerA.png';
  myself = new MarkerClass(undefined, undefined, '', '', '380686087517', this.marker_myself);
  _markers = this.userDataService.agentsMarkers_nearest;
  markers = this._markers;
  phone: string;
  alive = true;
  _activeAgent: MarkerClass;
  @Input() myCoordonnees: CoordonneeClass;
  @Input() set activeAgent (data: MarkerClass) {
    this._activeAgent = data;
  };
  get activeAgent (): MarkerClass {
    return this._activeAgent;
  }
  @Input() set agentsMarkers (data: Array<MarkerClass>) {
    this.markers = data;
  }
  @Input() set lat(data: string) {
    this._lat = +data;
  };
  @Input() set lng(data: string) {
    this._lng = +data;
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
       this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
                  ? (this.userDataService.getMyAccounts()['0'].telephone)
                  : localStorage.getItem('telephone');
      this.getMyCoordonees(this.phone + '');
      // this.setDefaultCoord();
      this.loadAgentsCoordonees();
    });
  }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
                  ? (this.userDataService.getMyAccounts()['0'].telephone)
                  : localStorage.getItem('telephone');
      this.getMyCoordonees(this.phone + '');
      // this.setDefaultCoord();
      this.loadAgentsCoordonees();
    } else {
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  setDefaultCoord() {
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
        if (+response.error === 0) {
          this.myself = new MarkerClass(+response.lattitude,
                                        +response.longitude,
                                        this.userDataService.getMyAccounts()['0'].nom,
                                        this.userDataService.getMyAccounts()['0'].prenom,
                                        this.userDataService.getMyAccounts()['0'].telephone,
                                        this.marker_myself);
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
    // try {
    //   if (cordova) {
    //     cordova.plugins.CordovaCall.sendCall('Daniel Marcus');
    //
    //     //simulate your friend answering the call 5 seconds after you call
    //     setTimeout(function(){
    //       cordova.plugins.CordovaCall.connectCall();
    //     }, 5000);
    //
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  public setMyCoordonneesFromCellular(data: CoordonneeClass) {
    this.setCoordonneesByCellularService.setCoordonneesByCellular(+this.phone, data.latitude, data.longitude)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        const response = this.commonServices.xmlResponseParcer_complex( result._body );
      }, (err) => {
        // this.loading = false;
        console.log(err);
        if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
      });
  }

}
