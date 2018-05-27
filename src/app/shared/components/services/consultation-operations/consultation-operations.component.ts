import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetOperationService} from '../../../../services/api/GetOperation.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';

@Component({
    selector: 'app-services-consultation-operations',
    templateUrl: './consultation-operations.component.html',
    styleUrls: ['./consultation-operations.component.scss'],
    providers: [ErrorMessageHandlerService, GetOperationService]
})
export class ConsultationOperationsComponent implements OnInit, OnDestroy {
  loading = false;
  successMessage = '';
  errorMessage = '';
  solde: number;
  transactions_all = [];
  transactions_current = [];
  totalOperations = 0;
  showTransactions = false;
  currentAccount = this.userDataService.myAccounts[0];
  profileAsAgent = this.userDataService.checkUserRole();
  sender = [];
  userRole = '';
  alive = true;


  constructor(public commonServices: CommonServices,
                public userDataService: UserDataService,
                public errorMessageHandlerService: ErrorMessageHandlerService,
                public getOperationService: GetOperationService,
                private activateRoute: ActivatedRoute,
                public currencyParams: CurrencyParams) { }

    ngOnInit() {
      this.activateRoute.parent.url
        .takeWhile(() => this.alive)
        .subscribe(resp =>  this.userRole = resp['0'].path);

      if (!(this.userDataService.getMyAccounts()).length) {
        this.userDataService.setMyAccounts();
      }
    }

  ngOnDestroy() {
    this.alive = false;
  }


  public submitFunction(e: any) {
      this.clearAll();
      this.loading = true;
      const _e = e.currentTarget.parentElement.parentElement;
      this.showTransactions = false;

      this.getOperationService.getOperations(this.currentAccount.id_account)
        .subscribe(result => {
          this.loading = false;
          const history = this.commonServices.xmlResponseParcer_complex( result._body );

          if (+history.error === 0 && history.total) {
            if (history.operation && +history.total > 0) {
              this.transactions_all = this.removeElementsWithEmptyAmount( history.operation );
              this.totalOperations = this.transactions_all.length;
              this.solde = history.operation[0].soldeCompte;
            }
            if (+history.total === 0) {
              this.successMessage = history.message;
            }
            this.closeParentAccordionItem(_e);
            setTimeout(() => { this.showTransactions = true; }, 500);
          } else {
            if (history.errorMessage) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(history.errorMessage); }
            if (history.message) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(history.message); }
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

  public setSenderFunction(sender: any) {
    this.sender.push(sender);
    this.profileAsAgent = false;
  }


  public chooseAccount(currentAccount: any) {
      this.commonServices.accordionCloseAllItemsFunction();
      this.clearAll();
      this.currentAccount = currentAccount;
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


    public setTransactionsCurrentFunction(transactions_current_obs: Observable<any>): void {
      this.transactions_current = [];
      transactions_current_obs.subscribe((data) => {
        this.transactions_current.push(data);
      });
    }

    public clearAll() {
      this.loading = false;
      this.successMessage = '';
      this.errorMessage = '';
      this.solde = undefined;
      this.totalOperations = 0;
      this.transactions_all = [];
      this.showTransactions = false;
    }

}
