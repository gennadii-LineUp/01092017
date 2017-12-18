import { Component, OnInit } from '@angular/core';
import {CommonServices} from '../../../../../services/common.service';

@Component({
  selector: 'app-services-items-agent',
  templateUrl: './services-agent.component.html',
  styleUrls: ['../services.component.scss']
})
export class ServicesAgentComponent implements OnInit {

  constructor(public commonServices: CommonServices) { }

  ngOnInit() {
    this.commonServices.removeEmptySelect2fromServices();
  }

}
