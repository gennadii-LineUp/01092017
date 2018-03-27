import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BackendService} from '../backend.service';
import {UrlParams} from '../../models/URL_PARAMS';
import {UserDataService} from '../../models/user-data';

@Injectable()
export class SetCoordonneesByCellularService {
  token = localStorage.token;
  cellular = this.userDataService.getMyAccounts()['0'].telephone;

  constructor(public backendService: BackendService,
              public userDataService: UserDataService) {}


  public setCoordonneesByCellular(lattitude: number, longitude: number): Observable<any> {

    const body =
      `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:run="http://runtime.services.cash.innov.sn/">
         <soapenv:Header/>
           <soapenv:Body>
              <run:setCoordonneesByCellular>
                 <idSession>` + this.token + `</idSession>
                 <cellular>` + this.cellular + `</cellular>
                 <lattitude>` + lattitude + `</lattitude>
                 <longitude>` + longitude + `</longitude>
              </run:setCoordonneesByCellular>
           </soapenv:Body>
      </soapenv:Envelope>`;

    console.log(body);
    return this.backendService.post(UrlParams.backendUrl, body);
  }

}
