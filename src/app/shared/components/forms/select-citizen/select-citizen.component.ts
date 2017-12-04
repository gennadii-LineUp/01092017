import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {Select2optionClass} from '../../../../models/select2option-class';

@Component({
  selector: 'app-select-citizen',
  templateUrl: './select-citizen.component.html',
  styleUrls: ['./select-citizen.component.scss']
})
export class SelectCitizenComponent implements OnInit {
  errorMessage = '';
  beneficiary_fromSelect2 = '';
  @Output() beneficiary_defined = new EventEmitter<Select2optionClass>();

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {
    if (!this.userDataService.getCitizens().length) {this.userDataService.setCitizens(); }
    setTimeout(() => this.userDataService.setReceiversForSelect2(this.userDataService.getCitizens()), 500);
    setTimeout(() => this.errorMessage = this.userDataService.getErrorMessage(), 2000);
  }

  public setBeneficiaryFunction(beneficiary: any) {
    console.log(beneficiary);
    this.beneficiary_defined.emit(beneficiary);
  }

  public setReceivers() {
    if (!this.userDataService.getReceiversForSelect2().length) {
      this.userDataService.setReceiversForSelect2(this.userDataService.getCitizens());
    }
  }

}
