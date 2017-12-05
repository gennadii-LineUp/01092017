import {Component, Input, OnInit} from '@angular/core';
import {UserDataService} from '../../../../models/user-data';

@Component({
  selector: 'app-header-all-users',
  templateUrl: './header-all-users.component.html',
  styleUrls: ['../header.component.scss'],
  providers: []
})
export class HeaderAllUsersComponent implements OnInit {
  user = this.userDataService.getUser();
  nom = localStorage.nom;
  prenom = localStorage.prenom;
  profil = localStorage.profil;
  @Input() userRole: string;

  constructor(public userDataService: UserDataService) {
    // this.userDataService.caseNumber$.subscribe(
    //   user => {
    //     console.log(4442);
    //     console.log(user);
    //   }
    // );
  }

  ngOnInit() {
    // this.userDataService.caseNumber$.subscribe(
    //   user => {
    //     console.log(555);
    //     this.me = user;
    //     console.log(this.me);
    //   }
    // );
  }


}
