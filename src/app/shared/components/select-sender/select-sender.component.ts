import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReceiverClass} from '../../../models/receiver-class';

@Component({
  selector: 'app-select-sender',
  templateUrl: './select-sender.component.html',
  styleUrls: ['./select-sender.component.scss']
})
export class SelectSenderComponent implements OnInit {
  errorMessage = '';
  loading = false;
  sender_to_find = '';

  senders = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', ''),
    new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', ''),
    new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '')];

  @Input() header_page = 'Insert sender’s information';
  @Input() input_caption = 'Find a sender’s account by';
  @Input() input_placeholder = 'name, surname, phone number...';

  @Output() senderDefined = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  public findFunction() {
    console.log(this.sender_to_find);

  }


  public setSenderFunction(sender: any) {
    this.senderDefined.emit(sender);
  }



}
