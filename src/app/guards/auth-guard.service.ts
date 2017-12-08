import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.getItem('token') ) {
      return true;
    }
    localStorage.clear();
    return false;
  }
}
