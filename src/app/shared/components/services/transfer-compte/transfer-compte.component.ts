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

@Component({
  selector: 'app-services-transfer-compte',
  templateUrl: './transfer-compte.component.html',
  styleUrls: ['./transfer-compte.component.scss'],
  providers: [GetAllCitizenService, W2WVirementAccountService, GetCommissionsTTCService,
    GetAllListAccountService]

})
export class TransferCompteComponent implements OnInit, OnDestroy {
  header_option = '';
  transfer_accounts = true;
  transfer_all = false;
  transfer_standart = false;
  transfer_marchand = false;
  transfer_facture = false;

  loading = false;
  myAccount: any;
  id_account = '';
  // newReceiver = this.userDataService.beneficiaires[0];
  newReceiver = new ReceiverClass('', '', '', '', undefined, '', '', '', '', '', '');
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  commission = [];
  receivers = this.userDataService.getReceivers();
  profileAsAgent = this.userDataService.checkUserRole();
  sender = [this.userDataService.getSender_default()];
  numTel_fromSelect2 = '';
  alive = true;


  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllListAccountService: GetAllListAccountService,
              public w2WVirementAccountService: W2WVirementAccountService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
                                                                  localStorage.getItem('profil');
    console.log(profil);

    switch (profil) {
      case 'CITIZEN': {
        if (!this.userDataService.getClients().length) {this.userDataService.setClients(); }
        setTimeout(() => this.userDataService.setReceiversForSelect2(this.userDataService.getClients()), 500);
        // SKYPE 20.11.2017:
        // 2. citizen send only to citizen for "transfert d'argent". if they want to send something to customers they will use W2W
        // 3-customer can send money to customer + citizen
        break;
      }
      case 'CLIENT':
      case 'AGENT': {
        if (!this.userDataService.getClients().length) {this.userDataService.setClients(); }
        if (!this.userDataService.getCitizens().length) {this.userDataService.setCitizens(); }
        setTimeout(() => {
          this.userDataService.setCitizensClients((this.userDataService.getClients()).concat(this.userDataService.getCitizens()));
          this.userDataService.setReceiversForSelect2(this.userDataService.getCitizensClients());
        }, 900);
        break;
      }
      default:  console.log('=== there is a new type of user ! ===');
    }
  }

  ngOnDestroy() {
    this.alive = false;
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
    this.header_option = '(Standart)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = true;
    this.transfer_marchand = false;
    this.transfer_facture = false;
    if (!this.receivers.length) {
      this.receivers = this.userDataService.getReceivers();
    }
  }
  public goToMarchandTransferFunction() {
    this.header_option = '(Paiement Marchand)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = true;
    this.transfer_facture = false;
    if (!this.receivers.length) {
      this.receivers = this.userDataService.getReceivers();
    }
  }
  public goToFactureTransferFunction() {
    this.header_option = '(Paiement Facture)';
    this.transfer_accounts = false;
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = true;
    if (!this.receivers.length) {
      this.receivers = this.userDataService.getReceivers();
    }
  }

  public setSenderFunction(sender: any) {
    this.sender.push(sender);
    console.log(this.sender);
    this.profileAsAgent = false;
  }

  public setBeneficiaryFunction(beneficiary: any) {
    console.log(beneficiary);
    this.newReceiver = beneficiary;
    console.log(this.newReceiver);
  }


  public submitStandartTransferFunction() {
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    this.loading = true;

    console.log(this.myAccount);
    console.log(this.amountToReceiver);
    console.log(this.newReceiver);

    const beneficiaire = this.userDataService.getReceiverFromSelect2(this.numTel_fromSelect2);

    this.getCommissionsTTCService.getCommission(this.amountToReceiver, 'W2W')
      .takeWhile(() => this.alive)
      .subscribe(result => {
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.commission.push(+response.commission);
          console.log(response.commission);

          this.getAllListAccountService.getMyAccounts(beneficiaire.numTel)
            .takeWhile(() => this.alive)
            .subscribe(result1 => {
            console.log(result1._body);
            const response1 = this.commonServices.xmlResponseParcer_complex( result1._body );
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
                console.log(result2._body);
                const _response = this.commonServices.xmlResponseParcer_simple( result2._body );

                console.dir( _response );
                if (+_response.error === 0) {
                  this.errorMessage = '';
                  this.successMessage_1 = response.message + ' - ' + response.commission;
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
          this.errorMessage = response.message + ' - ' + response.commission;
          if (response.message) {this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(response.message); }
          if (response.statusText) {this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(response.statusText); }
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        if (err._body.type) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
        if (err.statusText) {this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(err.statusText); }
      });

  }


  public submitMarchandTransferFunction() {

  }


  public submitFactureTransferFunction() {

  }


  public fillReceiverInfoFunction(myAccount: any) {  // , e: any
    // this.showReceiverInfo = false;
    this.clearSearch();
    this.newReceiver = new ReceiverClass('', '', '', '', undefined, '', '', '', '', '', '');
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
    // this.newReceiver = new ReceiverClass('', '', '', '', undefined, '', '', '', '', '', '');
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    this.commission = [];
  }



}
