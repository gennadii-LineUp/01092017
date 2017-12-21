import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';

@Injectable()
export class SetCoordonneesByCellularService {
  token = localStorage.token;

  constructor(public backendService: BackendService) {}


  public setCoordonneesByCellular(cellular: string, lattitude: string, longitude: string): Observable<any> {

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:setCoordonneesByCellular>
                 <idSession>` + this.token + `</idSession>
                 <cellular>` + cellular + `</cellular>
                 <lattitude>` + lattitude + `</lattitude>
                 <longitude>` + longitude + `</longitude>
              </run:setCoordonneesByCellular>
           </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
