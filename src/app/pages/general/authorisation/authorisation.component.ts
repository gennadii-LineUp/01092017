import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../../../services/api/login.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {AuthorisationClass} from '../../../models/authorisation-class';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService]
})
export class GeneralAuthorisationComponent implements OnInit {
  errorMessage = '';
  loading = false;
  // authorisation = new AuthorisationClass('773151459', 'wari', 'APP');
  authorisation = new AuthorisationClass('773336110', '1', 'APP');

  constructor(public loginService: LoginService,
              public userDataService: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public commonServices: CommonServices) { }

  ngOnInit() {
  }

  public loginFunction() {
    this.loading = true;
    this.errorMessage = '';

    // localStorage.clear();
    // localStorage.setItem('token', 'token');
    // const newJson = JSON.stringify(this.authorisation);

    // console.log(newJson);
    // console.log(localStorage);
    // this.router.navigate(['/customer/services']);


    this.loginService.login(this.authorisation)
      .subscribe(result => {
          this.loading = false;
          const response = this.commonServices.xmlResponseParcer_simple( result._body );

          console.dir( response );
          if (+response.error === 0
              && response.message === 'Authentification success'
              && response.profil) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('nom', response.nom);
            localStorage.setItem('prenom', response.prenom);
            localStorage.setItem('profil', response.profil);
            localStorage.setItem('telephone', response.telephone);
            this.loginService.usersRouting(response.profil);
            this.userDataService.setUser(response.nom, response.prenom, response.profil, response.telephone);
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

}
