import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../../guards/auth-guards.service';

@Component({
  selector: 'app-header-loged-in',
  templateUrl: './header-loged-in.component.html',
  styleUrls: ['../header.component.scss']
})
export class HeaderLogedInComponent implements OnInit {
  logedIn = false;


  constructor(public authGuard: AuthGuard) {}

  ngOnInit() {
    console.log('header-general init');
    this.verifyUserRole();
  }

  public verifyUserRole() {
    this.logedIn = this.authGuard.canActivate();
  }

}
