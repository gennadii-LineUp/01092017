import { Injectable } from '@angular/core';


@Injectable()
export class ErrorMessageHandlerService {
  message = '';

  constructor() {   }

  // public successHandler(successObject: any) {
  //     this.message = '';
  //
  //     for (let key in successObject) {
  //
  //     }
  //     return true;
  // }

  public checkErrorStatus(err: any): any {
    if (err.status === 401) {return 'veuillez reloguer!'; }  // 'please relogin!'
    if (err.status === 404) {return "Il n'y a pas de données. Créez-le d'abord."; }
    //   if (err.status === 500) {return 'problems with connection to server... verify your internet!'; }
    if (err.status === 0) {return 'problems with connection to server... verify your internet!'; }

    let error: any;
    try {
      error = (JSON.parse(err._body)).errors;
    } catch (e) {
      error = err;
    }

    let errorMessage: string;

    if (Object.keys(error).length > 0) {
      errorMessage = this.errorHandler(error);
    }
    return errorMessage;
  }

  public checkErrorStatus_old(err: any): any {
    if (err.status === 401) {return 'veuillez reloguer!'; }   // 'please relogin!'
    if (err.status === 403) {return 'wrong UrlParams'; }
    if (err.status === 404) {return "Il n'y a pas de données. Créez-le d'abord."; }
    if (err.status === 500) {return 'problems with connection to server... verify your internet!'; }
    if (err.status === 0) {return 'problems with connection to server... verify your internet!'; }
    return false;
  }

  public errorHandler(errorObject: any): string {
    this.message = '';
    for (let key in errorObject) {
      let status = '';
      let _key = '';

      _key = this.getKeyEquivalent(key);

      try {
        status = this.getMessageEquivalent(errorObject[key]);
        this.message += _key
          + ' - '
          + status[0].toLowerCase()
          + status.substring(1).slice(0, -1)
          + ';  ';
      } catch (e) {
        try {
          for (let i in errorObject[key]) {
            const _status = errorObject[key][i];
            this.message += _key
              + ' - "'
              + i
              + '": '
              + _status[0].toLowerCase()
              + _status.substring(1).slice(0, -1)
              + ';  ';
          }
        } catch (er) {
          this.message += _key + ' - ' + 'this value is not valid;  ';
        }
      }
    }
    return (this.message).slice(0, -2);

  }


  public getKeyEquivalent(key: string) {
    switch (key) {
      case 'company':                   key = '*Entreprise*';  break;
      // case '':         key = '';  break;
      // case '':         key = '';  break;
      // case '':         key = '';  break;
      // case '':         key = '';  break;
      default:
        key;
    }
    return key;
  }

  public getMessageEquivalent(message: string) {
    console.log('getMessageEquivalent');
    console.log(message);
    switch (message) {
      case 'UNDEFINED_USER_ERROR': message = 'Wrong username or password!';  break;
      default:
        message;

    }
    return message;
  }


}
