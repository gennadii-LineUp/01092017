import { Injectable } from '@angular/core';

@Injectable()
export class UserDataGlossary {

  myAccounts = [
    { login: '773151459', firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@gmail.com', account_id: 1 },
    { login: '773151459', firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@yahoo.com', account_id: 2 }
  ];

  myTransactions = [
    { firstName: 'Clark', lastName: 'Kent', amount: 123.49, direction: '-', currency: 'USD', date: '11.12.2017', tyme: '11:12', email: 'ClarkKent@gmail.com', account_id: 10 },
    { firstName: 'Clark', lastName: 'Kent', amount: 123.49, direction: '-', currency: 'USD', date: '10.12.2017', tyme: '09:12', email: 'ClarkKent@gmail.com', account_id: 10 },
    { firstName: 'Clark', lastName: 'Kent', amount:  54.18, direction: '+', currency: 'USD', date: '09.12.2017', tyme: '11:30', email: 'ClarkKent@gmail.com', account_id: 10 },
  ];

  beneficiaires = [
    { firstName: 'KANE', lastName: 'MOMAR', phone: '773151459', address: 'DAKAR' }
  ];


}
