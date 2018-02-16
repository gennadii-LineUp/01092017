import {Component, Input, OnInit} from '@angular/core';
import {CommonServices} from '../../../../../services/common.service';

@Component({
  selector: 'app-services-items-citiz',
  templateUrl: './services-citiz.component.html',
  styleUrls: ['../services.component.scss']
})
export class ServicesCitizComponent implements OnInit {

  constructor(public commonServices: CommonServices) { }

  ngOnInit() {
    // this.commonServices.removeEmptySelect2fromServices();
  }

}
