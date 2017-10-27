import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `
    <app-header-all-users [userRole]="customer"></app-header-all-users>
    <!--<app-navbar-for-delete></app-navbar-for-delete>-->
    <router-outlet></router-outlet>`,
  styles: [``]
})
export class CustomerComponent {
  customer = 'customer';
}
