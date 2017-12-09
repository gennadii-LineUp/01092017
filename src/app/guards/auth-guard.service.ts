import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.length && localStorage.getItem('token') ) {
      return true;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('profil');
    localStorage.removeItem('telephone');
    return false;
  }
}
