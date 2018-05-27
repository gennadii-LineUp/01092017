import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';
import {EnvoyeurClass} from '../../models/envoyeur-class';

@Injectable()
export class V2WDepotClientTransactionService {

  constructor(public backendService: BackendService) {}


  public makeDepotClient(beneficiary: string,
                          principal: number,
                          commission: number,
                          envoyeur: EnvoyeurClass): Observable<any> {
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
              <run:V2WDepotClientTransaction>
                  <sessionId>` + token + `</sessionId>
                  <beneficiary>` + beneficiary + `</beneficiary>
                  <principal>` + principal + `</principal>
                  <commission>` + commission + `</commission>
                  <envoyeur>
                      <nom>` + envoyeur.nom + `</nom>
                      <prenom>` + envoyeur.prenom + `</prenom>
                      <adresse>` + envoyeur.addresse + `</adresse>
                      <cellulaire>` + envoyeur.cellulaire + `</cellulaire>
                  </envoyeur>
                  <envoyeurID>
                      <type>` + envoyeur.id_type + `</type>
                      <pays>` + envoyeur.id_pays + `</pays>
                      <valeur>` + envoyeur.id_valeur + `</valeur>
                      <debut>` + envoyeur.id_debut + `</debut>
                      <fin>` + envoyeur.id_fin + `</fin>
                  </envoyeurID>
              </run:V2WDepotClientTransaction>
          </soapenv:Body>
    </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
