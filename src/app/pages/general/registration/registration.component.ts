import { Component, OnInit } from '@angular/core';
import {RegistrationClass} from '../../../models/registration-class';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class GeneralRegistrationComponent implements OnInit {
  registration = new RegistrationClass('', '', '', '', '', 'Citizen', false);


  constructor() { }

  ngOnInit() {
  }

  public registrationSubmitFunction() {
    console.log(this.registration);
  }

  public regFirstNameClear() {this.registration.firstName = ''; }
  public regLastNameClear() {this.registration.lastName = ''; }
  public regPhoneClear() {this.registration.phone = ''; }
  public regMailClear() {this.registration.email = ''; }
  public regPswClear() {this.registration.password = ''; }


}
