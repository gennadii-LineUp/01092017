import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {UserDataService} from '../../../../models/user-data';
import {W2COrdreRetraitService} from '../../../../services/api/W2COrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import 'rxjs/add/operator/takeWhile';

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
  newReceiver = this.userDataService.beneficiaires[0];
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  alive = true;
fruits = [{id: '1', text: '11'},  {id: '2', text: '22'},  {id: '3', text: '33'}];
frui: any;

  constructor(public userDataService: UserDataService,
              public w2COrdreRetraitService: W2COrdreRetraitService,
              public commonServices: CommonServices,
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
    this.userDataService.setReceivers(profil);

  }

  ngOnDestroy() {
    this.alive = false;
  }


  public fillReceiverInfoFunction(myAccount: any, e: any) {
    // this.showReceiverInfo = false;
    this.clearSearch();
    // this.newReceiver = this.userDataService.beneficiaires[0];
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
    console.log(this.frui);
    // console.log(this.myAccount);
    // this.w2COrdreRetraitService.transferDargent(this.myAccount.telephone, this.amountToReceiver, this.newReceiver)
    //   .takeWhile(() => this.alive)
    //   .subscribe(result => {
    //     this.loading = false;
    //     console.log(result._body);
    //     const response = this.commonServices.xmlResponseParcer_simple( result._body );
    //
    //     console.dir( response );
    //     if (+response.error === 0) {
    //       this.showReceiverInfo = false;
    //       this.clearSearch();
    //       this.successMessage_1 = response.message + ';';
    //       this.successMessage_2 = 'code: ' + response.code;
    //       this.discardReceiverInfoFunction();
    //     } else {
    //       this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
    //     }
    //
    //   }, (err) => {
    //     this.loading = false;
    //     console.log(err);
    //     this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
    //   });

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
