import { Component } from '@angular/core';

@Component({
  selector: 'app-agent',
  template: `<app-header-agent></app-header-agent>
              <app-navbar-for-delete></app-navbar-for-delete>
              <router-outlet></router-outlet>`,
  styles: [``]
})
export class AgentComponent { }
