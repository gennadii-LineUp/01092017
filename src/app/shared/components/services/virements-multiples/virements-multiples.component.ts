import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import 'rxjs/add/operator/takeWhile';
import * as moment from 'moment';
import {W2XWalletService} from '../../../../services/api/W2XWallet.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetCitizenContractService} from '../../../../services/api/getCitizenContract.service';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';

@Component({
  selector: 'app-virements-multiples',
  templateUrl: './virements-multiples.component.html',
  styleUrls: ['./virements-multiples.component.scss'],
  providers: [W2XWalletService, GetCitizenContractService, GetAllListAccountService]
})
export class VirementsMultiplesComponent implements OnInit, OnDestroy {
  errorMessage_contract = '';
  errorMessage_virements = '';
  successMessage_1 = '';
  successMessage_2 = '';
  loading_contract = false;
  loading_virements = false;
  contract_to_find = true;
  contract_found = true;
  contract_number: string;
  contract_number_valid: string;
  contractsCustomer = [];
  contract_fromSelect2 = '';
  userRole = '';
  alive = true;

  amount_virementsMultiples: number;

  constructor(public commonServices: CommonServices,
              public activatedRoute: ActivatedRoute,
              public userDataService: UserDataService,
              public w2XWalletService: W2XWalletService,
              public getCitizenContractService: GetCitizenContractService,
              public getAllListAccountService: GetAllListAccountService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public currencyParams: CurrencyParams) {}

  ngOnInit() {
    this.gotoContractToFindFunction();

    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
    this.commonServices.removeEmptySelect2OnDestroy();
  }


  public findContractFunction() {
    console.log(this.contract_number);
    setTimeout(() => {this.gotoContractFoundFunction()}, 100)
  }

  public clearAmount() {this.amount_virementsMultiples = undefined; }
  public clearIndividualAmount(e: any) {
    e.target.previousElementSibling.value = '';
    console.dir(e.target.previousElementSibling.value); return;
  }
  public chooseContractFunction(contract: any) {
    console.log(contract);
    this.clearSearch();
    // "C201751015198 de 10.06.2017. Valide à partir de 29.05.2017. VALIDE. BICIS banque."
    this.contract_number = (contract.data['0'].text).split('.')['0'];
    this.contract_number_valid = (contract.data['0'].text).split('.')['1'] + '. Sélectionnez les destinataires:';
    this.findContractFunction();
    this.getContractsCustomerFunction(contract.data['0'].id);
  }
  public gotoContractToFindFunction() {
    this.contract_to_find = true;
    this.contract_found = false;
    this.contract_number = undefined;
    this.contract_number_valid = undefined;
  }
  public gotoContractFoundFunction() {
    this.contract_to_find = false;
    this.contract_found = true;
  }

  public makeBeneficiaryToSend(): any {
    const beneficiaryToSend = [];
    (this.commonServices.getSelectedReceivers()).forEach(item => {
      const name = (item.split('receiver_'))[1] || '';
      const value = ((window.document.getElementById('amount_to_' + name) as HTMLInputElement).value )
                   ? +(window.document.getElementById('amount_to_' + name) as HTMLInputElement).value : 0;
      const _id = (this.contractsCustomer.filter(x => x.id === name))['0'].__id;
      console.log((this.contractsCustomer.filter(x => x.id === name))['0'].__id);
      beneficiaryToSend.push({beneficiary_id: name, montant: value, __id: _id});
    });
    console.log(beneficiaryToSend);
    return beneficiaryToSend;
  }

  public getContractsCustomerFunction(idContract: number) {
    this.contractsCustomer = [];
    this.getCitizenContractService.getCitizensContract(idContract)
      .takeWhile(() => this.alive)
      .subscribe((result) => {
        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        this.contractsCustomer = response.citizen;
        console.log(this.contractsCustomer);
        if (this.contractsCustomer && (this.contractsCustomer.length > 0)) {
          this.contractsCustomer.forEach(customer => {
            this.getAllListAccountService.getMyAccounts(customer.numTel)
              .takeWhile(() => this.alive)
              .subscribe(result1 => {
                const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
                console.log(response1);
                // const uoId = response1.accounts['0'].uoId;
                const id = response1.accounts['0'].id;
                console.log('id => ' + id);
                customer['__id'] = id;
              }, err1 => {console.log(err1); });
          })
        }
      }, (err) => {
        console.log(err);
      });
  }

  public submitFunction() {
    if (this.commonServices.getSelectedReceivers().length) {
      this.loading_virements = true;
      console.dir(this.commonServices.getSelectedReceivers());
      console.log(this.makeBeneficiaryToSend());

      this.w2XWalletService.virementsMultiplesW2XW(+((this.userDataService.getMyAccounts())['0'].uoId), this.makeBeneficiaryToSend())
        .takeWhile(() => this.alive)
        .subscribe((result) => {
            this.loading_virements = false;
            console.log(result._body);
            const response = this.commonServices.xmlResponseParcer_simple(result._body);
            console.dir(response);
            if (+response.error === 0) {
              this.successMessage_1 = 'Bravo !';
              this.successMessage_2 = response.message;
              this.gotoContractToFindFunction();
            } else {
              this.errorMessage_virements = response.message;
            }
          },
          (err) => {
            this.loading_virements = false;
            console.log(err);
            if (err._body.type) {
              this.errorMessage_virements = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
            }
            if (err.statusText) {
              this.errorMessage_virements = this.errorMessageHandlerService.getMessageEquivalent(err.statusText);
            }
          });
    } else {return false; }
  }

  public setNewAmounttoAll() {
    console.log(this.amount_virementsMultiples);
    this.contractsCustomer.forEach((obj) => {
      obj.lastlastAmountContract = this.amount_virementsMultiples;
    });
  }

  public receiverWasSelectedByUser(id: number): boolean {
    return ((this.commonServices.getIDSelectedReceivers()).indexOf(+id) !== -1);
  }

  public clearSearch() {
    this.errorMessage_contract = '';
    this.errorMessage_virements = '';
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.amount_virementsMultiples = undefined;
  }

}
