import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cust-settings-page',
  templateUrl: './cust-settings-page.component.html',
  styleUrls: ['./cust-settings-page.component.scss']
})
export class CustSettingsPageComponent implements OnInit {
  userRole = 'customer';

  constructor() { }

  ngOnInit() {
  }

}
