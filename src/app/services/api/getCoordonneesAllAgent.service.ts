import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetCoordonneesAllAgentService {
  token = localStorage.token;
  pays = 221;

  constructor(public backendService: BackendService) {}


  public getCoordonneesAllAgents(): Observable<any> {

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:getCoordonneesAllAgent>
                 <idSession>` + this.token + `</idSession>
                 <pays>` + this.pays + `</pays>
              </run:getCoordonneesAllAgent>
           </soapenv:Body>
      </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
