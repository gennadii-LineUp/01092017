import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GetCoordonneesByCellularService} from '../../../../../services/api/getCoordonneesByCellular.service';
import {CommonServices} from '../../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../../services/error-message-handler.service';
import {UserDataService} from '../../../../../models/user-data';
import {GetCoordonneesAllAgentService} from '../../../../../services/api/getCoordonneesAllAgent.service';
import {MarkerClass} from '../../../../../models/marker-class';
import {SetCoordonneesByCellularService} from '../../../../../services/api/setCoordonneesByCellular.service';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss'],
  providers: [ErrorMessageHandlerService, GetCoordonneesByCellularService, GetCoordonneesAllAgentService, SetCoordonneesByCellularService]
})
export class GMapComponent implements OnInit, OnDestroy {
  successMessage = '';
  errorMessage = '';
  lat = 15.0458118;
  lng = -16.858833;
  draggable: true;
  zoom = 13;
  marker_myself = '../../../../../../assets/img/arrow.png';
  marker_agent = '../../../../../../assets/img/A.png';
  myself: MarkerClass;
  markers = [new MarkerClass(14.739159, -17.461516, '', 'AA', '../../../../../../assets/img/user.png'),
             new MarkerClass(14.733484, -17.465587, '', 'BB', '../../../../../../assets/img/logo.png')
  ];
  phone: string;
  alive = true;

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
      this.getMyCoordonees(this.phone + '');
      this.loadAgentsCoordonees();
    });
  }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
      this.phone = (this.userDataService.getMyAccounts()['0'].telephone)
                  ? (this.userDataService.getMyAccounts()['0'].telephone)
                  : localStorage.getItem('telephone');
      this.getMyCoordonees(this.phone + '');
      this.loadAgentsCoordonees();
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public getMyCoordonees(phone: string) {
    this.getCoordonneesByCellularService.getMyCoordonneesByCellular(phone)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        const response = this.commonServices.xmlResponseParcer_simple( result._body );
        console.dir( response );
        if (+response.error === 0) {
          this.lat = +response.lattitude;
          this.lng = +response.longitude;
          this.myself = new MarkerClass(this.lat, this.lng,
                                        this.userDataService.getMyAccounts()['0'].nom,
                                        this.userDataService.getMyAccounts()['0'].telephone,
                                        '../../../../../../assets/img/track-8.png');
          console.log(this.lat + '  ' + this.lng);
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
        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        console.dir( response );
        if (+response.error === 0 && response.listAgents.length) {
          // this.markers = [];
          // response.listAgents.forEach(item => {
          //   this.markers.push(new MarkerClass(item.lattitude, item.longitude, item.nom, item.telephone, ''));
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
}
