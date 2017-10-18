import {Component, OnInit} from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetOperationService} from '../../../../services/api/GetOperation.service';

@Component({
    selector: 'app-services-consultation-operations',
    templateUrl: './consultation-operations.component.html',
    styleUrls: ['./consultation-operations.component.scss'],
    providers: [ErrorMessageHandlerService, GetOperationService]
})
export class ConsultationOperationsComponent implements OnInit {
  loading = false;
  errorMessage = '';
  solde: number;
  transactions_history = [];
  totalOperations = 0;
  showTransactions = false;
  currentAccount = this.userDataGlossary.myAccounts[0];

    constructor(public commonServices: CommonServices,
                public userDataGlossary: UserDataService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public getOperationService: GetOperationService) { }

    ngOnInit() {}


    public sumitFunction(e: any) {
      this.errorMessage = '';
      this.loading = true;
      const _e = e.currentTarget.parentElement.parentElement;
      this.showTransactions = false;

      this.getOperationService.getOperations(this.currentAccount.account_id)
        .subscribe(result => {
          this.loading = false;
          const history = this.commonServices.xmlResponseParcer_complex( result._body );
          console.dir( history );
          this.transactions_history = this.removeElementsWithEmptyAmount( history.operation );
          this.totalOperations = this.transactions_history.length;
          if (+history.error === 0 && this.transactions_history.length) {
            this.solde = history.operation[0].soldeCompte;
            this.closeParentAccordionItem(_e);
            setTimeout(() => { this.showTransactions = true; }, 500);
          } else {
            this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(history.errorMessage);
          }
          setTimeout(() => { this.commonServices.colorAmountDependOnValue('div.consult__item'); }, 10);
        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }


    public removeElementsWithEmptyAmount(arr: any) {
      for (let i = 0; i < arr.length; i++) {
        if  (arr[i].montant) {
          continue;
        } else {
          arr.splice(i, 1);
        }
      }
      return arr;
    }


    public chooseAccount(currentAccount: any) {
      this.clearAll();
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

      const currentAccordionItem = e;
      if (currentAccordionItem.className === 'accordionItem open') {
        currentAccordionItem.className = 'accordionItem close-item send-request';
      }
    }


    public clearAll() {
      this.loading = false;
      this.errorMessage = '';
      this.solde = undefined;
      this.totalOperations = 0;
    }

}
