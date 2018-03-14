import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetLuNotifService {

  constructor(public backendService: BackendService) {}


  public getLuNotif(uoId: string): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
         <soapenv:Body>
            <run:getLuNotif>
               <idSession>` + token + `</idSession>
               <uoId>` + uoId + `</uoId>
            </run:getLuNotif>
         </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
