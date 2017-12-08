import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../../models/user-data';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class LoginStartPageComponent implements OnInit {
  userRole = '';

  constructor(public userDataService: UserDataService) { }


  ngOnInit() {
    this.userRole = ((<any>this.userDataService.getUser).profil) ?
      (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
  }
}
