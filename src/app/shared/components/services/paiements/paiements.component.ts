import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../../../models/user-data';

@ Component({
  selector: 'app-services-paiements',
  templateUrl: 'paiements.component.html',
  styleUrls: ['paiements.component.scss']
})
export class PaiementsComponent implements OnInit {

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);
    this.userDataService.setReceivers(profil);
  }

}
