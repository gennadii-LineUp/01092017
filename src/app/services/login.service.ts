import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BackendService} from './backend.service';
import {UrlParams} from '../models/URL_PARAMS';
import {AuthorisationClass} from '../models/authorisation-class';

@Injectable()
export class LoginService {

  constructor(public backendService: BackendService,
              public router: Router) {}

  login(userdata: AuthorisationClass): Observable<any> {
    this.logout();

    const body =
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
   <soapenv:Header/>
   <soapenv:Body>
      <run:login>
         <login>` + userdata.phone + `</login>
         <password>` + userdata.password + `</password>
         <mode>` + userdata.mode + `</mode>
      </run:login>
   </soapenv:Body>
   </soapenv:Envelope>`;

    return this.backendService.login('http://50.116.97.25:8080/cash-ws/CashWalletServiceWS?wsdl', body);
  }

  // resetPassword(newPassword: ResetPasswordClass): Observable<any> {
  //   return this.backendService.resetPassword(UrlParams.resetPassword, JSON.stringify(newPassword));
  // }
  // passwordRequest(userEmail: any): Observable<any> {
  //   return this.backendService.resetPassword(UrlParams.resetPassword + '_request', JSON.stringify(userEmail));
  // }


  // public afterSuccessLogin(result: any) {
  //   localStorage.setItem('role', result.roles);
  //   localStorage.setItem('token', result.token);
  //   localStorage.setItem('refresh_token', result.refresh_token);
  //   if (result.employeeAccess) {
  //     localStorage.setItem('employeeAccess', result.employeeAccess);
  //     localStorage.setItem('id_site', result.employeeSiteId);
  //   }
  //   if (localStorage.role === 'ROLE_ADMIN') {this.router.navigate(['/admin']); }
  //   if (localStorage.role === 'ROLE_CLIENT') {this.router.navigate(['/client']); }
  //   if (localStorage.role === 'ROLE_EMPLOYEE') {this.router.navigate(['/sfsalarie']); }
  // }
  //

  public logout(): void {
    localStorage.clear();
  }

}
