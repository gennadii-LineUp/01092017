import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {Select2optionClass} from '../../../../models/select2option-class';
import {ReceiverClass} from '../../../../models/receiver-class';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import {CommonServices} from '../../../../services/common.service';
import {GetAllContractsService} from '../../../../services/api/getAllContracts.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
  providers: [GetAllListAccountService, GetAllContractsService]
})
export class ContractsListComponent implements OnInit {
  errorMessage_contract = 'There is no contracts in the database. Please, ask the admin to create them.';
  contract_fromSelect2 = '';
  myAccounts = [];
  contractsForSelect2 = [];
  allContracts = [];
  userRole = '';
  alive = true;
  @Output() contract_defined = new EventEmitter<Select2optionClass>();

  constructor(public userDataService: UserDataService,
              public activatedRoute: ActivatedRoute,
              public getAllListAccountService: GetAllListAccountService,
              public commonServices: CommonServices,
              public getAllContractsService: GetAllContractsService) { }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    // if ((this.userDataService.getAllContracts()).length) {
    //   console.log('=== AllContracts\' length ' + this.userDataService.getAllContracts().length);
    // } else {
    //   console.log('=== AllContracts are empty ===');
    //   this.userDataService.setAllContracts();
    // }
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }
    this.setAllContracts();
  }

  public setMyAccounts() {
    if (localStorage.telephone && localStorage.token) {
      this.getAllListAccountService.getMyAccounts(localStorage.telephone)
        .subscribe(result1 => {
          const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);

          const accounts = response1.accounts;
          if (accounts && accounts.length) {
            if (accounts['0'].status === 'ACTIF') {
              // this.setUserId(accounts['0'].id);
              this.myAccounts = [];
              for (let i = 0; i < accounts.length; i++) {
                this.myAccounts.push(new ReceiverClass(localStorage.nom || 'add a nom',
                  localStorage.prenom || 'add a prenom',
                  localStorage.telephone || 'add a phone',
                  'please add an address',
                  +accounts[i].id,
                  localStorage.profil || 'add a profil',
                  '',
                  '',
                  accounts[i].status,
                  accounts[i].type,
                  accounts[i].uoId));
              }
            }
          }
          console.log('=== from LS MyAccounts:');
          // console.log(this.getMyAccounts());
          // if (!this.user.nom || !this.user.prenom || !this.user.telephone || !this.user.id_account) {
          //   this.setUser(localStorage.nom || 'add a nom',
          //     localStorage.prenom || 'add a prenom',
          //     localStorage.profil || 'add a profil',
          //     localStorage.telephone || 'add a phone');
          //   console.log(this.myAccounts);
          //   this.setUserId(this.myAccounts['0'].id_account, this.myAccounts['0'].uoId);
          //   console.log('=== from LS User:');
          //   console.log(this.getUser());
          // }
        }, (err) => {
          console.log(err);
          // this.setErrorMessage(err);
        });
    } else {
      // this.logOut();
    }
  }


  public setAllContracts() {
    this.allContracts = [];
    if (this.myAccounts['0'] && this.myAccounts['0'].uoId) {
      this.getAllContractsService.getAllContracts(this.myAccounts['0'].uoId)
        .subscribe(result => {
          const response = (this.commonServices.xmlResponseParcer_complex(result._body)).contract;
          if (response) {
            console.log(response);
            this.allContracts = response;
            this.setContractsForSelect2(response);
          }
        }, (err) => {
          console.log(err);
          // this.setErrorMessage(err);
        });
    } else {
      this.getAllListAccountService.getMyAccounts(localStorage.telephone)
        .subscribe(result1 => {
          const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
          const accounts = response1.accounts;
          if (accounts && accounts.length) {
            if (accounts['0'].status === 'ACTIF') {
              this.getAllContractsService.getAllContracts(accounts['0'].uoId)
                .subscribe(result => {
                  const response = (this.commonServices.xmlResponseParcer_complex(result._body)).contract;
                  if (response) {
                    console.log(response);
                    this.allContracts = response;
                    this.setContractsForSelect2(response);
                  }
                }, (err) => {
                  console.log(err);
                  // this.setErrorMessage(err);
                });
            }
          }
        }, (err) => {
          console.log(err);
          // this.setErrorMessage(err);
        });
    }
  }

  public setContractsForSelect2(contracts: Array<any>) {
    this.contractsForSelect2 = [];
    if (contracts && contracts.length > 0) {
      contracts.forEach(item => {
        let text = (item.reference) ? (item.reference) : '';
        text += (item.dateCreation) ? (' de ' + this.commonServices.fromServerDateMoment(item.dateCreation)) : '';
        text += (item.debut) ? ('. Valide à partir de ' + this.commonServices.fromServerDateMoment(item.debut)) : '';
        text += (item.statut) ? ('. ' + item.statut) : '';
        text += (item.banque) ? ('. ' + item.banque + ' banque.') : '';
        const id = (item.id) ? (item.id) : '';

        this.contractsForSelect2.push(new Select2optionClass(id, text));
      });
      console.log(this.contractsForSelect2);
    }

  }
  public chooseContractFunction(contract: Select2optionClass) {
    console.log(contract);
    this.contract_defined.emit(contract);
  }

}
