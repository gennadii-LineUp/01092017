import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataGlossary} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetOperationService} from '../../../../services/api/GetOperation.service';

@Component({
    selector: 'app-services-consultation-operations',
    templateUrl: './consultation-operations.component.html',
    styleUrls: ['./consultation-operations.component.scss'],
    providers: [UserDataGlossary, ErrorMessageHandlerService, GetOperationService]
})
export class ConsultationOperationsComponent implements OnInit {
  loading = false;
  errorMessage = '';
  transactions_history = [];
  showTransactions = false;
  currentAccount = this.userDataGlossary.myAccounts[0];

    constructor(public commonServices: CommonServices,
                public userDataGlossary: UserDataGlossary,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public getOperationService: GetOperationService) { }

    ngOnInit() {
    }


    public sumitFunction(e: any) {
      this.errorMessage = '';
      this.loading = true;
      this.closeParentAccordionItem(e);

      this.showTransactions = false;
      setTimeout(() => { this.showTransactions = true; }, 1000);
      setTimeout(() => { this.colorAmountDependOnValue(); }, 10);

      this.getOperationService.getOperations(this.currentAccount.account_id)
        .subscribe(result => {
          const history = this.commonServices.xmlResponseParcer_complex( result._body );
          console.dir( history );
          // this.transactions_history = history.operation;
          // if (+history.error === 0 && this.transactions_history.length) {
          //   this.showHistorySolde = true;
          // } else {
          //   this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(history.errorMessage);
          // }

        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });

    }


    public chooseAccount(currentAccount: any) {
      this.errorMessage = '';
      this.currentAccount = currentAccount;
      console.log(this.currentAccount);
    }


    public closeParentAccordionItem(e: any) {
      const accordionItems: NodeListOf<Element> = window.document.querySelectorAll('div.accordionItem');
      for (let i = 0; i < accordionItems.length; i++) {
        if (accordionItems[i].className === 'accordionItem close-item send-request') {
          accordionItems[i].className = 'accordionItem close-item';
        }
      }

      const currentAccordionItem = e.currentTarget.parentElement.parentElement;
      if (currentAccordionItem.className === 'accordionItem open') {
        currentAccordionItem.className = 'accordionItem close-item send-request';
      }
    }


    public colorAmountDependOnValue() {
      const amounts = window.document.querySelectorAll('div.consult__item');
      for (let i = 0; i < amounts.length; i++) {
          const direction = (<HTMLSpanElement>amounts[i].firstElementChild.lastChild.previousSibling).innerText[0]; // + or -
          (<HTMLSpanElement>amounts[i].firstElementChild.lastChild.previousSibling).classList.add('profit');
          if (direction === '-') {
            (<HTMLSpanElement>amounts[i].firstElementChild.lastChild.previousSibling).classList.add('lesion');
          }
      }
    }

}
