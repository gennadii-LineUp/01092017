import { Injectable } from '@angular/core';
import {Response, Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  public token: string;

  constructor(public http: Http) {}

  public login(url, body): Observable<any>  {
    // const headers: Headers = new Headers();
    // headers.append('Content-Type', 'text/xml');
    // headers.append('Access-Control-Allow-Origin', 'http://50.116.97.25:8080');

    return this.http.post(url,  body) // , {headers: headers})
       // .map((res: Response) => {
       //    return res;
       // });
  }



}
