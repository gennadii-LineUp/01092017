import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {Select2optionClass} from '../../../../models/select2option-class';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit {
  errorMessage_contract = 'There is no contracts in the database. Please, ask the admin to create them.';
  contract_fromSelect2 = '';
  @Output() contract_defined = new EventEmitter<Select2optionClass>();

  constructor(public userDataService: UserDataService) { }

  ngOnInit() {
    if ((this.userDataService.getAllContracts()).length) {
      console.log('=== AllContracts\' length ' + this.userDataService.getAllContracts().length);
    } else {
      console.log('=== AllContracts are empty ===');
      this.userDataService.setAllContracts();
    }
  }

  public chooseContractFunction(contract: Select2optionClass) {
    console.log(contract);
    this.contract_defined.emit(contract);
  }

}
