import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/api/login.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {AuthorisationClass} from '../../../models/authorisation-class';
import {CommonServices} from '../../../services/common.service';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService]
})
export class GeneralAuthorisationComponent implements OnInit {
  errorMessage = '';
  authorisation = new AuthorisationClass('773151459', 'wari', 'APP');


  constructor(public loginService: LoginService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public router: Router,
              public commonServices: CommonServices) { }

  ngOnInit() {
  }

  public loginFunction() {
    this.errorMessage = '';

    localStorage.clear();
    localStorage.setItem('token', 'token');
    const newJson = JSON.stringify(this.authorisation);

    // console.log(newJson);
    // console.log(localStorage);
    // this.router.navigate(['/customer/services']);


    this.loginService.login(this.authorisation)
      .subscribe(result => {
          const response = this.commonServices.xmlResponseParcer_simple( result._body );

          console.dir( response );
          if (+response.error === 0) {
            this.router.navigate(['/customer/services']);
            localStorage.setItem('token', response.token);
          } else {
            this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          }

      }, (err) => {
        console.log(err);
      });
  }

}
