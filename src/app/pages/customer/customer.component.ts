import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `<app-header-users [userRole]="customer"></app-header-users>
              <app-navbar-for-delete></app-navbar-for-delete>
              <router-outlet></router-outlet>`,
  styles: [``]
})
export class CustomerComponent {
  customer = 'customer';
}
