import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class CustomerGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.profil === 'CLIENT') {
      return true;
    }
    this.router.navigate(['/authorisation']);
    localStorage.clear();
    return false;
  }
}
