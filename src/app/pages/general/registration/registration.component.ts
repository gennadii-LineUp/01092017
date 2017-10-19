import { Component, OnInit } from '@angular/core';
import {RegistrationClass} from '../../../models/registration-class';
import {CreateNewAccountService} from '../../../services/api/createNewAccount.service';
import {UserDataService} from '../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {CommonServices} from '../../../services/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [CreateNewAccountService]
})
export class GeneralRegistrationComponent implements OnInit {
  errorMessage = '4564654 6546546 6545 64654 64 646 4654 654  54545454 54 544 54 544 48 77 54 5454 545454 44545';
  loading = false;

  registration = new RegistrationClass('', '', '', '', '', 'Citizen', false);


  constructor(public createNewAccountService: CreateNewAccountService,
              public userDataService: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public commonServices: CommonServices) { }

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
        // if (+response.error === 0
        //   && response.message === 'Authentification success'
        //   && response.profil) {
        //
        // } else {
        //   this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        // }
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


}
