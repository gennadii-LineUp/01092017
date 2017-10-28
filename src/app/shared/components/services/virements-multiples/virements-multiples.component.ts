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

  amount_virementsMultiples: number;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen'),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen'),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen')];
  selectedReceivers = [];

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
  public gotoContractToFindFunction() {
    this.contract_to_find = true;
    this.contract_found = false;
    this.contract_number = undefined;
  }
  public gotoContractFoundFunction() {
    this.contract_to_find = false;
    this.contract_found = true;
  }

  public submitFunction() {
    console.dir(this.commonServices.getSelectedReceivers());
    console.log(this.amount_virementsMultiples);
  }


}
