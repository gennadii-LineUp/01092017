import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class NewBeneficiaryService {

  constructor(public backendService: BackendService) {}


  public createNewBeneficiary(codeBanque: string, codeCitizen: string, nom: string,
                    guichet: string, compte: string, cleRIB: string): Observable<any> {
    const token = localStorage.token;

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
         <soapenv:Body>
            <run:newBeneficiary>
               <idSession>` + token + `</idSession>
               <codeBanque>` + codeBanque + `</codeBanque>
               <codeCitizen>` + codeCitizen + `</codeCitizen>
               <nom>` + nom + `</nom>
               <guichet>` + guichet + `</guichet>
               <compte>` + compte + `</compte>
               <cleRIB>` + cleRIB + `</cleRIB>
            </run:newBeneficiary>
         </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }


}
