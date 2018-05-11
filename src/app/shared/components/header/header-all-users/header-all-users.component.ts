import {Component, Input} from '@angular/core';
import {UserDataService} from '../../../../models/user-data';

@Component({
  selector: 'app-header-all-users',
  templateUrl: './header-all-users.component.html',
  styleUrls: ['../header.component.scss'],
  providers: []
})
export class HeaderAllUsersComponent {
  user = this.userDataService.getUser();
  nom = localStorage.nom;
  prenom = localStorage.prenom;
  profil = localStorage.profil;
  @Input() userRole: string;

  constructor(public userDataService: UserDataService) {}

}
