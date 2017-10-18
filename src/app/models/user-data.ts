import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserDataService {
  user = {};

  myAccounts = [
    { login: '773151459', firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@gmail.com', account_id: 3 },
    { login: '773151459', firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@ukr.net', account_id: 7 },
    { login: '773151459', firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@yahoo.com', account_id: 8 }
  ];

  myTransactions = [
    { firstName: 'Clark', lastName: 'Kent', amount: 123.49, direction: '-', currency: 'USD', date: '11.12.2017', tyme: '11:12', email: 'ClarkKent@gmail.com', account_id: 9 },
    { firstName: 'Clark', lastName: 'Kent', amount: 123.49, direction: '-', currency: 'USD', date: '10.12.2017', tyme: '09:12', email: 'ClarkKent@gmail.com', account_id: 9 },
    { firstName: 'Clark', lastName: 'Kent', amount:  54.18, direction: '+', currency: 'USD', date: '09.12.2017', tyme: '11:30', email: 'ClarkKent@gmail.com', account_id: 9 },
  ];

  beneficiaires = [
    { firstName: 'KANE', lastName: 'MOMAR', phone: '773151459', address: 'DAKAR', account_id: 9 }
  ];

  // Observable string sources
  private caseNumber = new Subject<any>();
  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();


  publishData(data: Object) {
    this.caseNumber.next(data);
  }

  public setUser(nom: string, prenom: string, profil: string, telephone: string) {
    this.user['nom'] = nom;
    this.user['prenom'] = prenom;
    this.user['profil'] = profil;
    this.user['telephone'] = telephone;
    console.log(this.user);
    this.publishData(this.user);
  }

  public getUser(): any {
    return this.user;
  }




}
