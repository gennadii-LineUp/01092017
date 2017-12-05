import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.getItem('token') ) {
      return true;
    }

    this.router.navigate(['/authorisation']);
    localStorage.clear();
    return false;
  }
}
