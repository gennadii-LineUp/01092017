import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../../../../guards/auth-guard.service";

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})

export class AboutUsComponent implements OnInit {
  loggedin = false;
  constructor(public authGuard: AuthGuard) { }

  ngOnInit() {
      this.loggedin = this.authGuard.canActivate();
  }
}
