import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';
import {RegistrationClass} from '../../models/registration-class';

@Injectable()
export class CreateNewAccountService {

  constructor(public backendService: BackendService) {}


  public createNewAccount(newUser: RegistrationClass): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
            <run:createNewAccount>
                <indicatif>` + newUser.countryCode + `</indicatif>
                <prenom>` + newUser.prenom + `</prenom>
                <nom>` + newUser.nom + `</nom>
                <tel>` + newUser.telephone + `</tel>
                <email>` + newUser.mail + `</email>
                <password>` + newUser.password + `</password>
                <confirm>` + newUser.repeatPassword + `</confirm>
            </run:createNewAccount>
          </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
