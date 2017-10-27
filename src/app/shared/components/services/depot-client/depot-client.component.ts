import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-depot-client',
  templateUrl: './depot-client.component.html',
  styleUrls: ['./depot-client.component.scss']
})
export class DepotClientComponent implements OnInit {
  amount_depotClient: number;

  constructor() { }

  ngOnInit() {
  }

  public clearAmount() {this.amount_depotClient = undefined; }

  public submitFunction() {
    console.log(this.amount_depotClient);
  }


}
