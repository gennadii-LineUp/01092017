import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetMyBeneficiariesService {
  token = localStorage.token;

  constructor(public backendService: BackendService) {}


  public getMyBeneficiaries(idAccountEnvoyeur: number): Observable<any> {
    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
             <soapenv:Body>
                <run:getMyBeneficiaries>
                   <idSession>` + this.token + `</idSession>
                   <idCitizen>` + idAccountEnvoyeur + `</idCitizen>
                </run:getMyBeneficiaries>
             </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }

}