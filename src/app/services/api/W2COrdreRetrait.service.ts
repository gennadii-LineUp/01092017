import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {ReceiverClass} from '../../models/receiver-class';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class W2COrdreRetraitService {

  constructor(public backendService: BackendService) {}


  public transferDargent(envoyeur: string, principal: number, beneficiaire: ReceiverClass): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
         <soapenv:Body>
          <run:W2COrdreRetrait>
             <sessionId>` + token + `</sessionId>
              <envoyeur>` + envoyeur + `</envoyeur>
              <principal>` + principal + `</principal>
              <beneficiaire>
                  <nom>` + beneficiaire.firstName + `</nom>
                  <prenom>` + beneficiaire.lastName + `</prenom>
                  <adresse>` + beneficiaire.address + `</adresse>
                  <cellulaire>` + beneficiaire.phone + `</cellulaire>
              </beneficiaire>
          </run:W2COrdreRetrait>
        </soapenv:Body>
        </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
