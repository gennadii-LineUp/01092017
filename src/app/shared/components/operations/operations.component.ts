import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListBanquesSicaService} from '../../../services/api/listBanquesSica.service';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {ActivatedRoute} from '@angular/router';
import {NewBeneficiaryService} from '../../../services/api/newBeneficiary.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  providers: [ListBanquesSicaService, NewBeneficiaryService]
})
export class OperationsComponent implements OnInit, OnDestroy {

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
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public listBanquesSicaService: ListBanquesSicaService,
              public newBeneficiaryService: NewBeneficiaryService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      // this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
      // this.loadLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
      // this.loadAllNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    this.loadListBanquesSicaFunction();
    if ((this.userDataService.getMyAccounts()).length) {
      // this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
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

  loadListBanquesSicaFunction() {
    // if (!(this.status === 'all')) {
    //   this.loading = true;
      this.listBanquesSicaService.getListBanques()
        .takeWhile(() => this.alive)
        .subscribe(result => {
          // this.status = 'all';
          // this.loading = false;456
          console.log(result);
          const notifications = (this.commonServices.xmlResponseParcer_complex(result._body)); // .notifications;
          console.log(notifications);
          // if (notifications.length) {
          //   this.notifications = (notifications.length) ? notifications : [];
          //   this._notifications = this.notifications;
          // } else {
          //   this.errorMessage = 'Error: ' + notifications.message.toLowerCase();
          // }
          // console.log(notifications);
        }, (err) => {
          // this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    // }
  }

}
