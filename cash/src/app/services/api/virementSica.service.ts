import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class VirementSicaService {
  token = localStorage.token;

  constructor(public backendService: BackendService) {}


  public virementsVersBanque(idCitizen: number, beneficiaireId: number, montant: number): Observable<any> {
    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:virementSica>
                 <sessionId>` + this.token + `</sessionId>
                 <idCitizen>` + idCitizen + `</idCitizen>
                 <beneficiaireId>` + beneficiaireId + `</beneficiaireId>
                 <montant>` + montant + `</montant>
              </run:virementSica>
           </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
