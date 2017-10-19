import { Component, OnInit } from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {RegistrationClass} from '../../../../models/registration-class';
import {LoginService} from '../../../../services/api/login.service';


export class NewPasswordClass {
  old: string;
  new_pass: string;
  repeat_pass: string;

  constructor(old: string,
              new_pass: string,
              repeat_pass: string) {
    this.old = old;
    this.new_pass = new_pass;
    this.repeat_pass = repeat_pass;
  };
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [LoginService]
})
export class ProfileComponent implements OnInit {
  _user: any;
  user: any;
  loading_nom = false;
  loading_prenom = false;
  loading_mail = false;
  loading_phone = false;
  loading_password = false;
  loading_currency = true;
  readOnly_nom = true;
  readOnly_prenom = true;
  readOnly_mail = true;
  readOnly_phone = true;

  newPassword = new NewPasswordClass('', undefined, '');
  nom = localStorage.nom;
  prenom = localStorage.prenom;
  profil = localStorage.profil;


  constructor(public commonServices: CommonServices,
              public userDataService: UserDataService,
              public loginService: LoginService) { }

  ngOnInit() {
    this._user = this.userDataService.getUser();
    this.user = new RegistrationClass(this._user.nom, this._user.prenom, 33, this._user.telephone, '', '', '', this._user.profil, true);
    console.log(this.user);
  }

  public submitNomFunction() {
    this.loading_nom = true;
    setTimeout(() => { this.loading_nom = false; }, 1000);
    console.log(this.user.nom);
  }

  public submitPrenomFunction() {
    this.loading_prenom = true;
    setTimeout(() => { this.loading_prenom = false; }, 1000);
    console.log(this.user.prenom);
  }

  public submitMailFunction() {
    this.loading_mail = true;
    setTimeout(() => { this.loading_mail = false; }, 1000);
    console.log(this.user.mail);
  }

  public submitPhoneFunction() {
    this.loading_phone = true;
    setTimeout(() => { this.loading_phone = false; }, 1000);
    console.log(this.user.telephone);
  }

  public submitNewPassowordFunction() {
    this.loading_password = true;
    setTimeout(() => {
      this.loading_password = false;
      this.newPassword = new NewPasswordClass('', undefined, '');
      this.commonServices.accordionCloseAllItemsFunction();
    }, 1000);
    console.log(this.newPassword);
  }


}
