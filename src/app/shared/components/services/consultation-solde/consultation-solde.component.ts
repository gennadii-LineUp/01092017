import { Component, OnInit } from '@angular/core';
import {CommonServices} from '../../../../services/common.service';

@Component({
  selector: 'app-services-consultation-solde',
  templateUrl: './consultation-solde.component.html',
  styleUrls: ['./consultation-solde.component.scss']
})
export class ConsultationSoldeComponent implements OnInit {
  showRequestResult = false;

  constructor(public commonServices: CommonServices) { }

  ngOnInit() {
  }

  public showRequestResultFunction() {
    this.showRequestResult = true;
  }

}
