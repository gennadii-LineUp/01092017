import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {AuthorisationClass} from '../../models/authorisation-class';
import {UrlParams} from '../../models/URL_PARAMS';
import {Router} from '@angular/router';
import {CommonServices} from '../common.service';
import {UserDataService} from '../../models/user-data';

@Injectable()
export class LoginService {

  constructor(public backendService: BackendService,
              public userDataService: UserDataService,
              public commonServices: CommonServices,
              public router: Router) {}

  login(userdata: AuthorisationClass): Observable<any> {
    localStorage.clear();

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

    return this.backendService.login(UrlParams.backendUrl, body);
  }


  public usersRouting(profil: string) {
      switch (profil) {

        case 'CITIZEN': this.router.navigate(['/citizen/services']);
          break;

        case 'AGENT': this.router.navigate(['/agent/services']);
          break;

        case 'CLIENT': this.router.navigate(['/customer/services']);
          break;

        default:
          this.router.navigate(['/authorisation']);
      }
  }

  public logout(): void {
    this.router.navigate(['/authorisation']);
    localStorage.clear();
  }

}
