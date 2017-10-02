import { Component, OnInit } from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataGlossary} from '../../../../models/user-data';

@Component({
  selector: 'app-services-consultation-solde',
  templateUrl: './consultation-solde.component.html',
  styleUrls: ['./consultation-solde.component.scss'],
  providers: [UserDataGlossary]
})
export class ConsultationSoldeComponent implements OnInit {
  showRequestResult = false;


  constructor(public commonServices: CommonServices,
              public userDataGlossary: UserDataGlossary) { }

  ngOnInit() {
  }

  public showRequestResultFunction() {
    this.showRequestResult = !this.showRequestResult;
  }


}
