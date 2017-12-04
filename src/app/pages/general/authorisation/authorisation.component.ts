import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginService} from '../../../services/api/login.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {AuthorisationClass} from '../../../models/authorisation-class';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';
import 'rxjs/add/operator/takeWhile';
import {AuthGuard} from "../../../guards/auth-guard.service";

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService]
})
export class GeneralAuthorisationComponent implements OnInit, OnDestroy {
  errorMessage = '';
  loading = false;
  alive = true;
  loggedin = false;
  authorisation = new AuthorisationClass('wari', 'wari', 'APP');
  // authorisation = new AuthorisationClass('7722222222', 'passer', 'APP'); // CITIZEN
  // authorisation = new AuthorisationClass('tresor', 'tresor', 'APP');        // CUSTOMER = CLIENT

  constructor(public loginService: LoginService,
              public userDataService: UserDataService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public commonServices: CommonServices,
              public authGuard: AuthGuard) { }

  ngOnInit() {
    this.loggedin = this.authGuard.canActivate();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public loginFunction() {
    this.loading = true;
    this.errorMessage = '';


    this.loginService.login(this.authorisation)
      .takeWhile(() => this.alive)
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

            this.loginService.usersRouting(response.profil);

            if (response.nom === 'wari') {
              localStorage.setItem('telephone', '776666666');
              this.userDataService.setUser(response.nom, response.prenom, response.profil, '776666666');
            } else {
              localStorage.setItem('telephone', response.telephone);
              this.userDataService.setUser(response.nom, response.prenom, response.profil, response.telephone);
              this.userDataService.setMyAccounts();
            }
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
