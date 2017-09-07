import { Component } from '@angular/core';

@Component({
  selector: 'app-citizen',
  template: `<app-header-citizen></app-header-citizen>
              <router-outlet></router-outlet>`,
  styleUrls: ['./citizen.component.scss']
})
export class CitizenComponent { }
