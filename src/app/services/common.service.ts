import { Injectable } from '@angular/core';
import {ReceiverClass} from '../models/receiver-class';

@Injectable()
export class CommonServices {
  selectedReceivers = [];

  constructor() {}


  public accordionToggleItemFunction(e: any) {
    const currentClass = e.currentTarget.className;
    const accordionItems: NodeListOf<Element> = window.document.querySelectorAll('div.accordionItem');
    for (let i = 0; i < accordionItems.length; i++) {
      if (accordionItems[i].className === 'accordionItem close-item send-request') {
        continue;
      }
      accordionItems[i].className = 'accordionItem close-item';
    }

    const currentAccordionItem = e.currentTarget;
    if ((currentClass === 'accordionItem close-item send-request')) {return true; }
    if ((currentClass === 'accordionItem close-item')) {
      currentAccordionItem.classList.remove('close-item');
      currentAccordionItem.classList.add('open');
    } else {
      currentAccordionItem.className = 'accordionItem close-item';
    }
  }


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

  public getSelectedReceivers(): any {
    return this.selectedReceivers;
  }
  public setSelectedReceivers(value: any) {
    this.selectedReceivers = value;
  }

}
