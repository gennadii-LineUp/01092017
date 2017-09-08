import { Component } from '@angular/core';

@Component({
  selector: 'app-citizen',
  template: `<app-header-users [userRole]="citizen"></app-header-users>
              <app-navbar-for-delete></app-navbar-for-delete>
              <router-outlet></router-outlet>`,
  // styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent {
  citizen = 'citizen';
}
