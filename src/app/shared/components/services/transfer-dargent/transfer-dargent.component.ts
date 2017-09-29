import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {UserDataGlossary} from '../../../../models/user-data';

@Component({
  selector: 'app-services-transfer-dargent',
  templateUrl: './transfer-dargent.component.html',
  styleUrls: ['./transfer-dargent.component.scss'],
  providers: [UserDataGlossary]
})
export class TransferDargentComponent implements OnInit {
  newReceiver = new ReceiverClass('', '', '', '');
  amountToReceiver: number;
  showReceiverInfo = false;


  constructor(public userDataGlossary: UserDataGlossary) { }

  ngOnInit() {
  }


  public submitDepoClient() {
    console.dir(this.newReceiver);
    console.log(this.amountToReceiver);
  }
  public fillReceiverInfoFunction(myAccount_id: number, e: any) {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    e.currentTarget.classList.add('active');

    this.showReceiverInfo = true;
    console.log(myAccount_id);
  }


  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new ReceiverClass('', '', '', '');
  }



}
