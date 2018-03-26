import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListBanquesSicaService} from '../../../services/api/listBanquesSica.service';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {ActivatedRoute} from '@angular/router';
import {NewBeneficiaryService} from '../../../services/api/newBeneficiary.service';
import {BanqueClass} from '../../../models/banque-class';
import {BeneficiaryClass} from '../services/virements-vers-banque/virements-vers-banque.component';
import * as moment from 'moment';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  providers: [ListBanquesSicaService, NewBeneficiaryService]
})
export class OperationsComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  loading = false;
  errorMessage = '';
  status = '';
  successMessage_1 = '';
  successMessage_2 = '';
  numTel_fromSelect2 = '';
  banques: Array<BanqueClass>;
  _banques: Array<BanqueClass>;
  beneficiaries = [];
  nomClient: string;
  beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');
  activeBanque: string;
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public listBanquesSicaService: ListBanquesSicaService,
              public newBeneficiaryService: NewBeneficiaryService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      // this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
      // this.loadLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
      // this.loadAllNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    this.loadListBanquesSicaFunction();
    if ((this.userDataService.getMyAccounts()).length) {
      // this.loadNonLuNotificationsFunction(this.userDataService.getMyAccounts()['0'].uoId);
    } else {
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(this.profil);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadListBanquesSicaFunction() {
      this.listBanquesSicaService.getListBanques()
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const _banques = (this.commonServices.xmlResponseParcer_compl_body(result._body)).return;
          if (_banques.length) {
            this.banques = (_banques.length) ? _banques : [];
            this._banques = this.banques;
          } else {
            this.errorMessage = 'Error: no banques';
          }
          console.log(this.banques);
        }, (err) => {
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
  }

  showBanque() {
    console.log(this.activeBanque);
  }

  _submitCreerBeneficiaryFunction() {
    console.log(this.beneficiary);
  }
  public submitCreerBeneficiaryFunction() {
    if (this.activeBanque && this.beneficiary.rib && this.beneficiary.compte && this.beneficiary.guichet && this.beneficiary.nom) {
      this.loading = true;

      this.newBeneficiaryService
          .createNewBeneficiary(this.activeBanque,
                                this.userDataService.getMyAccounts()['0'].uoId,
                                this.beneficiary)
        .takeWhile(() => this.alive)
        .subscribe((result) => {
          this.loading = false;
          console.log(result._body);
          const response = this.commonServices.xmlResponseParcer_complex(result._body);
          console.log(response);
          this.beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');

          this.successMessage_1 = '  ';
          this.successMessage_2 = 'Creation succès!';
        }, (err) => {
          this.loading = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
          if (!this.errorMessage) {
            this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
          }
        });
    } else {return false; }
  }

}
