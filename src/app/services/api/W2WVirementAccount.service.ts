import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {ReceiverClass} from '../../models/receiver-class';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class W2WVirementAccountService {

  constructor(public backendService: BackendService) {}


  public transferCompteStandart(montant: number,
                                commission: string,
                                idAccountEnvoyeur: number,
                                idAccountBeneficiary: number): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
            <run:W2WVirementAccount>
              <sessionId>` + token + `</sessionId>
              <montant>` + montant + `</montant>
              <commission>` + commission + `</commission>
              <idAccountEnvoyeur>` + idAccountEnvoyeur + `</idAccountEnvoyeur>
              <idAccountBeneficiary>` + idAccountBeneficiary + `</idAccountBeneficiary>
            </run:W2WVirementAccount>
          </soapenv:Body>
      </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
