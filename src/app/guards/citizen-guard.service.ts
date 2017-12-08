import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class CitizenGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.profil === 'citizen') {
      return true;
    }
    // this.router.navigate(['/authorisation']);
    localStorage.clear();
    return false;
  }
}
