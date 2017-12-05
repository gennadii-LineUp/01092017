import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {ReceiverClass} from '../../models/receiver-class';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class W2XWalletService {

  constructor(public backendService: BackendService) {}


  public virementsMultiplesW2XW(idAccountEnvoyeur: number,
                                beneficiary: any): Observable<any> {
    const token = localStorage.token;
    let listComptes = '';
    for (let i = 0; i < beneficiary.length; i++) {
      const list = `<listComptes>
                      <idBeneficiaire>` + beneficiary[i].__id + `</idBeneficiaire>
                      <montant>` + beneficiary[i].montant + `</montant>
                 </listComptes>
                 `;
      listComptes += list;
    }

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:w2XWallet>
                 <idSession>` + token + `</idSession>
                 <idEnvoyeur>` + idAccountEnvoyeur + `</idEnvoyeur>
                 ` + listComptes + `
              </run:w2XWallet>
           </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
