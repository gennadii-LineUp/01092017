import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';

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

  constructor() { }

  ngOnInit() {}

  public defineReceiversFunction(e: any) {
    const currentReceiver = e.currentTarget;
    currentReceiver.classList.toggle('active');
    this.countSelectedReceiversFunction();
  }

  public selectAllReceiversFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.search__user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.add('active');
    }
    this.countSelectedReceiversFunction();
  }

  public unSelectAllReceiversFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.search__user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
    }
    this.countSelectedReceiversFunction();
  }

  public countSelectedReceiversFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.search__user.active');
    this.selectedReceivers = [];
    for (let i = 0; i < allItems.length; i++) {
      this.selectedReceivers.push(+allItems[i].id);
    }
  }

  public clearAmount() {this.amount_virementsMultiples = undefined; }

  public submitFunction() {
    console.dir(this.selectedReceivers);
    console.log(this.amount_virementsMultiples);
  }


}
