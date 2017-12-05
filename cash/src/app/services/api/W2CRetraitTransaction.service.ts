import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';
import {EnvoyeurClass} from '../../models/envoyeur-class';

@Injectable()
export class W2CRetraitTransactionService {

  constructor(public backendService: BackendService) {}


  public retrieveCash(code: string, principal: number,
                      commission: number, beneficiaire: EnvoyeurClass): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
              <run:W2CRetraitTransaction>
                  <sessionId>` + token + `</sessionId>
                  <code>` + code + `</code>
                  <principal>` + principal + `</principal>
                  <commission>` + commission + `</commission>
                  <beneficiaire>
                      <nom>` + beneficiaire.nom + `</nom>
                      <prenom>` + beneficiaire.prenom + `</prenom>
                      <adresse>` + (beneficiaire.addresse) + `</adresse>
                      <cellulaire>` + (beneficiaire.cellulaire) + `</cellulaire>
                  </beneficiaire>
                  <beneficiaireID>
                      <type>` + beneficiaire.id_type + `</type>
                      <pays>` + beneficiaire.id_pays + `</pays>
                      <valeur>` + beneficiaire.id_valeur + `</valeur>
                      <debut>` + beneficiaire.id_debut + `</debut>
                      <fin>` + beneficiaire.id_fin + `</fin>
                  </beneficiaireID>
              </run:W2CRetraitTransaction>
          </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }

// <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
//     <soap:Body>
//         <soap:Fault>
//             <faultcode>soap:Client</faultcode>
//             <faultstring>
//               Error reading XMLStreamReader: Unexpected EOF in prolog
//                           at [row,col {unknown-source}]: [1,0]
//             </faultstring>
//             </soap:Fault>
//     </soap:Body>
// </soap:Envelope>

}
