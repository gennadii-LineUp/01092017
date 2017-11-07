import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from '../../../services/api/login.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {AuthorisationClass} from '../../../models/authorisation-class';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';
import {GetAllCitizenService} from '../../../services/api/getAllCitizen.service';
import {GetAllCustomerService} from '../../../services/api/getAllCustomer.service';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService, GetAllCitizenService, GetAllCustomerService]
})
export class GeneralAuthorisationComponent implements OnInit {
  errorMessage = '';
  loading = false;
  // authorisation = new AuthorisationClass('773151459', 'wari', 'APP');
  // authorisation = new AuthorisationClass('7722222222', 'passer', 'APP'); // CITIZEN
  authorisation = new AuthorisationClass('tresor', 'tresor', 'APP');        // CUSTOMER = CLIENT

  constructor(public loginService: LoginService,
              public userDataService: UserDataService,
              public getAllCitizenService: GetAllCitizenService,
              public getAllCustomerService: GetAllCustomerService,
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

            if (response.profil === 'CITIZEN') {
            this.getAllCitizenService.getAllCitizens()
              .subscribe(result1 => {
                const response1 = (this.commonServices.xmlResponseParcer_complex(result1._body)).uos;
                if (response1.length) {
                  this.userDataService.setCitizens(response1);
                }
              }, (err) => {
                console.log(err);
              });
          }

            if (response.profil === 'CLIENT') {
              this.getAllCustomerService.getAllCustomer()
                .subscribe(result2 => {
                  const response2 = (this.commonServices.xmlResponseParcer_complex(result2._body)).uos;
                  if (response2.length) {
                    this.userDataService.setClients(response2);
                  }
                }, (err) => {
                  console.log(err);
                });
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
