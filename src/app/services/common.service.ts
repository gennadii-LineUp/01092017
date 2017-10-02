import { Injectable } from '@angular/core';

@Injectable()
export class CommonServices {

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

    let currentAccordionItem = e.currentTarget;
    if ((currentClass === 'accordionItem close-item send-request')) {return true; }
    if ((currentClass === 'accordionItem close-item')) {
      currentAccordionItem.classList.remove('close-item');
      currentAccordionItem.classList.add('open');
    } else {
      currentAccordionItem.className = 'accordionItem close-item';
    }
  }

// || (currentClass === 'accordionItem close-item send-request')

}
