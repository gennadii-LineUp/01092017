import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListBanquesSicaService} from '../../../services/api/listBanquesSica.service';
import {CommonServices} from '../../../services/common.service';
import {UserDataService} from '../../../models/user-data';
import {CurrencyParams} from '../../../models/currency_params';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {ActivatedRoute} from '@angular/router';
import {NewBeneficiaryService} from '../../../services/api/newBeneficiary.service';
import {BanqueClass} from '../../../models/banque-class';
import {BeneficiaryClass} from '../../../models/beneficiary-class';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
  providers: [ListBanquesSicaService, NewBeneficiaryService]
})
export class OperationsComponent implements OnInit, OnDestroy {
  addNewBenef_mode = false;
  userRole = '';
  profil = '';
  loading = false;
  requestIsSent = false;
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
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    this.loadListBanquesSicaFunction();
    if (!(this.userDataService.getMyAccounts()).length) {
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadListBanquesSicaFunction() {
    if (!this.requestIsSent) {
      this.requestIsSent = true;
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
          this.requestIsSent = false;
        }, (err) => {
          console.log(err);
          this.requestIsSent = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }
  }

  showBanque() {
  }

  public submitCreerBeneficiaryFunction() {
    if (!this.requestIsSent
      && this.activeBanque && this.beneficiary.rib && this.beneficiary.compte && this.beneficiary.guichet && this.beneficiary.nom) {
      this.loading = true;
      this.requestIsSent = true;

      this.newBeneficiaryService
          .createNewBeneficiary(this.activeBanque,
                                this.userDataService.getMyAccounts()['0'].uoId,
                                this.beneficiary)
        .takeWhile(() => this.alive)
        .subscribe((result) => {
          this.loading = false;
          const response = this.commonServices.xmlResponseParcer_complex(result._body);
          this.beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');

          this.successMessage_1 = '  ';
          this.successMessage_2 = 'Creation succès!';
          setTimeout(() => {
            this.ngOnInit();
            this.toggleAddNewBenef_mode()}, 2000);
          this.requestIsSent = false;
          //
        }, (err) => {
          this.loading = false;
          this.requestIsSent = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
          if (!this.errorMessage) {
            this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
          }
        });
    } else {return false; }
  }

  public showErrorMessage(value: string) {
    this.errorMessage = value;
  }
  public showBeneficiary(value: BeneficiaryClass) {
    this.beneficiary = value;
  }

  public toggleAddNewBenef_mode() {
    this.beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');
    this.addNewBenef_mode = !this.addNewBenef_mode;
    this.successMessage_1 = '';
    this.successMessage_2 = '';
  }
}
