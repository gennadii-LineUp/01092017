import {Component, EventEmitter, Output} from '@angular/core';
import {RegistrationClass} from '../../../../models/registration-class';

@Component({
  selector: 'app-new-receiver-small',
  templateUrl: './new-receiver-small.component.html',
  styleUrls: ['./new-receiver-small.component.scss']
})
export class NewReceiverSmallComponent {
  newReceiver = new RegistrationClass('', '', 221, '', 'AUTO', 'AUTO', 'AUTO', 'AUTO', true);
  @Output() receiver_defined = new EventEmitter<RegistrationClass>();
  constructor() { }

  onChanged() {
    // console.log((this.newReceiver));
    this.receiver_defined.emit(this.newReceiver);
  }

}
