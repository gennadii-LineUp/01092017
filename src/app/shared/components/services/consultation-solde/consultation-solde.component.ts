import { Component, OnInit } from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {W2ISoldeService} from '../../../../services/api/W2ISolde.service';

@Component({
  selector: 'app-services-consultation-solde',
  templateUrl: './consultation-solde.component.html',
  styleUrls: ['./consultation-solde.component.scss'],
  providers: [ErrorMessageHandlerService, W2ISoldeService]
})
export class ConsultationSoldeComponent implements OnInit {
  loading = false;
  showHistorySolde = false;
  errorMessage = '';
  errorMessagHistory = '';
  solde: number;
  totalOperations = 0;
  transactions_history = [];
  currentAccount = this.userDataGlossary.myAccounts[0];

  showRequestResult = false;


  constructor(public commonServices: CommonServices,
              public userDataGlossary: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public w2ISoldeService: W2ISoldeService) { }

  ngOnInit() {
  }

  public submitSoldeFunction() {
    this.loading = true;
    this.errorMessage = '';

    this.w2ISoldeService.getSolde(this.currentAccount.account_id)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.showRequestResult = !this.showRequestResult;
          this.solde = +response.solde;
          /////////////////////////////
          this.w2ISoldeService.getHistorySolde(this.currentAccount.account_id)
            .subscribe(resulHistory => {
              const responsHistory = this.commonServices.xmlResponseParcer_complex( resulHistory._body );
              console.dir( responsHistory );
              this.totalOperations = responsHistory.total;
              this.transactions_history = responsHistory.operation;
              if (+responsHistory.error === 0 && this.transactions_history.length) {
                this.showHistorySolde = true;
              } else {
                this.errorMessagHistory = this.errorMessageHandlerService.getMessageEquivalent(responsHistory.errorMessage);
              }

            }, (err) => {
              this.loading = false;
              console.log(err);
              this.errorMessagHistory = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
            });
          /////////////////////////
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.errorMessage);
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }


  public chooseAccount(currentAccount: any) {
    this.clearAll();
    this.currentAccount = currentAccount;
    console.log(this.currentAccount);
  }


  public clearAll() {
    this.solde = undefined;
    this.transactions_history = [];
    this.totalOperations = 0;
  }


}
