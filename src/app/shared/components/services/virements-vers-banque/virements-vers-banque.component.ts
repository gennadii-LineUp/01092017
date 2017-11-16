import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {UserDataService} from '../../../../models/user-data';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetMyBeneficiariesService} from '../../../../services/api/getMyBeneficiaries.service';
import {VirementSicaService} from '../../../../services/api/virementSica.service';
import * as moment from 'moment';

export class BeneficiaryClass {
  banque: string;
  compte: string;
  guichet: string;
  id: string;
  nom: string;
  prenom: string;
  rib: string;

  constructor(banque: string,
              compte: string,
              guichet: string,
              id: string,
              nom: string,
              prenom: string,
              rib: string) {

    this.banque = banque;
    this.compte = compte;
    this.guichet = guichet;
    this.id = id;
    this.nom = prenom;
    this.prenom = prenom;
    this.rib = rib;
  }
}


@Component({
  selector: 'app-virements-vers-banque',
  templateUrl: './virements-vers-banque.component.html',
  styleUrls: ['./virements-vers-banque.component.scss'],
  providers: [GetMyBeneficiariesService, VirementSicaService]
})
export class VirementsVersBanqueComponent implements OnInit, OnDestroy {
  loading = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  beneficiaries = [];
  nomClient: string;
  beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');
  amountToReceiver: number;
  alive = true;

  @ViewChild('amount') amountInput: any;


  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getMyBeneficiariesService: GetMyBeneficiariesService,
              public virementSicaService: VirementSicaService,
              public errorMessageHandlerService: ErrorMessageHandlerService) {
  }

  ngOnInit() {
    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    if (this.userDataService.getUser().id_account) {this.getMyBeneficiariesFunction();
    } else {setTimeout(() => {this.getMyBeneficiariesFunction(); }, 100); }

    setTimeout(() => { this.amountInput.nativeElement.focus(); }, 10);
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public getMyBeneficiariesFunction() {
    console.log(this.userDataService.getUser().id_account);
    this.getMyBeneficiariesService.getMyBeneficiaries(this.userDataService.getUser().id_account)
      .takeWhile( () => this.alive)
      .subscribe((result) => {
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        this.beneficiaries = (response.beneficiaries) ? response.beneficiaries : [];
        this.beneficiary = (this.beneficiaries.length) ? this.beneficiaries['1'] : [];

        this.nomClient = (this.beneficiary.nom) ? (this.beneficiary.nom) : '';
        this.nomClient += (this.beneficiary.prenom) ? (' ' + this.beneficiary.prenom) : '';
        console.log(this.beneficiaries);
      }, (err) => {
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        if (!this.errorMessage) {
          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
        }
      });
  }


  public submitVirementsVersBank() {
    this.clearAll();
    this.loading = true;

    this.virementSicaService.virementsVersBanque(+this.beneficiary.id, this.amountToReceiver)
      .takeWhile( () => this.alive)
      .subscribe( (result) => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        console.log(response);

        this.successMessage_1 = 'Success confirmation for amount ' +  response.montant + 'usd !';
        this.successMessage_2 = '' + this.commonServices.fromServerMoment(response.dateTransaction) + ' at '
                                    + moment(response.dateTransaction).local().format('HH:mm:ss');
        setTimeout(() => { this.amountInput.nativeElement.focus(); }, 10);
      }, (err) => {
        this.loading = false;
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        if (!this.errorMessage) {
          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
        }
      });
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
