import { Component, OnInit } from '@angular/core';
import {CommonServices} from '../../../../services/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public commonServices: CommonServices) { }

  ngOnInit() {
  }



}
