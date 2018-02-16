import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {ReceiverClass} from '../../../../models/receiver-class';
import {W2WVirementAccountService} from '../../../../services/api/W2WVirementAccount.service';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {GetAllCitizenService} from '../../../../services/api/getAllCitizen.service';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import 'rxjs/add/operator/takeWhile';
import {GetFacturiersPaysService} from '../../../../services/api/getFacturiersPays.service';
import {GetCommercantsPaysService} from '../../../../services/api/getCommercantsPays.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';

@Component({
  selector: 'app-services-transfer-compte',
  templateUrl: './transfer-compte.component.html',
  styleUrls: ['./transfer-compte.component.scss'],
  providers: [GetAllCitizenService, W2WVirementAccountService, GetCommissionsTTCService,
    GetAllListAccountService, GetFacturiersPaysService, GetCommercantsPaysService]

})
export class TransferCompteComponent implements OnInit, OnDestroy {
  header_option = '';
  transfer_accounts = true;
  transfer_all = false;
  transfer_standart = false;
  transfer_marchand = false;
  transfer_facture = false;
  profil = '';

  loading = false;
  myAccount: any;
  id_account = '';
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  commission = [];
  receivers = this.userDataService.getReceivers();
  profileAsAgent = this.userDataService.checkUserRole();
  sender = [];
  numTel_fromSelect2 = '';
  factures = [];
  marchands = [];
  userRole = '';
  alive = true;


  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllListAccountService: GetAllListAccountService,
              public getFacturiersPaysService: GetFacturiersPaysService,
              public getCommercantsPaysService: GetCommercantsPaysService,
              public w2WVirementAccountService: W2WVirementAccountService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams) { }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
                                                                  localStorage.getItem('profil');
    console.log(this.profil);

    if (!this.userDataService.getClients().length) {this.userDataService.setClients(); }
    if (!this.userDataService.getCitizens().length) {this.userDataService.setCitizens(); }
    this.getPaiementsFactureFunction();
    this.getPaiementMarchandFunction();
  }

  ngOnDestroy() {
    this.alive = false;
    // this.commonServices.removeEmptySelect2OnDestroy();
  }


  public goToAllAccountsFunction() {
    this.header_option = '';
    this.transfer_accounts = true;
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = false;
    setTimeout(() => { window.document.getElementById(this.id_account).classList.add('active'); }, 1);
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
    switch (this.profil) {
      case 'citizen': {
        this.userDataService.setReceiversForSelect2(this.userDataService.getCitizens());
        // this.userDataService.setReceiversForSelect2(this.userDataService.getClients());
        // SKYPE 20.11.2017:
        // 2. citizen send only to citizen for "transfert d'argent". if they want to send something to customers they will use W2W
        // 3-customer can send money to customer + citizen
        break;
      }
      case 'client':
      case 'agent': {
        this.userDataService.setCitizensClients((this.userDataService.getClients()).concat(this.userDataService.getCitizens()));
        this.userDataService.setReceiversForSelect2(this.userDataService.getCitizensClients());
        break;
      }
      default:  console.log('=== there is a new type of user ! ===');
    }

    this.header_option = '(Standard)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = true;
    this.transfer_marchand = false;
    this.transfer_facture = false;
    this.numTel_fromSelect2 = '';
    this.amountToReceiver = undefined;
    // if (!this.receivers.length) {
    //   this.receivers = this.userDataService.getReceivers();
    // }
  }

  public goToMarchandTransferFunction() {
    this.userDataService.setReceiversForSelect2(this.marchands);
    this.header_option = '(Paiement Marchand)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = true;
    this.transfer_facture = false;
    this.numTel_fromSelect2 = '';
    this.amountToReceiver = undefined;
    // if (!this.receivers.length) {
    //   this.receivers = this.userDataService.getReceivers();
    // }
  }
  public goToFactureTransferFunction() {
    this.userDataService.setReceiversForSelect2(this.factures);
    this.header_option = '(Paiement Facture)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = true;
    this.numTel_fromSelect2 = '';
    this.amountToReceiver = undefined;
    // if (!this.receivers.length) {
    //   this.receivers = this.userDataService.getReceivers();
    // }
  }

  public setSenderFunction(sender: any) {
    this.sender.push(sender);
    console.log(this.sender);
    this.profileAsAgent = false;
  }


  public getPaiementsFactureFunction() {
    this.getFacturiersPaysService.getPaiementFacture()
      .takeWhile(() => this.alive)
      .subscribe(result => {
        const response = this.commonServices.xmlResponseParcer_complexReturn( result._body );
        console.dir( response );
        if (response.return && response.return.length) {
          response.return.forEach(payement => {
            this.factures.push(new ReceiverClass(
              payement.nom, payement.prenom, payement.numTel, '', payement.id, '', '', '', '', payement.type, ''))
          });
        }

      }, err => {
        console.log(err);
      });
  }


  public getPaiementMarchandFunction() {
    this.getCommercantsPaysService.getPaiementMarchand()
      .takeWhile(() => this.alive)
      .subscribe(result => {
        const response = this.commonServices.xmlResponseParcer_complexReturn( result._body );
        console.dir( response );
        if (response.return && response.return.length) {
          response.return.forEach(payement => {
            this.marchands.push(new ReceiverClass(
              payement.nom, payement.prenom, payement.numTel, '', payement.id, '', '', '', '', payement.type, ''))
          });
        }

      }, err => {
        console.log(err);
      })
  }

  public submitTransferCompteFunction() {
    if (this.numTel_fromSelect2 && (+this.amountToReceiver >= 0.01)) {
      if (!(this.numTel_fromSelect2 === 'undefined')) {
        let _numTel_fromSelect2: string;
        this.successMessage_1 = '';
        this.successMessage_2 = '';
        this.errorMessage = '';
        this.loading = true;

        console.log(this.myAccount);
        console.log(this.numTel_fromSelect2);
        if (~(this.numTel_fromSelect2.indexOf(' '))) {
          _numTel_fromSelect2 = this.numTel_fromSelect2.split(', ')[1];
        } else {
          _numTel_fromSelect2 = this.numTel_fromSelect2;
        }
        console.log(_numTel_fromSelect2);

        const beneficiaire = <ReceiverClass>this.userDataService.getReceiverFromSelect2(_numTel_fromSelect2);
        console.log(beneficiaire);

        if (_numTel_fromSelect2) {
          this.getCommissionsTTCService.getCommission(this.amountToReceiver, 'W2W')
            .takeWhile(() => this.alive)
            .subscribe(result => {
              const response = this.commonServices.xmlResponseParcer_simple(result._body);
              console.dir(response);
              if (+response.error === 0) {
                this.commission.push(+response.commission);
                console.log(response.commission);

                this.getAllListAccountService.getMyAccounts(_numTel_fromSelect2)
                  .takeWhile(() => this.alive)
                  .subscribe(result1 => {
                    const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
                    const _accounts = response1.accounts;
                    let receiver_id: number;
                    if (_accounts && _accounts.length) {
                      receiver_id = _accounts['0'].id;
                      console.log(receiver_id);
                    }
                    /////////////////////////////
                    this.w2WVirementAccountService.transferCompteStandart(this.amountToReceiver,
                      response.commission,
                      this.myAccount.id_account,
                      receiver_id)
                      .takeWhile(() => this.alive)
                      .subscribe(result2 => {
                        this.loading = false;
                        const _response = this.commonServices.xmlResponseParcer_simple(result2._body);

                        console.dir(_response);
                        if (+_response.error === 0) {
                          this.errorMessage = '';
                          this.successMessage_1 = response.message + ': ' + response.commission;
                          this.successMessage_2 = _response.message;
                        } else {
                          this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(_response.message);
                        }

                      }, (err) => {
                        this.loading = false;
                        console.log(err);
                        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
                        if (!this.errorMessage) {
                          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
                        }
                      });
                    /////////////////////////////
                  }, (err) => {
                    this.loading = false;
                    console.log(err);
                    this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
                    if (!this.errorMessage) {
                      this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
                    }
                  });
              } else {
                this.loading = false;
                this.errorMessage = response.message + ': ' + response.commission;
                if (response.message) {
                  this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(response.message);
                }
                if (response.statusText) {
                  this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(response.statusText);
                }
              }

            }, (err) => {
              this.loading = false;
              console.log(err);
              if (err._body.type) {
                this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
              }
              if (err.statusText) {
                this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(err.statusText);
              }
            });
        } else {
          this.loading = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent('no cellulaire in the database');
        }
      } else {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent('no cellulaire in the database'); }
    } else {return false; }
  }


  public submitMarchandTransferFunction() {

  }


  public submitFactureTransferFunction() {

  }


  public fillReceiverInfoFunction(myAccount: any) {  // , e: any
    // this.showReceiverInfo = false;
    this.clearSearch();
    this.myAccount = myAccount;
    console.log('=== sender\'s account: ');
    console.log(this.myAccount);
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    this.id_account = this.myAccount.id_account;  // this.id_account = e.currentTarget.id;
    // e.currentTarget.classList.add('active');
    this.showReceiverInfo = true;
  }


  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    this.commission = [];
  }



}
