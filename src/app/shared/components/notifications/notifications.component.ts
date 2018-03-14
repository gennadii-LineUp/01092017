import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {ActivatedRoute} from '@angular/router';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {CommonServices} from '../../../services/common.service';
import {GetAllNotifService} from '../../../services/api/getAllNotif.service';
import 'rxjs/add/operator/takeWhile';
import {LireNotifService} from '../../../services/api/lireNotif.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [GetAllNotifService, LireNotifService]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  loading = false;
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
              public currencyParams: CurrencyParams,
              public lireNotifService: LireNotifService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      this.loadNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      // console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
      this.loadNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(this.profil);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadNotificationsFunction(uoId: string) {
    this.loading = true;
    this.notifications = [];
    this.getAllNotifService.getAllNotif(uoId)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        console.log(result);
        const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)).notifications; //
        if (notifications.length) {
          this.notifications = (notifications.length) ? notifications : [];
          this._notifications = this.notifications;
        } else {
          this.errorMessage = 'Error: ' + notifications.message.toLowerCase();
        }
        console.log(notifications);
        // this.userDataService.setReceiversForSelect2(this.citizens);
      }, (err) => {
        this.loading = false;
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

  public isNonLu(lu: string): boolean {
    return (lu === 'lu') ? false : true;
  }

  markNotificationAsLu(id: string) {
    console.log(id);
    const notif_element = window.document.getElementById(id);
    if (notif_element && notif_element.classList && notif_element.classList.contains('non-lu')) {
      notif_element.classList.remove('non-lu');
    }
    this.LireNotifFunction(id);
  }

  LireNotifFunction(notifId: string) {
    this.loading = true;
    this.lireNotifService.lireNotif(notifId)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        console.log(result);
        const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)); //
        // if (notifications.length) {
        //   this.notifications = (notifications.length) ? notifications : [];
        //   this._notifications = this.notifications;
        // } else {
        //   this.errorMessage = 'Error: ' + notifications.message.toLowerCase();
        // }
        console.log(notifications);
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });

  }
}
