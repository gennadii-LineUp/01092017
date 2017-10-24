import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';
import {ReceiverClass} from '../../models/receiver-class';

@Injectable()
export class C2WDepotTransactionService {

  constructor(public backendService: BackendService) {}


  public makeDepotSitizen(beneficiary: string,
                          principal: number,
                          commission: number,
                          envoyeur: ReceiverClass): Observable<any> {
    const token = localStorage.token;
    const type_piece = 'CNI';
    const pays_piece = 'SEN';
    const valeur_piece = '1619198107350';
    const debut_piece = '01/01/2016';
    const fin_piece = '01/01/2017';

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
        <soapenv:Header/>
          <soapenv:Body>
              <run:C2WDepotTransaction>
                  <sessionId>` + token + `</sessionId>
                  <beneficiary>` + beneficiary + `</beneficiary>
                  <principal>` + principal + `</principal>
                  <commission>` + commission + `</commission>
                  <envoyeur>
                      <nom>` + envoyeur.nom + `</nom>
                      <prenom>` + envoyeur.prenom + `</prenom>
                      <adresse>` + envoyeur.address + `</adresse>
                      <cellulaire>` + envoyeur.telephone + `</cellulaire>
                  </envoyeur>
                  <envoyeurID>
                      <type>` + type_piece + `</type>
                      <pays>` + pays_piece + `</pays>
                      <valeur>` + valeur_piece + `</valeur>
                      <debut>` + debut_piece + `</debut>
                      <fin>` + fin_piece + `</fin>
                  </envoyeurID>
              </run:C2WDepotTransaction>
          </soapenv:Body>
    </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
