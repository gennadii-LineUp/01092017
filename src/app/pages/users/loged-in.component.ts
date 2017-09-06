import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../guards/auth-guards.service';

@Component({
  selector: 'app-loged-in',
  templateUrl: './loged-in.component.html',
  styleUrls: ['./loged-in.component.scss']
})
export class LogedInComponent implements OnInit {

  showProfileData = false;


  constructor(public authGuard: AuthGuard) {}

  ngOnInit() {
    this.verifyUserRole();
  }

  public verifyUserRole() {
    this.showProfileData = this.authGuard.canActivate();
  }

}
