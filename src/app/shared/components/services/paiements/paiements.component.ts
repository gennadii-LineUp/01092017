import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import 'rxjs/add/operator/takeWhile';
import {XW2WService} from '../../../../services/api/XW2W.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import {CommonServices} from '../../../../services/common.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';

@ Component({
  selector: 'app-services-paiements',
  templateUrl: 'paiements.component.html',
  styleUrls: ['paiements.component.scss'],
  providers: [XW2WService, GetAllListAccountService]
})
export class PaiementsComponent implements OnInit, OnDestroy {
  contract_to_select = true;
  contract_current = '';
  errorMessage = '';
  loading = false;
  operations = [];
  userRole = '';
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public activatedRoute: ActivatedRoute,
              public xW2WService: XW2WService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public currencyParams: CurrencyParams) { }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');

    if (!(this.userDataService.getMyAccounts()).length) {
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public chooseContractFunction(contract: any) {
    const contracts = this.userDataService.getAllContracts();
    this.contract_current = (contract.data['0'].text).split('.')['0'];
    // this.contract_current = (contracts.filter(x => x.id === contract.value))['0'];
    if (contract.data && contract.data['0'].id) {
      this.paiementsRecusFunction((this.userDataService.getMyAccounts()['0']).id_account, contract.data['0'].id);
    }
  }

  public paiementsRecusFunction(accountId: string, idContrat: string) {
    this.loading = true;
    this.operations = [];
    this.contract_to_select = false;
    this.xW2WService.paiementsRecus(accountId, idContrat)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        const response = this.commonServices.xmlResponseParcer_complex(result._body);
          if (+response.error === 0) {
           this.operations = response.operation;
         }
      }, err => {
        console.log(err);
        this.loading = false;
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        if (!this.errorMessage) {
          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
        }
      });
  }

  public chooseAnotherContractFunction() {
    this.contract_to_select = true;
    this.contract_current = '';
  }
}
