import { Component, OnInit } from '@angular/core';
import {UserDataGlossary} from '../../../../models/user-data';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {ReceiverClass} from '../../../../models/receiver-class';

@Component({
  selector: 'app-services-transfer-compte',
  templateUrl: './transfer-compte.component.html',
  styleUrls: ['./transfer-compte.component.scss'],
  providers: [UserDataGlossary]

})
export class TransferCompteComponent implements OnInit {
  transfer_all = true;
  transfer_standart = false;
  transfer_marchand = false;
  transfer_facture = false;

  loading = false;
  myAccount: any;
  newReceiver = this.userDataGlossary.beneficiaires[0];
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage = '';
  errorMessage = '';


  constructor(public userDataGlossary: UserDataGlossary,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
  }

  public goToAllTransferFunction() {
    this.transfer_all = true;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = false;
  }
  public goToStandartTransferFunction() {
    this.transfer_all = false;
    this.transfer_standart = true;
    this.transfer_marchand = false;
    this.transfer_facture = false;
  }
  public goToMarchandTransferFunction() {
    // this.transfer_all = false;
    // this.transfer_standart = false;
    // this.transfer_marchand = true;
    // this.transfer_facture = false;
  }
  public goToFactureTransferFunction() {
    // this.transfer_all = false;
    // this.transfer_standart = false;
    // this.transfer_marchand = false;
    // this.transfer_facture = true;
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
    e.currentTarget.classList.add('active');
    this.showReceiverInfo = true;
  }


  // public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new ReceiverClass('', '', '', '');
    this.successMessage = '';
    this.errorMessage = '';
  }



}
