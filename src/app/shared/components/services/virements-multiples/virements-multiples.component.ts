import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';

@Component({
  selector: 'app-virements-multiples',
  templateUrl: './virements-multiples.component.html',
  styleUrls: ['./virements-multiples.component.scss']
})
export class VirementsMultiplesComponent implements OnInit {
  amount_virementsMultiples: number;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15'),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2'),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24')];
  selectedReceivers = [];

  constructor(public commonServices: CommonServices) {}

  ngOnInit() {}


  public clearAmount() {this.amount_virementsMultiples = undefined; }

  public submitFunction() {
    console.dir(this.commonServices.getSelectedReceivers());
    console.log(this.amount_virementsMultiples);
  }


}
