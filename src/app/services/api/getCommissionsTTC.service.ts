import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetCommissionsTTCService {

  constructor(public backendService: BackendService) {}


  public getCommission(montant: number, commission_service: string): Observable<any> {
    const token = localStorage.token;
    const commission_type = 'NORMAL';


    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
              <run:getCommissionsTTC>
                  <sessionId>` + token + `</sessionId>
                  <montant>` + montant + `</montant>
                  <service>` + commission_service + `</service>
                  <type>` + commission_type + `</type>
              </run:getCommissionsTTC>
          </soapenv:Body>
    </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
