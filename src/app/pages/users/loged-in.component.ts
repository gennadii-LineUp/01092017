import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthGuard} from '../../guards/auth-guards.service';

@Component({
  selector: 'app-loged-in',
  template: `<app-header-loged-in></app-header-loged-in>
              <router-outlet></router-outlet>`,
  styles: [``]
})
export class LogedInComponent implements OnInit, OnDestroy {

  showProfileData = false;


  constructor(public authGuard: AuthGuard) {}

  ngOnInit() {
    this.verifyUserRole();
  }
  ngOnDestroy() {
    localStorage.clear();
    console.log('LS cleared');
  }

  public verifyUserRole() {
    this.showProfileData = this.authGuard.canActivate();
  }

}
