import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-transfer-compte',
  templateUrl: './transfer-compte.component.html',
  styleUrls: ['./transfer-compte.component.scss']
})
export class TransferCompteComponent implements OnInit {
  transfer_all = true;
  transfer_standart = false;
  transfer_marchand = false;
  transfer_facture = false;

  constructor() { }

  ngOnInit() {
  }

  public goToAllTransferFunction() {
    this.transfer_all = true;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = false;
  }
  public goToStandartTransferFunction() {
    this.transfer_all = false;
    this.transfer_standart = true;
    this.transfer_marchand = false;
    this.transfer_facture = false;
  }
  public goToMarchandTransferFunction() {
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = true;
    this.transfer_facture = false;
  }
  public goToFactureTransferFunction() {
    this.transfer_all = false;
    this.transfer_standart = false;
    this.transfer_marchand = false;
    this.transfer_facture = true;
  }


}
