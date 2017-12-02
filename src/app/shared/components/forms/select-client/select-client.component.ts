import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {Select2optionClass} from '../../../../models/select2option-class';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss']
})
export class SelectClientComponent implements OnInit {
  errorMessage = '';
  beneficiary_fromSelect2 = '';
  @Output() beneficiary_defined = new EventEmitter<Select2optionClass>();

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {
    if (!this.userDataService.getClients().length) {this.userDataService.setClients(); }
    setTimeout(() => this.userDataService.setReceiversForSelect2(this.userDataService.getClients()), 500);
    setTimeout(() => this.errorMessage = this.userDataService.getErrorMessage(), 2000);
  }

  public setBeneficiaryFunction(beneficiary: any) {
    console.log(beneficiary);
    this.beneficiary_defined.emit(beneficiary);
  }

  private setReceivers() {
    if (!this.userDataService.getReceiversForSelect2().length) {
      this.userDataService.setReceiversForSelect2(this.userDataService.getCitizens());
    }
  }

}
