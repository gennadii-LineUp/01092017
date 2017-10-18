import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-services-items-cust',
  templateUrl: './services-cust.component.html',
  styleUrls: ['../services.component.scss']
})
export class ServicesCustComponent implements OnInit {

  @Input() userRole: string;

  constructor() { }

  ngOnInit() {}

}
