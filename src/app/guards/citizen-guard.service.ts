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
    localStorage.removeItem('token');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('profil');
    localStorage.removeItem('telephone');
    return false;
  }
}
