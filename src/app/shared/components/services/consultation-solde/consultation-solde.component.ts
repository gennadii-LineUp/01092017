import { Component, OnInit, OnDestroy } from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {W2ISoldeService} from '../../../../services/api/W2ISolde.service';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';
import {GetHistorySoldeService} from '../../../../services/api/getHistorySolde.service';
import {CurrencyParams} from '../../../../models/currency_params';

@Component({
  selector: 'app-services-consultation-solde',
  templateUrl: './consultation-solde.component.html',
  styleUrls: ['./consultation-solde.component.scss'],
  providers: [ErrorMessageHandlerService, W2ISoldeService, GetHistorySoldeService]
})
export class ConsultationSoldeComponent implements OnInit, OnDestroy {
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
  sender = [];

  showRequestResult = false;
  userRole = '';
  alive = true;


  constructor(public commonServices: CommonServices,
              public userDataService: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public w2ISoldeService: W2ISoldeService,
              public getHistorySoldeService: GetHistorySoldeService,
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


  public submitSoldeFunction() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.w2ISoldeService.getSolde(this.myAccount.id_account)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          // this.showRequestResult = !this.showRequestResult;
          this.solde = +response.solde;
          ///////////////////////////
          this.getHistorySoldeService.getHistorySolde(this.myAccount.id_account)
            .takeWhile(() => this.alive)
            .subscribe(resulHistory => {
              this.loading = false;
              const responsHistory = this.commonServices.xmlResponseParcer_complex( resulHistory._body );
              console.dir( responsHistory );
              if (+responsHistory.error === 0 && responsHistory.histories.length > 0) {
                this.showRequestResult = !this.showRequestResult;
                this.transactions_history = responsHistory.histories;
                // this.solde = responsHistory.histories[0].solde;
              } else {
                this.errorMessagHistory = this.errorMessageHandlerService.getMessageEquivalent(responsHistory.errorMessage);
              }

            }, (err) => {
              this.loading = false;
              console.log(err);
              this.errorMessagHistory = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
            });
          ///////////////////////
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
