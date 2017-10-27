import { Component, OnInit } from '@angular/core';
import {RegistrationClass} from '../../../models/registration-class';
import {CreateNewAccountService} from '../../../services/api/createNewAccount.service';
import {UserDataService} from '../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {CommonServices} from '../../../services/common.service';
import {CountryCode} from '../../../models/country-code';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [CreateNewAccountService, CountryCode]
})
export class GeneralRegistrationComponent implements OnInit {
  successMessage = '';
  errorMessage = '';
  loading = false;
  disabled = false;

  registration = new RegistrationClass('Michael', 'Jackson', 221, '123456789', 'test@mail.fr', '123456789', '123456789', 'Citizen', true);


  constructor(public createNewAccountService: CreateNewAccountService,
              public userDataService: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public commonServices: CommonServices,
              public countryCode: CountryCode,
              public router: Router) { }

  ngOnInit() {
  }

  public registrationSubmitFunction() {
    console.log(this.registration);
    this.loading = true;
    this.errorMessage = '';


    this.createNewAccountService.createNewAccount(this.registration)
      .subscribe(result => {
        this.loading = false;
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0
          && response.message === 'Succès ! creation compte effectuée') {
          this.successMessage = response.message;
          setTimeout(() => { this.router.navigate(['/authorisation']); }, 4000);
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        if (!this.errorMessage) {
          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
        }
      });


  }

  public regFirstNameClear() {this.registration.nom = ''; }
  public regLastNameClear() {this.registration.prenom = ''; }
  public regPhoneClear() {this.registration.telephone = ''; }
  public regMailClear() {this.registration.mail = ''; }
  public regPswClear() {this.registration.password = ''; }
  public regPswRepeatClear() {this.registration.repeatPassword = ''; }


}
