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
    localStorage.removeItem('token');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('profil');
    localStorage.removeItem('telephone');

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

        case 'citizen': this.router.navigate(['/citizen/services']);
          break;

        case 'agent': this.router.navigate(['/agent/services']);
          break;

        case 'client': this.router.navigate(['/client/services']);
          break;

        default:
          this.router.navigate(['/authorisation']);
      }
  }

  public logout(): void {
    this.userDataService.clearAll();
    localStorage.removeItem('token');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('profil');
    localStorage.removeItem('telephone');
    this.router.navigate(['/authorisation']);
  }

}
