import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../models/user-data';

@Component({
  selector: 'app-about-us-page',
  template: `<app-header-general *ngIf="!userRole"></app-header-general>
             <app-header-all-users  *ngIf="userRole" [userRole]="userRole"></app-header-all-users>

            <app-aboutus></app-aboutus>`,
  styles: [``]
})
export class GeneralAboutUsPageComponent implements OnInit {
  userRole = '';

  constructor(public userDataService: UserDataService) { }


  ngOnInit() {
    this.userRole = ((<any>this.userDataService.getUser).profil) ?
                                            (<any>this.userDataService.getUser).profil.toLowerCase() :
                                            (localStorage.getItem('profil')).toLowerCase();
  }

}

