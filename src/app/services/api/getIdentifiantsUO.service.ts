import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetIdentifiantsUOService {

  constructor(public backendService: BackendService) {}


  public getIdentifiantsUOService (id: string): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
         <soapenv:Body>
            <run:getIdentifiantsUO>
               <idSession>` + token + `</idSession>
               <idUO>` + id + `</idUO>
            </run:getIdentifiantsUO>
         </soapenv:Body>
      </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
