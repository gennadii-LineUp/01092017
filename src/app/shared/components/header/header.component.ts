import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../../guards/auth-guards.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderGeneralComponent implements OnInit {
  logedIn = false;


  constructor(public authGuard: AuthGuard) {}

  ngOnInit() {
    console.log('header init');
    this.verifyUserRole();
  }

  public verifyUserRole() {
    this.logedIn = this.authGuard.canActivate();
  }

}
