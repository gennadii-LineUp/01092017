import { Injectable } from '@angular/core';

@Injectable()
export class UserDataGlossary {

  myAccounts = [
    { firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@gmail.com', account_id: 1 },
    { firstName: 'Lex', lastName: 'Luthor', email: 'lexluthor@yahoo.com', account_id: 2 }
  ];


}
