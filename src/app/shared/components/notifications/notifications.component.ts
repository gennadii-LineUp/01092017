import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {ActivatedRoute} from '@angular/router';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {CommonServices} from '../../../services/common.service';
import {GetAllNotifService} from '../../../services/api/getAllNotif.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [GetAllNotifService]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  errorMessage = '';
  numTel_fromSelect2 = '';
  notifications = [];
  _notifications = [];

  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllNotifService: GetAllNotifService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams) { }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      // console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      // console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(this.profil);

    this.loadNotifications();

  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadNotifications() {
    this.notifications = [];
    this.getAllNotifService.getAllNotif(this.userDataService.getMyAccounts()['0'].uoId)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        console.log(result);
        const response = (this.commonServices.xmlResponseParcer_complex(result._body)).notifications;
        this.notifications = (response.length) ? response : [];
        this._notifications = this.notifications;
        console.log(response);
        // this.userDataService.setReceiversForSelect2(this.citizens);
      }, (err) => {
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  findCitizen() {
    const temp = [];
    const arr = this.userDataService.getReceiversForSelect2();

    if (this.numTel_fromSelect2.length > 0) {
      arr.forEach((obj) => {
        if (~(obj.text.toLowerCase()).indexOf(this.numTel_fromSelect2.toLowerCase())) {
          this.notifications = this._notifications;
          this.notifications.forEach(citizen => {
            if (citizen.numTel === obj.id) {
              temp.push(citizen);
            }
          });
        }
      });
      this.notifications = temp;
    } else {
      this.notifications = this._notifications;
    }
  }

}
