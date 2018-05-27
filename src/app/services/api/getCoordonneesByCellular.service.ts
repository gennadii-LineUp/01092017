import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class GetCoordonneesByCellularService {
  token = localStorage.token;

  constructor(public backendService: BackendService) {}


  public getMyCoordonneesByCellular(cellular: string): Observable<any> {

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:getCoordonneesByCellular>
                 <idSession>` + this.token + `</idSession>
                 <cellular>` + cellular + `</cellular>
              </run:getCoordonneesByCellular>
           </soapenv:Body>
      </soapenv:Envelope>`;

    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
