import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetCoordonneesByCellularService} from '../../../../../services/api/getCoordonneesByCellular.service';
import {CommonServices} from '../../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../../services/error-message-handler.service';
import {UserDataService} from '../../../../../models/user-data';

export class MarkerClass {
  latitude: number;
  longitude: number;
  title: string;
  iconUrl: string;

  constructor(latitude: number,
              longitude: number,
              title: string,
              iconUrl: string) {

    this.latitude = latitude;
    this.longitude = longitude;
    this.title = title;
    this.iconUrl = iconUrl;
  }
}


@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.scss'],
  providers: [ErrorMessageHandlerService, GetCoordonneesByCellularService]
})
export class GMapComponent implements OnInit, OnDestroy {
  successMessage = '';
  errorMessage = '';
  lat = 15.0458118;
  lng = -16.858833;
  draggable: true;
  zoom = 7;
  markers = [new MarkerClass(14.7955497, -15.6452902, 'AA', '../../../../../../assets/img/user.png'),
              new MarkerClass(14.9268314, -16.2581422, 'BB', '../../../../../../assets/img/logo.png')
  ];
  alive = true;

  constructor(public userDataService: UserDataService,
              public getCoordonneesByCellularService: GetCoordonneesByCellularService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    const phone = ((<any>this.userDataService.getUser).telephone) ? (<any>this.userDataService.getUser).telephone :
      localStorage.getItem('telephone');

    this.loadMyCoordonees(phone + '');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public loadMyCoordonees(phone: string) {
    this.getCoordonneesByCellularService.getMyCoordonneesByCellular(phone)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        // this.loading = false;
        const response = this.commonServices.xmlResponseParcer_simple( result._body );
        console.dir( response );
        if (+response.error === 0) {
          this.lat = +response.lattitude;
          this.lng = +response.longitude;
          console.log(this.lat + '  ' + this.lng);
          this.markers.push(new MarkerClass(this.lat, this.lng, 'Gena', '../../../../../../assets/img/user.png'))
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
