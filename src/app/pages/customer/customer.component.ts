import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `<app-header-customer></app-header-customer>
              <app-navbar-for-delete></app-navbar-for-delete>
              <router-outlet></router-outlet>`,
  styles: [``]
})
export class CustomerComponent { }
