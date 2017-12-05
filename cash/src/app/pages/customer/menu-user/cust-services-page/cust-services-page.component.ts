import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-services-page',
  template: `
    <app-services-items-cust [userRole]="customer"></app-services-items-cust>`,
  styles: [``]
})
export class CustServicesPageComponent {
  customer = 'customer';
}
