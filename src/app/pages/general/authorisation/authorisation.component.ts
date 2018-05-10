import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../services/api/login.service';
import {AuthorisationClass} from '../../../models/authorisation-class';
import 'rxjs/add/operator/takeWhile';
import {AuthGuard} from '../../../guards/auth-guard.service';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss'],
  providers: [LoginService]
})
export class GeneralAuthorisationComponent implements OnInit {
  loggedin = false;
  show_slider = true;
  authorisation = new AuthorisationClass('wari', 'wari', 'APP');
  // authorisation = new AuthorisationClass('agent1', '12345678', 'APP');
  // authorisation = new AuthorisationClass('7722222222', 'passer', 'APP'); // CITIZEN
  // authorisation = new AuthorisationClass('tresor', 'tresor', 'APP');        // CUSTOMER = CLIENT

  alive = true;

  constructor(public authGuard: AuthGuard) { }

  ngOnInit() {
    this.loggedin = this.authGuard.canActivate();
    this.show_slider = !(localStorage.getItem('show-slider') && localStorage.getItem('show-slider') === '1');
  }

  public setSliderVisibility(value: string) {
    this.show_slider = !value;
  }


}
