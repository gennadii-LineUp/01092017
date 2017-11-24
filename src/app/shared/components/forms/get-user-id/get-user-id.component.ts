import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EnvoyeurClass} from '../../../models/envoyeur-class';

@Component({
  selector: 'app-get-user-id',
  templateUrl: './get-user-id.component.html',
  styleUrls: ['./get-user-id.component.scss']
})
export class GetUserIdComponent implements OnInit {
  envoyeur = new EnvoyeurClass('Piter', 'Pen', '773151459', 'Holywood', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2017');
  @Output()
  userData = new EventEmitter<EnvoyeurClass>();
// ('Piter', 'Pen', '773151459', 'Holywood', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2017')

  constructor() { }

  ngOnInit() {
    this.sendData();
  }

  public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }

  public sendData() {
    this.userData.emit(this.envoyeur);
  }
}
