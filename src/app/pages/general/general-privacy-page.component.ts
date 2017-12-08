import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../models/user-data';

@Component({
  selector: 'app-general-privacy-page',
  template: `<app-header-general></app-header-general>
             <app-header-all-users  *ngIf="userRole" [userRole]="userRole"></app-header-all-users>

            <app-privacy-policy></app-privacy-policy>`,
  styles: [``]
})
export class GeneralPrivacyPageComponent implements OnInit {
  userRole = '';

  constructor(public userDataService: UserDataService) { }


  ngOnInit() {
    this.userRole = ((<any>this.userDataService.getUser).profil) ?
      (<any>this.userDataService.getUser).profil.toLowerCase() :
      (localStorage.getItem('profil')).toLowerCase();
  }

}

