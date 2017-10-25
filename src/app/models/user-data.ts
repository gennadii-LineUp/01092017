import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReceiverClass} from './receiver-class';

@Injectable()
export class UserDataService {
  user = new ReceiverClass('', '', '', '', 0, '');


  myAccounts = [
    { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@gmail.com', account_id: 3 },
    { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@ukr.net', account_id: 7 },
    { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@yahoo.com', account_id: 8 }
  ];

  myTransactions = [
    { nom: 'Clark', prenom: 'Kent', amount: 123.49, direction: '-', currency: 'USD', date: '11.12.2017',
      tyme: '11:12', email: 'ClarkKent@gmail.com', account_id: 9 },
    { nom: 'Clark', prenom: 'Kent', amount: 123.49, direction: '-', currency: 'USD', date: '10.12.2017',
      tyme: '09:12', email: 'ClarkKent@gmail.com', account_id: 9 },
    { nom: 'Clark', prenom: 'Kent', amount:  54.18, direction: '+', currency: 'USD', date: '09.12.2017',
      tyme: '11:30', email: 'ClarkKent@gmail.com', account_id: 9 },
  ];

  beneficiaires = [
    { nom: 'KANE', prenom: 'MOMAR', telephone: '773151459', address: 'DAKAR', account_id: 9, profil: 'citizen' }
  ];

  // Observable string sources
  private caseNumber = new Subject<any>();
  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();


  public setMyAccounts() {
    this.myAccounts.forEach(myAccount => { myAccount.telephone = this.getUser().telephone; });
    console.log(this.myAccounts);
  }

  public getMyAccounts(): any {
    return this.myAccounts;
  }


  publishData(data: Object) {
    this.caseNumber.next(data);
  }

  public setUser(nom: string, prenom: string, profil: string, telephone: string) {
    // this.user['nom'] = nom;
    // this.user['prenom'] = prenom;
    // this.user['profil'] = profil;
    // this.user['telephone'] = telephone;
    this.user.nom = nom;
    this.user.prenom = prenom;
    this.user.profil = profil;
    this.user.telephone = telephone;
    console.log(this.user);
    this.publishData(this.user);
    this.setMyAccounts();
  }

  public getUser(): any {
    return this.user;
  }




}
