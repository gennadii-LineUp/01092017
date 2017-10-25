import { Component } from '@angular/core';

@Component({
  selector: 'app-citizen',
  template: `
    <app-header-all-users [userRole]="citizen"></app-header-all-users>
    <!--<app-navbar-for-delete></app-navbar-for-delete>-->
    <router-outlet></router-outlet>`,
  // styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent {
  citizen = 'citizen';
}
