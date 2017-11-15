import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import 'rxjs/add/operator/takeWhile';
import * as moment from 'moment';

@Component({
  selector: 'app-virements-multiples',
  templateUrl: './virements-multiples.component.html',
  styleUrls: ['./virements-multiples.component.scss']
})
export class VirementsMultiplesComponent implements OnInit, OnDestroy {
  errorMessage_contract = '';
  loading_contract = false;
  contract_to_find = true;
  contract_found = true;
  contract_number: string;
  forIdReceiver = 'receiver';
  arrayToSend = [];
  alive = true;

  amount_virementsMultiples: number;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', '', ''),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', '', ''),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '', '')];
  selectedReceivers = [];
  contracts = [{number: 'BD012345678910', conract_id: 15},
               {number: 'PJ112233445511', conract_id: 16},
               {number: 'OK998877664444', conract_id: 17}];

  constructor(public commonServices: CommonServices,
              public userDataService: UserDataService) {}

  ngOnInit() {
    this.gotoContractToFindFunction();
    if ((this.userDataService.getAllContracts()).length) {
      console.log('=== AllContracts\' length ' + this.userDataService.getAllContracts().length);
    } else {
      console.log('=== AllContracts\' is empty ===');
      this.userDataService.setAllContracts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);
    this.userDataService.setReceivers(profil);
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public findContractFunction() {
    console.log(this.contract_number);
    setTimeout(() => {this.gotoContractFoundFunction()}, 100)
  }

  public clearAmount() {this.amount_virementsMultiples = undefined; }
  public clearIndividualAmount(e: any) {
    e.target.previousElementSibling.value = '';
    console.dir(e.target.previousElementSibling.value);
  }
  public chooseContractFunction(contract: any) {
    this.contract_number = '' + contract.reference
                              + ', from ' + this.commonServices.fromServerMoment(contract.debut);
    this.findContractFunction();
  }
  public gotoContractToFindFunction() {
    this.contract_to_find = true;
    this.contract_found = false;
    this.contract_number = undefined;
  }
  public gotoContractFoundFunction() {
    this.contract_to_find = false;
    this.contract_found = true;
  }
  public makeArrToSend() {
    this.arrayToSend = [];
    (this.commonServices.getSelectedReceivers()).forEach(item => {
      const name = (item.split('receiver_'))[1];
      const value = +(window.document.getElementById('amount_to_' + name) as HTMLInputElement).value;
      this.arrayToSend.push({receiver: name, amount: value});
    });
    console.log(this.arrayToSend);
  }

  public submitFunction() {
    console.dir(this.commonServices.getSelectedReceivers());
    console.log(this.amount_virementsMultiples);
    this.makeArrToSend();

  }


}
