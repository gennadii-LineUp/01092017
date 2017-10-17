import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {UserDataService} from '../../../../models/user-data';
import {W2COrdreRetraitService} from '../../../../services/api/W2COrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';

@Component({
  selector: 'app-services-transfer-dargent',
  templateUrl: './transfer-dargent.component.html',
  styleUrls: ['./transfer-dargent.component.scss'],
  providers: [UserDataService, W2COrdreRetraitService]
})
export class TransferDargentComponent implements OnInit {
  loading = false;
  myAccount: any;
  newReceiver = this.userDataGlossary.beneficiaires[0];
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage = '';
  errorMessage = '';

  constructor(public userDataGlossary: UserDataService,
              public w2COrdreRetraitService: W2COrdreRetraitService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
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

    // setTimeout(() => { this.showReceiverInfo = true; }, 500);
    this.showReceiverInfo = true;
  }

  public discardReceiverInfoFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
    }
  }



  public submitTransferDargentFunction() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    console.log(this.newReceiver);
    this.w2COrdreRetraitService.transferDargent(this.myAccount.login, this.amountToReceiver, this.newReceiver)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.showReceiverInfo = false;
          this.clearSearch();
          this.successMessage = response.message;
          this.discardReceiverInfoFunction();
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }


  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new ReceiverClass('', '', '', '', 0);
    this.successMessage = '';
    this.errorMessage = '';
  }



}
