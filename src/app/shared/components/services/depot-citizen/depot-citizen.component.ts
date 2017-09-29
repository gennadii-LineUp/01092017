import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';

@Component({
  selector: 'app-services-depot-citizen',
  templateUrl: './depot-citizen.component.html',
  styleUrls: ['./depot-citizen.component.scss']
})
export class DepotCitizenComponent implements OnInit {
  newReceiver = new ReceiverClass('', '', '');
  receiverExist = false;
  createNewReceiver = true;
  receiverStatus = '';
  receiverToFind = '';
  amountToReceiver = 10;
  receivers = [
    { firstName: 'AAA', lastName: 'Lastname1', phone: '0123 456 789', id: 1 },
    { firstName: 'BBB', lastName: 'Lastname2', phone: '0123 789 456', id: 2 },
    { firstName: 'CCC', lastName: 'Lastname3', phone: '0123 222 444', id: 3 }
  ];

  constructor() { }

  ngOnInit() {
    // this.createNewReceiverMode();
    this.receiverExistMode();
  }

  public submitDepotSitizen() {
    console.log(this.amountToReceiver + '  to send');
  }

  public receiverExistMode() {
    this.clearSearch();
    this.receiverExist = true;
  }
  public createNewReceiverMode() {
    this.clearSearch();
    this.receiverStatus = 'New';
    this.createNewReceiver = true;
  }
  public clearSearch() {
    this.amountToReceiver = undefined;
    // this.receivers = [];
    this.receiverToFind = '';
    this.newReceiver = new ReceiverClass('', '', '');
    // this.receiverExist = false;
    // this.createNewReceiver = false;
    this.receiverStatus = '';
  }
}
