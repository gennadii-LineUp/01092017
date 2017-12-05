import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-services-manage-admin-citizen',
  templateUrl: './manage-admin-citizen.component.html',
  styleUrls: ['./manage-admin-citizen.component.scss']
})
export class ManageAdminCitizenComponent implements OnInit {
  userRole = '';
  alive = true;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
  }

}
