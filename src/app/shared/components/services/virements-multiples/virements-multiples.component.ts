import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';

@Component({
  selector: 'app-virements-multiples',
  templateUrl: './virements-multiples.component.html',
  styleUrls: ['./virements-multiples.component.scss']
})
export class VirementsMultiplesComponent implements OnInit {
  errorMessage_contract = '';
  loading_contract = false;
  contract_to_find = true;
  contract_found = true;
  contract_number: string;
  forIdReceiver = 'receiver';
  arrayToSend = [];

  amount_virementsMultiples: number;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', ''),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', ''),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '')];
  selectedReceivers = [];
  contracts = [{number: 'BD012345678910', conract_id: 15},
               {number: 'PJ112233445511', conract_id: 16},
               {number: 'OK998877664444', conract_id: 17}];

  constructor(public commonServices: CommonServices) {}

  ngOnInit() {this.gotoContractToFindFunction(); }


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
    this.contract_number = contract.number;
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
