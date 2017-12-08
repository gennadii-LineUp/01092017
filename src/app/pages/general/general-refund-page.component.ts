import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../models/user-data';

@Component({
  selector: 'app-general-faq-page',
  template: `<app-header-general></app-header-general>
             <app-header-all-users  *ngIf="userRole" [userRole]="userRole"></app-header-all-users>

            <app-refund-policy></app-refund-policy>`,
  styles: [``]
})
export class GeneralRefundPageComponent implements OnInit {
  userRole = '';

  constructor(public userDataService: UserDataService) { }


  ngOnInit() {
    this.userRole = ((<any>this.userDataService.getUser).profil) ?
      (<any>this.userDataService.getUser).profil.toLowerCase() :
      (localStorage.getItem('profil')).toLowerCase();
  }

}

