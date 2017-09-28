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

  constructor() { }

  ngOnInit() {
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
    this.newReceiver = new ReceiverClass('', '', '');
    this.receiverExist = false;
    this.createNewReceiver = false;
    this.receiverStatus = '';
  }
}
