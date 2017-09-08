import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-consultation-solde',
  templateUrl: './consultation-solde.component.html',
  styleUrls: ['./consultation-solde.component.scss']
})
export class ConsultationSoldeComponent implements OnInit {
  showRequestResult = false;

  constructor() { }

  ngOnInit() {
  }

  public showRequestResultFunction() {
    this.showRequestResult = true;
  }

}
