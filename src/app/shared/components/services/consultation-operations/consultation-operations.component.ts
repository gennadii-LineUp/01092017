import {Component, OnInit} from '@angular/core';
import {CommonServices} from '../../../../services/common.service';

@Component({
    selector: 'app-services-consultation-operations',
    templateUrl: './consultation-operations.component.html',
    styleUrls: ['./consultation-operations.component.scss']
})
export class ConsultationOperationsComponent implements OnInit {
    showRequestResult = false;

    constructor(public commonServices: CommonServices) { }

    ngOnInit() {
    }

    public showRequestResultFunction() {
        this.showRequestResult = true;
    }

}
