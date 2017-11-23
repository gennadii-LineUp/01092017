import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {UserDataService} from '../../../../models/user-data';
import {W2COrdreRetraitService} from '../../../../services/api/W2COrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-services-transfer-dargent',
  templateUrl: './transfer-dargent.component.html',
  styleUrls: ['./transfer-dargent.component.scss'],
  providers: [W2COrdreRetraitService]
})
export class TransferDargentComponent implements OnInit, OnDestroy {
  loading = false;
  profileAsAgent = this.userDataService.checkUserRole();
  sender = [this.userDataService.getSender_default()];
  myAccount: any;
  newReceiver = new ReceiverClass('', '', '', '', 0, '', '', '', '', '', '');
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  alive = true;
  numTel_fromSelect2 = '';
  userRole = '';


  constructor(public userDataService: UserDataService,
              public w2COrdreRetraitService: W2COrdreRetraitService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute) { }

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

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);

    switch (profil) {
      case 'CITIZEN': {
        if (!this.userDataService.getCitizens().length) {this.userDataService.setCitizens(); }
        setTimeout(() => this.userDataService.setReceiversForSelect2(this.userDataService.getCitizens()), 500);
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


  public fillReceiverInfoFunction(myAccount: any, e: any) {
    // this.showReceiverInfo = false;
    this.clearSearch();
    this.myAccount = myAccount;
    console.log(myAccount);
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    e.currentTarget.classList.add('active');

    // setTimeout(() => { this.showReceiverInfo = true; }, 500);
    this.showReceiverInfo = true;
  }

  public setSenderFunction(sender: any) {
    this.sender.push(sender);
    console.log(this.sender);
    this.profileAsAgent = false;
  }

  public discardReceiverInfoFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
    }
  }



  public submitTransferDargentFunction() {
    this.loading = true;
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    const beneficiaire = <ReceiverClass>this.userDataService.getReceiverFromSelect2(this.numTel_fromSelect2);
    console.log(beneficiaire);
    console.log(this.numTel_fromSelect2);

    if (this.numTel_fromSelect2) {
      this.w2COrdreRetraitService.transferDargent(this.myAccount.telephone, this.amountToReceiver, beneficiaire)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          this.loading = false;
          console.log(result._body);
          const response = this.commonServices.xmlResponseParcer_simple( result._body );

          console.dir( response );
          if (+response.error === 0) {
            this.showReceiverInfo = false;
            this.clearSearch();
            this.successMessage_1 = response.message + ';';
            this.successMessage_2 = 'code: ' + response.code;
            this.discardReceiverInfoFunction();
          } else {
            this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          }

        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    } else {
      this.loading = false;
      this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent('no cellulaire in the database');
    }
  }


  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new ReceiverClass('', '', '', '', 0, '', '', '', '', '', '');
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
  }



}
