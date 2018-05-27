import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetCommercantsPaysService {
  token = localStorage.token;
  pays = 221;
  typeCompte = 'NORMAL';

  constructor(public backendService: BackendService) {}


  public getPaiementMarchand(): Observable<any> {

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:getCommercantsPays>
                 <sessionId>` + this.token + `</sessionId>
                 <pays>` + this.pays + `</pays>
                 <typeCompte>` + this.typeCompte + `</typeCompte>
              </run:getCommercantsPays>
           </soapenv:Body>
      </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
