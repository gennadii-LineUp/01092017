import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {UserDataGlossary} from '../../../../models/user-data';
import {W2COrdreRetraitService} from '../../../../services/api/W2COrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';

@Component({
  selector: 'app-services-transfer-dargent',
  templateUrl: './transfer-dargent.component.html',
  styleUrls: ['./transfer-dargent.component.scss'],
  providers: [UserDataGlossary, W2COrdreRetraitService]
})
export class TransferDargentComponent implements OnInit {
  myAccount: any;
  newReceiver = this.userDataGlossary.beneficiaires[0];
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage = '';
  errorMessage = '55 4654 654645 64564 645646 6546465 64646 6465465 7878 87878 8787 87878 878 98989 0101 0101 4';

  constructor(public userDataGlossary: UserDataGlossary,
              public w2COrdreRetraitService: W2COrdreRetraitService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
  }


  public fillReceiverInfoFunction(myAccount: any, e: any) {
    this.successMessage = '';
    this.myAccount = myAccount;
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    e.currentTarget.classList.add('active');

    this.showReceiverInfo = true;
  }

  public discardReceiverInfoFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
    }
  }



  public submitTransferDargentFunction() {
    this.successMessage = '';
    this.errorMessage = '';

    console.log(this.newReceiver);
    this.w2COrdreRetraitService.transferDargent(this.myAccount.login, this.amountToReceiver, this.newReceiver)
      .subscribe(result => {
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.showReceiverInfo = false;
          this.clearSearch();
          this.successMessage = response.message;
          this.discardReceiverInfoFunction();
        } else {
          // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }

      }, (err) => {
        console.log(err);
      });
  }


  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new ReceiverClass('', '', '', '');
    this.successMessage = '';
    this.errorMessage = '';
  }



}
