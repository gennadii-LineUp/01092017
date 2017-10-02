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

    public showTransactionsFunction() {
        this.showTransactions = true;
        setTimeout(() => { this.colorAmountDependOnValue(); }, 10);
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
