import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {AuthorisationClass} from '../../../models/authorisation-class';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService]
})
export class GeneralAuthorisationComponent implements OnInit {
  authorisation = new AuthorisationClass('773151459', 'wari', 'APP');


  constructor(public loginService: LoginService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public router: Router) { }

  ngOnInit() {
  }

  public loginFunction() {
    localStorage.clear();
    localStorage.setItem('token', 'token');
    const newJson = JSON.stringify(this.authorisation);

    console.log(newJson);
    console.log(localStorage);
    this.router.navigate(['/customer/services']);


    // this.loginService.login()
    //   .subscribe(result => {
    //         console.log(result);
    //   }, (err) => {
    //     console.log(err);
    //   });
  }

}
