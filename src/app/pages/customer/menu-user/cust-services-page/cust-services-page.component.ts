import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-services-page',
  template: `<app-services-items-cust-citiz [userRole]="customer"></app-services-items-cust-citiz>`,
  styles: [``]
})
export class CustServicesPageComponent {
  customer = 'customer';
}
