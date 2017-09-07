import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService]
})
export class GeneralAuthorisationComponent implements OnInit {

  constructor(public loginService: LoginService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public router: Router) { }

  ngOnInit() {
  }

  public loginFunction() {
    localStorage.clear();
    localStorage.setItem('token', 'token');
    console.log(localStorage);
    this.router.navigate(['/customer/services']);
  }

}
