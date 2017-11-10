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
  successMessage = '';
  errorMessage = '';
  errorMessagHistory = '';
  solde: number;
  totalOperations = 0;
  transactions_history = [];
  myAccount: any;
  profileAsAgent = this.userDataService.checkUserRole();
  sender = [this.userDataService.getSender_default()];

  showRequestResult = false;


  constructor(public commonServices: CommonServices,
              public userDataService: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public w2ISoldeService: W2ISoldeService) { }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
  }

  public submitSoldeFunction() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.w2ISoldeService.getSolde(this.myAccount.id_account)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.showRequestResult = !this.showRequestResult;
          this.solde = +response.solde;
          /////////////////////////////
          this.w2ISoldeService.getHistorySolde(this.myAccount.id_account)
            .subscribe(resulHistory => {
              const responsHistory = this.commonServices.xmlResponseParcer_complex( resulHistory._body );
              console.dir( responsHistory );
              if (+responsHistory.error === 0 && responsHistory.total) {
                this.totalOperations = responsHistory.total;
                if (responsHistory.operation && +responsHistory.total > 0) {
                  this.transactions_history = responsHistory.operation;
                  // this.showHistorySolde = true;
                }
                if (+responsHistory.total === 0) {
                  // this.showRequestResult = false;
                  this.successMessage = responsHistory.message;
                }
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
          if (response.errorMessage) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.errorMessage); }
          if (response.message) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message); }
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }


  public chooseAccount(myAccount: any) {
    this.clearAll();
    this.myAccount = myAccount;
    console.log(this.myAccount);
  }

  public setSenderFunction(sender: any) {
    this.sender.push(sender);
    console.log(this.sender);
    this.profileAsAgent = false;
  }


  public clearAll() {
    this.successMessage = '';
    this.errorMessage = '';
    this.solde = undefined;
    this.transactions_history = [];
    this.totalOperations = 0;
  }


}
