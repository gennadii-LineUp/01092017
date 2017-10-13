import { Component, OnInit } from '@angular/core';
import {UserDataGlossary} from '../../../../models/user-data';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {ReceiverClass} from '../../../../models/receiver-class';
import {W2WVirementAccountService} from '../../../../services/api/W2WVirementAccount.service';

@Component({
  selector: 'app-services-transfer-compte',
  templateUrl: './transfer-compte.component.html',
  styleUrls: ['./transfer-compte.component.scss'],
  providers: [UserDataGlossary, W2WVirementAccountService]

})
export class TransferCompteComponent implements OnInit {
  header_option = '';
  transfer_accounts = true;
  transfer_all = false;
  transfer_standart = false;
  transfer_marchand = false;
  transfer_facture = false;

  loading = false;
  myAccount: any;
  account_id = '';
  newReceiver = this.userDataGlossary.beneficiaires[0];
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage = '';
  errorMessage = '';


  constructor(public userDataGlossary: UserDataGlossary,
              public commonServices: CommonServices,
              public w2WVirementAccountService: W2WVirementAccountService,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
  }

  public goToAllAccountsFunction() {
    this.header_option = '';
    this.transfer_accounts = true;
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = false;
    setTimeout(() => { window.document.getElementById(this.account_id).classList.add('active'); }, 1);
  }
  public goToAllTransferFunction() {
    this.header_option = '';
    this.clearSearch();
    this.transfer_accounts = false;
    this.transfer_all = true;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = false;
  }
  public goToStandartTransferFunction() {
    this.header_option = '(Standart)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = true;
    this.transfer_marchand = false;
    this.transfer_facture = false;
  }
  public goToMarchandTransferFunction() {
    // this.header_option = '(Paiement Marchand)';
    // this.transfer_accounts = false;
    // this.transfer_all = false;
    // this.transfer_standart = false;
    // this.transfer_marchand = true;
    // this.transfer_facture = false;
  }
  public goToFactureTransferFunction() {
    // this.header_option = '(Paiement Facture)';
    // this.transfer_accounts = false;
    // this.transfer_all = false;
    // this.transfer_standart = false;
    // this.transfer_marchand = false;
    // this.transfer_facture = true;
  }


  public submitTransferCompteFunction() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    console.log(this.myAccount);
    console.log(this.amountToReceiver);
    console.log(this.newReceiver);
    this.w2WVirementAccountService.transferCompteStandart(this.amountToReceiver, this.myAccount.account_id, this.newReceiver.account_id)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          // this.showReceiverInfo = false;
          // this.clearSearch();
          // this.successMessage = response.message;
          // this.discardReceiverInfoFunction();
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        if (!this.errorMessage) {
          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
        }
      });

  }


  public fillReceiverInfoFunction(myAccount: any, e: any) {
    // this.showReceiverInfo = false;
    this.clearSearch();
    this.newReceiver = this.userDataGlossary.beneficiaires[0];
    this.myAccount = myAccount;
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    this.account_id = e.currentTarget.id;
    e.currentTarget.classList.add('active');
    this.showReceiverInfo = true;
  }


  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new ReceiverClass('', '', '', '', 0);
    this.successMessage = '';
    this.errorMessage = '';
  }



}
