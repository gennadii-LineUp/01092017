import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-services-items-cust-citiz',
  templateUrl: './services-cust-citiz.component.html',
  styleUrls: ['../services.component.scss']
})
export class ServicesCustCitizComponent implements OnInit {

  @Input() userRole: string;

  constructor() { }

  ngOnInit() {
    console.log(this.userRole);
  }

}
