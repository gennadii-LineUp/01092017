import {Component, OnInit} from '@angular/core';
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
    }

}
