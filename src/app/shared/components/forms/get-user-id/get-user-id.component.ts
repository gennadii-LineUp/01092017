import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';

@Component({
  selector: 'app-get-user-id',
  templateUrl: './get-user-id.component.html',
  styleUrls: ['./get-user-id.component.scss']
})
export class GetUserIdComponent implements OnInit {
  envoyeur = new EnvoyeurClass('', '', '', '', '', '', '', '', '');
  select_id_type_values = [
    { value: 'CARTE D\'IDENTITE',  display: 'CARTE D\'IDENTITE' },
    { value: 'PASSEPORT', display: 'PASSEPORT' },
    { value: 'PERMIS DE CONDUIRE', display: 'PERMIS DE CONDUIRE' },
    { value: 'AUTRE', display: 'AUTRE'}
  ];

  @Output()
  userData = new EventEmitter<EnvoyeurClass>();

  @Input()
  set setDefaultUser(defaultEnvoyeur: EnvoyeurClass) {this.envoyeur = defaultEnvoyeur; }

// ---------------
  // @Input() envoyeur: EnvoyeurClass;
  // @Output() userData = new EventEmitter<EnvoyeurClass>();
  //
  // public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }
  //
  // public sendData(model: EnvoyeurClass) {
  //   this.envoyeur = model;
  //   this.userData.emit(model);
  //   console.dir(this.envoyeur);
  // }
// ---------------

  // @Input()
  // set setDefaultUser(defaultEnvoyeur: EnvoyeurClass) {this.envoyeur = defaultEnvoyeur; }

  // @Input()
  // set setUserNom(nom: string) {this.envoyeur.nom = nom; }
  // @Input()
  // set setUserPrenom(prenom: string) {this.envoyeur.prenom = prenom; }
  // @Input()
  // set setUserCellulaire(cellulaire: string) {this.envoyeur.cellulaire = cellulaire; console.log(cellulaire); }

  // ('Piter', 'Pen', '773151459', 'Holywood', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2017')

  constructor() { }

  ngOnInit() {
    this.sendData();
  }

  // onNameChange(nom: string) {
  //   this.envoyeur.nom = nom;
  //   this.userData.emit(this.envoyeur);
  // }

  public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }

  public sendData() {
    this.userData.emit(this.envoyeur);
    console.dir(this.envoyeur);
  }
}
