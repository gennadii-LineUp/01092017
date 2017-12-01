import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import 'rxjs/add/operator/takeWhile';
import {XW2WService} from '../../../../services/api/XW2W.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import {CommonServices} from '../../../../services/common.service';

@ Component({
  selector: 'app-services-paiements',
  templateUrl: 'paiements.component.html',
  styleUrls: ['paiements.component.scss'],
  providers: [XW2WService, GetAllListAccountService]
})
export class PaiementsComponent implements OnInit, OnDestroy {
  errorMessage = '';
  loading = true;
  operations = [];
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllListAccountService: GetAllListAccountService,
              public xW2WService: XW2WService,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    if ((this.userDataService.getAllContracts()).length) {
      console.log('=== AllContracts\' length ' + this.userDataService.getAllContracts().length);
    } else {
      console.log('=== AllContracts are empty ===');
      this.userDataService.setAllContracts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    //
    // if ((this.userDataService.getMyAccounts()).length) {
    //   if ((this.userDataService.getAllContracts()).length) {
    //     console.log('=== AllContracts\' length ' + this.userDataService.getAllContracts().length);
    //   } else {
    //     console.log('=== AllContracts are empty ===');
    //     this.userDataService.setAllContracts();
    //   }
    //
    //  // this.paiementsRecusFunction((this.userDataService.getMyAccounts()['0']).id_account);
    // } else {
    //
    //
    //   this.loading = true;
    //   this.getAllListAccountService.getMyAccounts(localStorage.telephone)
    //     .takeWhile(() => this.alive)
    //     .subscribe(result => {
    //       const response1 = this.commonServices.xmlResponseParcer_complex(result._body);
    //       const accounts = response1.accounts;
    //       if (accounts && accounts.length && accounts['0'].status === 'ACTIF') {
    //
    //        this.paiementsRecusFunction('' + accounts['0'].id);
    //       }
    //     }, err => {
    //       this.loading = false;
    //       this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
    //       if (!this.errorMessage) {
    //         this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
    //       }
    //     });
    // }
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public paiementsRecusFunction(accountId: string) {
    this.loading = true;
    this.operations = [];
    this.xW2WService.paiementsRecus(accountId)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        const response = this.commonServices.xmlResponseParcer_complex(result._body);
        console.log(response);
       if (+response.error === 0) {
         this.operations = response.operation;
       }
        this.userDataService.setMyAccounts();
      }, err => {
        console.log(err);
        this.loading = false;
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        if (!this.errorMessage) {
          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
        }
      });
  }
}
