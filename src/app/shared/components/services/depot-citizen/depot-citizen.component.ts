import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';

@Component({
  selector: 'app-services-depot-citizen',
  templateUrl: './depot-citizen.component.html',
  styleUrls: ['./depot-citizen.component.scss']
})
export class DepotCitizenComponent implements OnInit {
  newReceiver = new ReceiverClass('', '', '', '', 0);
  receiverExist = false;
  createNewReceiver = true;
  receiverStatus = '';
  receiverToFind = '';
  amount_depotCitizen = 10;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3)];

  constructor(public commonServices: CommonServices) { }

  ngOnInit() {
    // this.createNewReceiverMode();
    this.receiverExistMode();
  }

  public submitDepotSitizen() {
    console.log(this.amount_depotCitizen + '  to send');
    console.dir(this.commonServices.getSelectedReceivers());
  }

  public receiverExistMode() {
    this.clearSearch();
    this.receiverExist = true;
    this.commonServices.unSelectAllReceiversFunction();
  }
  public createNewReceiverMode() {
    this.clearSearch();
    this.receiverStatus = 'New';
    this.createNewReceiver = true;
  }
  public clearAmount() {this.amount_depotCitizen = undefined; }
  public clearSearch() {
    this.amount_depotCitizen = undefined;
    // this.receivers = [];
    this.receiverToFind = '';
    this.newReceiver = new ReceiverClass('', '', '', '', 0);
    this.receiverExist = false;
    this.createNewReceiver = false;
    this.receiverStatus = '';
  }
}
