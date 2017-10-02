import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataGlossary} from '../../../../models/user-data';

@Component({
    selector: 'app-services-consultation-operations',
    templateUrl: './consultation-operations.component.html',
    styleUrls: ['./consultation-operations.component.scss'],
    providers: [UserDataGlossary]
})
export class ConsultationOperationsComponent implements OnInit {
    showTransactions = false;

    constructor(public commonServices: CommonServices,
                public userDataGlossary: UserDataGlossary) { }

    ngOnInit() {
    }

    public showTransactionsFunction(e: any) {
      this.closeParentAccordionItem(e);

      this.showTransactions = false;
      setTimeout(() => { this.showTransactions = true; }, 1000);

      setTimeout(() => { this.colorAmountDependOnValue(); }, 10);
    }

    public closeParentAccordionItem(e: any) {
      const accordionItems: NodeListOf<Element> = window.document.querySelectorAll('div.accordionItem');
      for (let i = 0; i < accordionItems.length; i++) {
        if (accordionItems[i].className === 'accordionItem close-item send-request') {
          accordionItems[i].className = 'accordionItem close-item';
        }
      }

      const currentAccordionItem = e.currentTarget.parentElement.parentElement;
      if (currentAccordionItem.className === 'accordionItem open') {
        currentAccordionItem.className = 'accordionItem close-item send-request';
      }
    }

    public colorAmountDependOnValue() {
      const amounts = window.document.querySelectorAll('div.consult__item');
      for (let i = 0; i < amounts.length; i++) {
          const direction = (<HTMLSpanElement>amounts[i].firstElementChild.lastChild.previousSibling).innerText[0]; // + or -
          (<HTMLSpanElement>amounts[i].firstElementChild.lastChild.previousSibling).classList.add('profit');
          if (direction === '-') {
            (<HTMLSpanElement>amounts[i].firstElementChild.lastChild.previousSibling).classList.add('lesion');
          }
      }
    }

}
