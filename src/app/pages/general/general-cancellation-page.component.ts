import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../models/user-data';

@Component({
  selector: 'app-general-faq-page',
  template: `<app-header-general  *ngIf="!userRole"></app-header-general>
             <app-header-all-users  *ngIf="userRole" [userRole]="userRole"></app-header-all-users>

            <app-cancellation></app-cancellation>`,
  styles: [``]
})
export class GeneralCancellationPageComponent implements OnInit {
  userRole = '';

  constructor(public userDataService: UserDataService) { }


  ngOnInit() {
    if (this.userDataService.getUser().profil || localStorage.getItem('profil')) {
      this.userRole = ((<any>this.userDataService.getUser).profil) ?
        (<any>this.userDataService.getUser).profil.toLowerCase() :
        (localStorage.getItem('profil')).toLowerCase();
    }
  }

}

