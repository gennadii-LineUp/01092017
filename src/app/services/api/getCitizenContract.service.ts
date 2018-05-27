import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetCitizenContractService {

  constructor(public backendService: BackendService) {}


  public getCitizensContract(idContract: number): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
         <soapenv:Body>
            <run:getCitizenContract>
               <idSession>` + token + `</idSession>
               <idContract>` + idContract + `</idContract>
            </run:getCitizenContract>
         </soapenv:Body>
      </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
