import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BackendService} from './backend.service';
import {UrlParams} from '../models/URL_PARAMS';

@Injectable()
export class LoginService {

  constructor(public backendService: BackendService,
              public router: Router) {}

  login(): Observable<any> {
    // this.logout();

    const usernamePassword =
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
   <soapenv:Header/>
   <soapenv:Body>
      <run:login>
         <login>773151459</login>
         <password>wari</password>
         <mode>APP</mode>
      </run:login>
   </soapenv:Body>
   </soapenv:Envelope>`;


    return this.backendService.login('http://50.116.97.25:8080/cash-ws/CashWalletServiceWS?wsdl', usernamePassword);
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
  //
  // logout(): void {
  //   localStorage.clear();
  // }

}
