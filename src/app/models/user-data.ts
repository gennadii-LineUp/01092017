import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReceiverClass} from './receiver-class';
import {Router} from '@angular/router';

@Injectable()
export class UserDataService {
  user = new ReceiverClass('', '', '', '', 0, '', '');
  sender_default = [new ReceiverClass('skype', 'gena_ukr79', '', '', 0, '', '')];
  citizens = [];
  client = [];

  myAccounts = [
    { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@gmail.com', id_account: 3 },
    { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@ukr.net', id_account: 7 },
    { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@yahoo.com', id_account: 8 }
  ];


  beneficiaires = [
    { nom: 'KANE', prenom: 'MOMAR', telephone: '773151459', address: 'DAKAR', id_account: 21, profil: 'citizen' }
  ];

  // Observable string sources
  private caseNumber = new Subject<any>();
  // Observable string streams
  caseNumber$ = this.caseNumber.asObservable();


  constructor(public router: Router) {}

  public setMyAccounts() {
    this.myAccounts.forEach(myAccount => {
      myAccount.telephone = (this.getUser().telephone) ?  this.getUser().telephone : localStorage.telephone;
    });
  }

  public getMyAccounts(): any {
    return this.myAccounts;
  }


  public publishData(data: Object) {
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
    // console.log(this.user);
    this.publishData(this.user);
    // this.setMyAccounts();
  }
  public setUserId(id_account: string) {
    this.user.id_account = +id_account;
    console.log(this.user);
  }

  public getUser(): ReceiverClass {
    return this.user;
  }

  public setCitizens(citizens: any) {
    this.citizens = [];
    this.citizens = citizens;
    console.log(this.citizens)
  }

  public setClients(client: any) {
    this.client = [];
    this.client = client;
    console.log(this.client)
  }

  public getSender_default(): any {
    return this.sender_default;
  }


  public checkUserRole(): boolean {
    const active_profil = this.user.profil;
    if (active_profil) {   // after login succes
      if (localStorage.profil) {
        if (active_profil !== localStorage.profil) {this.logOut(); }
      }
      if (active_profil === 'AGENT') {return true; }
      return false;
    } else { // after page refreshed
      if (localStorage.profil && (localStorage.profil === 'AGENT')) {return true; }
      return false;
    }
  }


  public logOut() {
    this.router.navigate(['/authorisation']);
    localStorage.clear();
    this.user = new ReceiverClass('', '', '', '', 0, '', '');
  }
}
