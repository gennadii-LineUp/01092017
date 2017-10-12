import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class W2ISoldeService {
  token = localStorage.token;

  constructor(public backendService: BackendService) {}


  public getSolde(accountId: number): Observable<any> {
    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
            <run:consultationSolde>
              <sessionId>` + this.token + `</sessionId>
              <accountId>` + accountId + `</accountId>
            </run:consultationSolde>
          </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


  public getHistorySolde(accountId: number): Observable<any> {
    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:getOperationCompte>
                <sessionId>` + this.token + `</sessionId>
                <accountId>` + accountId + `</accountId>
              </run:getOperationCompte>
            </soapenv:Body>
        </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
