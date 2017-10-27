import { Component } from '@angular/core';

@Component({
  selector: 'app-agent',
  template: `
    <app-header-all-users [userRole]="agent"></app-header-all-users>
    <!--<app-navbar-for-delete></app-navbar-for-delete>-->
    <router-outlet></router-outlet>`,
  styles: [``]
})
export class AgentComponent {
  agent = 'agent';
}
