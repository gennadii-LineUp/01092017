import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetOperationService {

  constructor(public backendService: BackendService) {}


  public getOperations(accountId: number): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
            <run:getOperationCompte>
                <sessionId>` + token + `</sessionId>
                <accountId>` + accountId + `</accountId>
            </run:getOperationCompte>
          </soapenv:Body>
    </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
