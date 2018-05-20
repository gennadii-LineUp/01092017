import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetMyBeneficiariesService} from '../../../../services/api/getMyBeneficiaries.service';
import {VirementSicaService} from '../../../../services/api/virementSica.service';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';
import {BeneficiaryClass} from '../../../../models/beneficiary-class';

@Component({
  selector: 'app-virements-vers-banque',
  templateUrl: './virements-vers-banque.component.html',
  styleUrls: ['./virements-vers-banque.component.scss'],
  providers: [GetMyBeneficiariesService, VirementSicaService]
})
export class VirementsVersBanqueComponent implements OnInit, OnDestroy {
  loading = false;
  requestIsSent = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  beneficiaries = [];
  nomClient: string;
  beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');
  amountToReceiver: number;
  activeSelect: string;
  userRole = '';
  alive = true;

  @ViewChild('amount') amountInput: any;


  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getMyBeneficiariesService: GetMyBeneficiariesService,
              public virementSicaService: VirementSicaService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public activatedRoute: ActivatedRoute,
              public currencyParams: CurrencyParams) {
  }

  ngOnInit() {
    this.activatedRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if (!(this.userDataService.getMyAccounts()).length) {
      this.userDataService.setMyAccounts();
    }

    setTimeout(() => { this.amountInput.nativeElement.focus(); }, 10);
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public showNextBeneficiary(userChoice: string) {
    console.log(userChoice);
    this.beneficiary = this.beneficiaries.find(x => x.id === userChoice);
    console.log(this.beneficiary);
  }


  public submitVirementsVersBank() {
    if (!this.requestIsSent && +this.amountToReceiver >= 0.01) {
      this.requestIsSent = true;
      this.clearAll();
      this.loading = true;

      this.virementSicaService.virementsVersBanque(+this.userDataService.getMyAccounts()['0'].uoId,
        +this.beneficiary.id,
        this.amountToReceiver)
        .takeWhile(() => this.alive)
        .subscribe((result) => {
          this.loading = false;
          console.log(result._body);
          const response = this.commonServices.xmlResponseParcer_complex(result._body);
          console.log(response);

          this.successMessage_1 = 'Confirmation de succès pour le montant ' + response.montant + this.currencyParams.curXOF() + ' !';
          this.successMessage_2 = '' + this.commonServices.fromServerDateMoment(response.dateTransaction) + ' à '
            + moment(response.dateTransaction).local().format('HH:mm:ss');
          setTimeout(() => {
            this.amountInput.nativeElement.focus();
          }, 10);
          this.requestIsSent = false;
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
    console.log(this.beneficiary);
  }

  public clearAmount() {this.amountToReceiver = undefined; }

  public clearAll() {
    this.loading = false;
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    // this.beneficiaries = [];
    setTimeout(() => { this.amountInput.nativeElement.focus(); }, 10);
    // this.nomClient = '';
  }
}
