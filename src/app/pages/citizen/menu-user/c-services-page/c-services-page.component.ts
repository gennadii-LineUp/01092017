import { Component } from '@angular/core';

@Component({
  selector: 'app-citizen-services-page',
  template: `<app-services-items-cust-citiz [userRole]="citizen"></app-services-items-cust-citiz>`,
  styles: [``]
})
export class CServicesPageComponent {
  citizen = 'citizen';
}
