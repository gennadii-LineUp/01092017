import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import 'rxjs/add/operator/takeWhile';
import * as moment from 'moment';
import {W2XWalletService} from '../../../../services/api/W2XWallet.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';

@Component({
  selector: 'app-virements-multiples',
  templateUrl: './virements-multiples.component.html',
  styleUrls: ['./virements-multiples.component.scss'],
  providers: [W2XWalletService]
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
  forIdReceiver = 'receiver';
  alive = true;

  amount_virementsMultiples: number;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', '', ''),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', '', ''),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '', '')];
  selectedReceivers = [];
  // contracts = [{number: 'BD012345678910', conract_id: 15},
  //              {number: 'PJ112233445511', conract_id: 16},
  //              {number: 'OK998877664444', conract_id: 17}];

  constructor(public commonServices: CommonServices,
              public userDataService: UserDataService,
              public w2XWalletService: W2XWalletService,
              public errorMessageHandlerService: ErrorMessageHandlerService) {}

  ngOnInit() {
    this.gotoContractToFindFunction();
    if ((this.userDataService.getAllContracts()).length) {
      console.log('=== AllContracts\' length ' + this.userDataService.getAllContracts().length);
    } else {
      console.log('=== AllContracts\' is empty ===');
      this.userDataService.setAllContracts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);
    this.userDataService.setReceivers(profil);

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public findContractFunction() {
    console.log(this.contract_number);
    setTimeout(() => {this.gotoContractFoundFunction()}, 100)
  }

  public clearAmount() {this.amount_virementsMultiples = undefined; }
  public clearIndividualAmount(e: any) {
    e.target.previousElementSibling.value = '';
    console.dir(e.target.previousElementSibling.value);
  }
  public chooseContractFunction(contract: any) {
    this.clearSearch();
    this.contract_number = '' + contract.reference
                              + ', from ' + this.commonServices.fromServerMoment(contract.debut);
    this.findContractFunction();
  }
  public gotoContractToFindFunction() {
    this.contract_to_find = true;
    this.contract_found = false;
    this.contract_number = undefined;
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
      beneficiaryToSend.push({beneficiary_id: name, montant: value});
    });
    console.log(beneficiaryToSend);
    return beneficiaryToSend;
  }

  public submitFunction() {
    this.loading_virements = true;
    console.dir(this.commonServices.getSelectedReceivers());
    console.log(this.amount_virementsMultiples);
    console.log((this.userDataService.getMyAccounts())['0'].id_account);

    this.w2XWalletService.virementsMultiplesW2XW(+((this.userDataService.getMyAccounts())['0'].id_account), this.makeBeneficiaryToSend())
      .takeWhile(() => this.alive)
      .subscribe((result) => {
          this.loading_virements = false;
          console.log(result._body);
          const response = this.commonServices.xmlResponseParcer_simple( result._body );
          console.dir( response.message );
          this.successMessage_1 = 'Bravo !';
          this.successMessage_2 = response.message;
          this.gotoContractToFindFunction();
        },
        (err) => {
          this.loading_virements = false;
          console.log(err);
          if (err._body.type) {this.errorMessage_virements = this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
          if (err.statusText) {this.errorMessage_virements = this.errorMessageHandlerService.getMessageEquivalent(err.statusText); }
        });

  }

  public clearSearch() {
    this.errorMessage_contract = '';
    this.errorMessage_virements = '';
    this.successMessage_1 = '';
    this.successMessage_2 = '';
  }

}
