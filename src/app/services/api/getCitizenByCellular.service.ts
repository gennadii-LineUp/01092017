import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetCitizenByCellularService {

  constructor(public backendService: BackendService) {}


  public getCitizenByCellular (cellular: string): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
         <soapenv:Body>
            <run:getCitizenByCellular>
               <idSession>` + token + `</idSession>
               <cellular>` + cellular + `</cellular>
            </run:getCitizenByCellular>
         </soapenv:Body>
      </soapenv:Envelope>`;

     return this.backendService.post(UrlParams.backendUrl, body);
  }

}
