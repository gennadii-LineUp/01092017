import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetFacturiersPaysService {
  token = localStorage.token;
  pays = 221;
  typeCompte = 'NORMAL';

  constructor(public backendService: BackendService) {}


  public getPaiementFacture(): Observable<any> {

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:getFacturiersPays>
                 <sessionId>` + this.token + `</sessionId>
                 <pays>` + this.pays + `</pays>
                 <typeCompte>` + this.typeCompte + `</typeCompte>
              </run:getFacturiersPays>
           </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
