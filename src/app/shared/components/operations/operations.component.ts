import { Component, OnInit } from '@angular/core';
import {ListBanquesSicaService} from '../../../services/api/listBanquesSica.service';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {GetAllNotifService} from '../../../services/api/getAllNotif.service';
import {GetLuNotifService} from '../../../services/api/getLuNotif.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {LireNotifService} from '../../../services/api/lireNotif.service';
import {GetNonLuNotifService} from '../../../services/api/getNonLuNotif.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  providers: [ListBanquesSicaService]
})
export class OperationsComponent implements OnInit {

  userRole = '';
  profil = '';
  loading = false;
  errorMessage = '';
  status = '';
  numTel_fromSelect2 = '';
  notifications = [];
  _notifications = [];
  buttons_notification = [
    {id: 1, caption: 'non lu'},
    {id: 2, caption: 'lu'},
    {id: 3, caption: 'all'}
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
      console.log(myAccounts);
      console.log('hello');
      this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
      // this.loadLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
      // this.loadAllNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    } else {
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(this.profil);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadAllNotificationsFunction(uoId: string) {
    if (!(this.status === 'all')) {
      this.loading = true;
      this.getAllNotifService.getAllNotif(uoId)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          this.status = 'all';
          this.loading = false;
          console.log(result);
          const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)).notifications;
          if (notifications.length) {
            this.notifications = (notifications.length) ? notifications : [];
            this._notifications = this.notifications;
          } else {
            this.errorMessage = 'Error: ' + notifications.message.toLowerCase();
          }
          console.log(notifications);
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }
  }

}
