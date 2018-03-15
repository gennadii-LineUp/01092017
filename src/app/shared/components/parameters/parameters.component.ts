import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {UserDataService} from '../../../models/user-data';
import {CommonServices} from '../../../services/common.service';
import {CurrencyParams} from '../../../models/currency_params';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  loading = false;
  errorMessage = '';
  status = '';

  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams) {
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

    if ((this.userDataService.getMyAccounts()).length) {
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

}
