import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReceiverClass} from '../../../models/receiver-class';
import {UserDataService} from '../../../models/user-data';
import {GetAllCustomerService} from '../../../services/api/getAllCustomer.service';
import {CommonServices} from '../../../services/common.service';
import {GetAllCitizenService} from '../../../services/api/getAllCitizen.service';

@Component({
  selector: 'app-select-sender',
  templateUrl: './select-sender.component.html',
  styleUrls: ['./select-sender.component.scss'],
  providers: [GetAllCustomerService, GetAllCitizenService]
})
export class SelectSenderComponent implements OnInit {
  errorMessage = '';
  loading = false;
  sender_to_find = '';
  clients = [];
  citizens = [];
  citizensClients = [];

  senders = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', '', '', '', '', ''),
    new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', '', '', '', '', ''),
    new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '', '', '', '', '')];

  @Input() header_page = 'Insert sender’s information';
  @Input() input_caption = 'Find a sender’s account by';
  @Input() input_placeholder = 'name, surname, phone number...';

  @Output() senderDefined = new EventEmitter<any>();


  constructor(public userDataService: UserDataService,
              public getAllCustomerService: GetAllCustomerService,
              public getAllCitizenService: GetAllCitizenService,
              public commonServices: CommonServices) { }

  ngOnInit() {
    if (!this.userDataService.getCitizensClients().length) {
      this.setCitizensClients();
    }
  }

  public setCitizensClients() {
    let clients = [];
    let citizens = [];
    this.getAllCustomerService.getAllCustomer()
      .subscribe(result1 => {
        const response1 = (this.commonServices.xmlResponseParcer_complex(result1._body)).uos;
        clients = (response1.length) ? response1 : [];
        this.getAllCitizenService.getAllCitizens()
          .subscribe(result2 => {
            const response2 = (this.commonServices.xmlResponseParcer_complex(result2._body)).uos;
            citizens = (response2.length) ? response2 : [];

            this.citizensClients = (clients).concat(citizens);
            this.userDataService.setCitizensClients(this.citizensClients);
          }, (err) => {console.log(err); });
      }, (err) => {console.log(err); });
  }


  async  test() {
    const clients = await this.setClients();
    const citizens = await this.setCitizens();

    this.citizensClients = (clients).concat(citizens);
  }

  public setClients(): Promise<any> {
    return new Promise((reslove, reject) => {
    // public setClients() {
        this.clients = [];
        this.getAllCustomerService.getAllCustomer()
          .subscribe(async result => {
            const response = (this.commonServices.xmlResponseParcer_complex(result._body)).uos;
            this.clients = (response.length) ? response : [];
            // this.receivers = this.clients;
          }, (err) => {console.log(err); });
      // }
      reslove(this.clients);
    })
  }

  public setCitizens() {
    return new Promise((reslove, reject) => {
    // public setCitizens() {
        this.citizens = [];
        this.getAllCitizenService.getAllCitizens()
          .subscribe(async result => {
            const response = (this.commonServices.xmlResponseParcer_complex(result._body)).uos;
            this.citizens = (response.length) ? response : [];
            // this.receivers = this.citizens;
          }, (err) => {console.log(err); });
      // }
      reslove(this.citizens);
    })
  }

  public findFunction() {
  }


  public setSenderFunction(sender: any) {
    this.senderDefined.emit(sender);
  }



}
