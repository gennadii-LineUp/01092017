import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {ActivatedRoute} from '@angular/router';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {CommonServices} from '../../../services/common.service';
import {GetAllNotifService} from '../../../services/api/getAllNotif.service';
import 'rxjs/add/operator/takeWhile';
import {LireNotifService} from '../../../services/api/lireNotif.service';
import {GetLuNotifService} from '../../../services/api/getLuNotif.service';
import {GetNonLuNotifService} from '../../../services/api/getNonLuNotif.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [GetAllNotifService, LireNotifService, GetLuNotifService, GetNonLuNotifService]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  loading = false;
  errorMessage = '';
  status = '';
  numTel_fromSelect2 = '';
  notifications = [];
  _notifications = [];
  notifs_nonLues_total: number;
  notifs_lues_total: number;
  notifs_toutes_total: number;
  calculateNotifsMode = true;
  buttons_notification = [
    {id: 1, caption: 'non lues'},
    {id: 2, caption: 'lues'},
    {id: 3, caption: 'toutes'}
  ];

  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllNotifService: GetAllNotifService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public lireNotifService: LireNotifService,
              public getLuNotifService: GetLuNotifService,
              public getNonLuNotifService: GetNonLuNotifService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId, !this.calculateNotifsMode);
      this.loadLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId, this.calculateNotifsMode);
      this.loadAllNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId, this.calculateNotifsMode);
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId, !this.calculateNotifsMode);
      this.loadLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId, this.calculateNotifsMode);
      this.loadAllNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId, this.calculateNotifsMode);
    } else {
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadAllNotificationsFunction(uoId: string, calculateNotifsMode: boolean) {
    if (!(this.status === 'all')) {
      this.loading = true;
      this.getAllNotifService.getAllNotif(uoId)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)).notifications;
          if (calculateNotifsMode) {
            this.notifs_toutes_total = (notifications && notifications.length) ? notifications.length : 0;
          } else {
            this.status = 'all';
            this.loading = false;
            if (notifications && notifications.length) {
              this.notifications = (notifications.length) ? notifications : [];
              this._notifications = this.notifications.slice();
            } else {
              if (notifications && notifications.message) {
                this.errorMessage = 'Error: ' + notifications.message.toLowerCase();
              }
            }
          }
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }
  }

  loadLuNotificationsFunction(uoId: string, calculateNotifsMode: boolean) {
    if (!(this.status === 'lu')) {
      this.loading = true;
      this.getLuNotifService.getLuNotif(uoId)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)).notifications;
          if (calculateNotifsMode) {
            this.notifs_lues_total = (notifications && notifications.length) ? notifications.length : 0;
          } else {
            this.status = 'lu';
            this.loading = false;
            // console.log(result);
            this.notifications = (notifications && notifications.length) ? notifications : [];
            this._notifications = (this.notifications && this.notifications.length) ? this.notifications.slice() : [];
            this.notifs_lues_total = (this.notifications && this.notifications.length) ? this.notifications.length : 0;
            // console.log(notifications);
          }
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }
  }

  loadNonLuNotificationsFunction(uoId: string, calculateNotifsMode: boolean) {
    if (!(this.status === 'non-lu')) {
      this.loading = true;
      this.getNonLuNotifService.getNonLuNotif(uoId)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)).notifications;
          // console.log(notifications);
          this.notifs_nonLues_total = (notifications && notifications.length) ? notifications.length : 0;
            this.status = 'non-lu';
            this.loading = false;
            // console.log(result);
            if (notifications && notifications.length) {
              this.notifications = (notifications.length) ? notifications : [];
              this._notifications = this.notifications.slice();
              this.notifs_nonLues_total = this.notifications.length;
            } else {
              if (notifications && notifications.message) {
                this.errorMessage = 'Error: ' + notifications.message.toLowerCase();
              }
            }
            // console.log(notifications);
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }
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
    const notif_element = window.document.getElementById(id);
    if (notif_element && notif_element.classList && notif_element.classList.contains('non-lu')) {
      notif_element.classList.remove('non-lu');
      this.notifs_nonLues_total--;
      this.notifs_lues_total++;
      // notifs_toutes_total: number;
      this.LireNotifFunction(id);
    }
    if (!(this.status === 'lu')) {
      if (this.status === 'non-lu') {
        const temp = this.notifications;
        temp.forEach((notif, i) => {
          if (notif.id === id) {
            this.notifications.splice(i, 1);
          }
        });
      }
    }
  }

  LireNotifFunction(notifId: string) {
    this.loading = true;
    this.lireNotifService.lireNotif(notifId)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        const notifications = (this.commonServices.xmlResponseParcer_complex(result._body));
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });

  }
}
