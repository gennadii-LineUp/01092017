import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {AuthorisationClass} from '../../models/authorisation-class';
import {UrlParams} from '../../models/URL_PARAMS';
import {Router} from '@angular/router';

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

    return this.backendService.login(UrlParams.backendUrl, body);
  }


  public usersRouting(profil: string) {
      switch (profil) {
        case 'CITIZEN': this.router.navigate(['/customer/services']); break;
        case 'AGENT': this.router.navigate(['/agent/services']); break;
        case 'CUSTOMER': this.router.navigate(['/customer/services']); break;
        default:
          this.router.navigate(['/authorisation']);
      }
  }

  public logout(): void {
    localStorage.clear();
  }

}
