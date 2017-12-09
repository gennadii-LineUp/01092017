import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `
    <app-header-all-users [userRole]="client"></app-header-all-users>
    <app-navbar-for-delete></app-navbar-for-delete>
    <router-outlet></router-outlet>`,
  styles: [``]
})
export class CustomerComponent {
  client = 'client';
}
