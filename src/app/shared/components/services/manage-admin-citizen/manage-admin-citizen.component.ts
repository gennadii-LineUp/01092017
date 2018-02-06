import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import {GetCommercantsPaysService} from '../../../../services/api/getCommercantsPays.service';
import {W2WVirementAccountService} from '../../../../services/api/W2WVirementAccount.service';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {GetFacturiersPaysService} from '../../../../services/api/getFacturiersPays.service';
import {GetAllCitizenService} from '../../../../services/api/getAllCitizen.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {UserDataService} from '../../../../models/user-data';
import {CurrencyParams} from '../../../../models/currency_params';

@Component({
  selector: 'app-services-manage-admin-citizen',
  templateUrl: './manage-admin-citizen.component.html',
  styleUrls: ['./manage-admin-citizen.component.scss'],
  providers: [GetAllCitizenService]
})
export class ManageAdminCitizenComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  citizens = [];
  errorMessage = '';
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllCitizenService: GetAllCitizenService,
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

    this.loadCitizens();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadCitizens() {
      this.citizens = [];
      this.getAllCitizenService.getAllCitizens()
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const response = (this.commonServices.xmlResponseParcer_complex(result._body)).uos;
          this.citizens = (response.length) ? response : [];
          console.log(this.citizens);
        }, (err) => {
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
  }
}
