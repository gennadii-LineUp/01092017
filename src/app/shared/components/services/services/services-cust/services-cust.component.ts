import {Component, Input, OnInit} from '@angular/core';
import {CommonServices} from '../../../../../services/common.service';

@Component({
  selector: 'app-services-items-cust',
  templateUrl: './services-cust.component.html',
  styleUrls: ['../services.component.scss']
})
export class ServicesCustComponent implements OnInit {

  @Input() userRole: string;

  constructor(public commonServices: CommonServices) { }

  ngOnInit() {
    // this.commonServices.removeEmptySelect2fromServices();
  }

}
