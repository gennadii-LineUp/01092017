import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  canActivate() {

    if (localStorage.getItem('token') ) {
      return true;
    }

    // not logged in so redirect to login page
    // this.router.navigate(['/login']);
    return false;

  }
}
