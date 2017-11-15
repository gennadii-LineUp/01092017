import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReceiverClass} from './receiver-class';
import {Router} from '@angular/router';
import {GetAllListAccountService} from '../services/api/getAllListAccount.service';
import {CommonServices} from '../services/common.service';
import {GetAllCustomerService} from '../services/api/getAllCustomer.service';
import {GetAllCitizenService} from '../services/api/getAllCitizen.service';
import {GetAllContractsService} from '../services/api/getAllContracts.service';
import * as moment from 'moment';

@Injectable()
export class UserDataService {
  user = new ReceiverClass('', '', '', '', 0, '', '', '');
  sender_default = [new ReceiverClass('skype', 'gena_ukr79', '', '', 0, '', '', '')];
  citizens = [];
  clients = [];
  citizensClients = [];
  receivers = [];
  allContracts = [];

  myAccounts = [
    // { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@gmail.com', id_account: 3 },
    // { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@ukr.net', id_account: 7 },
    // { telephone: '4', nom: 'Lex', prenom: 'Luthor', email: 'lexluthor@yahoo.com', id_account: 8 }
  ];


  beneficiaires = [
    { nom: undefined, prenom: undefined, telephone: '773151459',
      address: undefined, id_account: undefined, profil: undefined, email: '@', numTel: ''}
  ];

  // Observable string sources
  private caseNumber = new Subject<any>();
  // Observable string streams
  // caseNumber$ = this.caseNumber.asObservable();


  constructor(public router: Router,
              public getAllListAccountService: GetAllListAccountService,
              public commonServices: CommonServices,
              public getAllCustomerService: GetAllCustomerService,
              public getAllCitizenService: GetAllCitizenService,
              public getAllContractsService: GetAllContractsService) {}

  public setMyAccounts() {
    // this.myAccounts.forEach(myAccount => {
    //   myAccount.telephone = (this.getUser().telephone) ?  this.getUser().telephone : localStorage.telephone;
    // });
    if (localStorage.telephone && localStorage.token) {
        this.getAllListAccountService.getMyAccounts(localStorage.telephone)
          .subscribe(result1 => {
            const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
            console.log(response1);
            const accounts = response1.accounts;
            if (accounts && accounts.length) {
              if (accounts['0'].status === 'ACTIF') {
                // this.setUserId(accounts['0'].id);
                this.myAccounts = [];
                for (let i = 0; i < accounts.length; i++) {
                  this.myAccounts.push(new ReceiverClass(localStorage.nom || 'add a nom',
                                                        localStorage.prenom || 'add a prenom',
                                                        localStorage.telephone || 'add a phone',
                                                        'please add an address',
                                                        +accounts[i].id,
                                                        localStorage.profil || 'add a profil',
                                                        'please add @', ''));
                }
              }
            }
            console.log('=== from LS MyAccounts:');
            console.log(this.getMyAccounts());
            if (!this.user.nom || !this.user.prenom || !this.user.telephone || !this.user.id_account) {
              this.setUser(localStorage.nom || 'add a nom',
                          localStorage.prenom || 'add a prenom',
                          localStorage.profil || 'add a profil',
                          localStorage.telephone || 'add a phone');
              this.setUserId(this.myAccounts['0'].id_account);
              console.log('=== from LS User:');
              console.log(this.getUser());
            }
          }, (err) => {
            console.log(err);
          });
    } else {
      this.logOut();
    }
  }

  public getMyAccounts(): any {
    return this.myAccounts;
  }

  public setAllContracts() {
    this.allContracts = [];
    this.getAllContractsService.getAllContracts()
      .subscribe(result => {
        const response = (this.commonServices.xmlResponseParcer_complex(result._body)).contract;
        console.log(response);
        this.allContracts = response;
      }, (err) => {console.log(err); });
  }

  public getAllContracts(): any {
    return this.allContracts;
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

  public setCitizens() {
    this.citizens = [];
    this.getAllCitizenService.getAllCitizens()
        .subscribe(result => {
          const response = (this.commonServices.xmlResponseParcer_complex(result._body)).uos;
          this.citizens = (response.length) ? response : [];
          this.receivers = this.citizens;
          console.log(this.citizens);
        }, (err) => {console.log(err); });
  }
  public getCitizens(): any {
    return this.citizens;
  }

  public setClients() {
    this.clients = [];
    this.getAllCustomerService.getAllCustomer()
      .subscribe(result => {
        const response = (this.commonServices.xmlResponseParcer_complex(result._body)).uos;
        this.clients = (response.length) ? response : [];
        this.receivers = this.clients;
        console.log(this.clients);
      }, (err) => {console.log(err); });
  }
  public getClients(): any {
    return this.clients;
  }


  public setReceivers(profil) {
    switch (profil) {
      case 'CITIZEN': {
        if (!this.citizens.length) {
          this.setCitizens();
          console.log('=== CITIZENs created ===');
        } break;
      }
      case 'CLIENT': {
        if (!this.clients.length) {
          this.setClients();
          console.log('=== CUSTOMERs created ===');
        } break;
      }
      case 'AGENT': {
        if (!this.citizensClients.length) {
          if (!this.clients.length) {
            this.setClients();
            console.log('=== CUSTOMERs created ===');
          }
          if (!this.citizens.length) {
            this.setCitizens();
            console.log('=== CITIZENs created ===');
          }
          this.citizensClients = (this.clients).concat(this.citizens);
          this.receivers = this.citizensClients;
          console.log('=== CITIZENs+CUSTOMERs created ===');
          console.log(this.citizensClients);
        }
        break;
      }

      default:  console.log('=== there is a new type of user ! ===');
    }
  }

  public getReceivers(): any {
    return this.receivers;
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
    this.user = new ReceiverClass('', '', '', '', 0, '', '', '');
  }
}
