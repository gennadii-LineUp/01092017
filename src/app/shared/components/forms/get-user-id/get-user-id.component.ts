import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';
import {DatepickerClass} from '../../../../models/datepicker-class';
import {CustomDatepickerI18n, I18n} from '../../../../models/datepicker-i18n';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {PassportClass} from '../../../../models/passport-class';

@Component({
  selector: 'app-get-user-id',
  templateUrl: './get-user-id.component.html',
  styleUrls: ['./get-user-id.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // french language
})
export class GetUserIdComponent implements OnInit {
  envoyeur = new EnvoyeurClass('', '', '', '', '', 'SEN', '', '', '');
  select_id_type_values = [
    { value: 'CARTE D\'IDENTITE',  display: 'CARTE D\'IDENTITE' },
    { value: 'PASSEPORT', display: 'PASSEPORT' },
    { value: 'PERMIS DE CONDUIRE', display: 'PERMIS DE CONDUIRE' },
    { value: 'AUTRE', display: 'AUTRE'}
  ];
  date = '11/13/2016';
  datepickerDebut;
  datepickerExpiration;
  minDate = {year: 1950, month: 1, day: 1};
  maxDate = {year: 2060, month: 1, day: 1};
  _envoyeur_documents = Array<PassportClass>(0);

  @Output()
  userData = new EventEmitter<EnvoyeurClass>();

  @Input()
  set setDefaultUser(defaultEnvoyeur: EnvoyeurClass) {
    console.log(defaultEnvoyeur);
    this.envoyeur = defaultEnvoyeur;
    this.datepickerDebut = new DatepickerClass(undefined, undefined, undefined);
    this.datepickerExpiration = new DatepickerClass(undefined, undefined, undefined);
    console.log(this.envoyeur);
  }
  @Input()
  set envoyeur_documents(data: Array<PassportClass>) {
    this._envoyeur_documents = data;
    console.log(this._envoyeur_documents);
  }

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

  constructor() {}

  ngOnInit() {
    this.sendData();
  }

  public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }
  public clearDP(type: string) {
    if (type === 'dpDebut') {
      this.envoyeur.id_debut = '';
      this.datepickerDebut = new DatepickerClass(undefined, undefined, undefined);
    }
    if (type === 'dpExpiration') {
      this.envoyeur.id_fin = '';
      this.datepickerExpiration = new DatepickerClass(undefined, undefined, undefined);
    }
    this.sendData();
  }

  public transformDataToString(e: any, type: string) {
    let _datepickerDebut = '';
    let _datepickerExpiration = '';
    if (type === 'dpDebut') {
      if (e && e.year && e.month && e.day) {
        _datepickerDebut = '' + e.year + '-'
          + ((('' + e.month).length > 1) ? e.month : ('0' + e.month)) + '-'
          + ((('' + e.day).length > 1) ? e.day : ('0' + e.day));
      }
      this.envoyeur.id_debut = (_datepickerDebut.length > 0) ? _datepickerDebut : undefined;
    }
    if (type === 'dpExpiration') {
      if (e && e.year && e.month && e.day) {
        _datepickerExpiration = '' + e.year + '-'
          + ((('' + e.month).length > 1) ? e.month : ('0' + e.month)) + '-'
          + ((('' + e.day).length > 1) ? e.day : ('0' + e.day));
      }
      this.envoyeur.id_fin = (_datepickerExpiration.length > 0) ? _datepickerExpiration : undefined;
    }
    this.sendData();
  }

  public sendData() {
    this.userData.emit(this.envoyeur);
    console.dir(this.envoyeur);
  }
}
