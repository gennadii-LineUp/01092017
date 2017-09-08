import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-users',
  templateUrl: './header-users.component.html',
  styleUrls: ['../header.component.scss']
})
export class HeaderUsersComponent implements OnInit {

  @Input() userRole: string;

  constructor() { }

  ngOnInit() {
  }

}
