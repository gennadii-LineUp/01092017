import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {AuthorisationClass} from '../../models/authorisation-class';

@Injectable()
export class LoginService {

  constructor(public backendService: BackendService) {}

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


  public logout(): void {
    localStorage.clear();
  }

}