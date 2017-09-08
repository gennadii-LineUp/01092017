import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-all-users',
  templateUrl: './header-all-users.component.html',
  styleUrls: ['../header.component.scss']
})
export class HeaderAllUsersComponent implements OnInit {

  @Input() userRole: string;

  constructor() { }

  ngOnInit() {
  }

}
