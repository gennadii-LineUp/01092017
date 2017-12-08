import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AutorizationGuardService implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.length && localStorage.getItem('token') ) {
      return false;
    }

    // this.router.navigate(['/authorisation']);
    // localStorage.clear();
    return true;
  }
}
