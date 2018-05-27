import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RegistrationClass} from '../../../../models/registration-class';

@Component({
  selector: 'app-new-receiver-small',
  templateUrl: './new-receiver-small.component.html',
  styleUrls: ['./new-receiver-small.component.scss']
})
export class NewReceiverSmallComponent {
  newReceiver = new RegistrationClass('', '', 221, '', 'AUTO', 'AUTO', 'AUTO', 'AUTO', true);
  @Input() set telephoneDefault(telephone: string) {
    this.newReceiver.telephone = telephone;
    this.newReceiver.mail = telephone;
  }
  @Output() receiver_defined = new EventEmitter<RegistrationClass>();
  constructor() { }

  onChanged() {
    this.receiver_defined.emit(this.newReceiver);
  }
  public clearReceiver(field: string) {this.newReceiver[field] = undefined; }

}
