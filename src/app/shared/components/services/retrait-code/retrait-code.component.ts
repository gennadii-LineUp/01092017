import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {W2CCheckOrdreRetraitService} from '../../../../services/api/W2CCheckOrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {W2CRetraitTransactionService} from '../../../../services/api/W2CRetraitTransaction.service';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';
import {PassportClass} from '../../../../models/passport-class';
import {GetUOByCellularService} from '../../../../services/api/getUOByCellular.service';
import {GetIdentifiantsUOService} from '../../../../services/api/getIdentifiantsUO.service';

@Component({
  selector: 'app-services-retrait-code',
  templateUrl: './retrait-code.component.html',
  styleUrls: ['./retrait-code.component.scss'],
  providers: [W2CCheckOrdreRetraitService, W2CRetraitTransactionService, GetUOByCellularService, GetIdentifiantsUOService]
})
export class RetraitCodeComponent implements OnInit, OnDestroy {
  successMessage = '';
  successMessage_1 = '';
  loading = false;
  loading_retrieve = false;
  requestIsSent_send = false;
  requestIsSent_retirer = false;
  amount_retraitCode: number;
  errorMessage = '';
  errorMessage_retrieve = '';
  retraitCode_valid = false;
  retraitCode_errorMessage = false;
  setAmountAndBeneficiareId = false;
  envoyeur_documents = Array<PassportClass>(0);
  retraitCode = '628492399'; // '192075136'; // string;
  serverResponse = {
    code: '',
    date: '',
    envoyeur: {},
    beneficiaire: {adresse: '', cellulaire: '', nom: '', prenom: ''},
    message: '',
    montant: ''
  };
  // beneficiaire = new EnvoyeurClass('Ivan', 'Petrov', '773151459', 'DAKAR', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2019');
  userRole = '';
  alive = true;

  @Input() beneficiaire: any; // ('', '', '', '', '', '', '', '', '');
  @ViewChild('mainInput') mainInput: any;
  @ViewChild('secondInput') secondInput: any;


  constructor(public w2CCheckOrdreRetraitService: W2CCheckOrdreRetraitService,
              public w2CRetraitTransactionService: W2CRetraitTransactionService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public getUOByCellularService: GetUOByCellularService,
              public getIdentifiantsUOService: GetIdentifiantsUOService) { }


  ngOnInit() {
    setTimeout(() => { this.mainInput.nativeElement.focus(); }, 1);
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public submitFunction() {
    if (!this.requestIsSent_send) {
      this.requestIsSent_send = true;
      this.clearSearch();
      this.loading = true;

      this.errorMessage = '';
      this.errorMessage_retrieve = '';

      this.w2CCheckOrdreRetraitService.retraitCode(this.retraitCode)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          this.loading = false;
          const response = this.commonServices.xmlResponseParcer_complex( result._body );

          if (+response.error === 0) {
            this.retraitCode_valid = true;
            this.serverResponse['code'] = response.code;
            this.serverResponse['date'] = response.date;
            this.serverResponse['envoyeur'] = response.envoyeur[1];
            this.serverResponse['beneficiaire'] = response.envoyeur[0];
            this.serverResponse['message'] = response.errorMessage;
            this.serverResponse['montant'] = response.montant;
            this.amount_retraitCode = response.montant;

            setTimeout(() => { this.secondInput.nativeElement.focus(); }, 1);
            // ====================================
            this.getUOByCellularService.getData(this.serverResponse.beneficiaire.cellulaire)
              .takeWhile(() => this.alive)
              .subscribe(result1 => {
                const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
                const beneficiaire_id = response1.uo["0"].id;
                // **************************************
                this.getIdentifiantsUOService.getIdentifiantsUOService(beneficiaire_id)
                  .takeWhile(() => this.alive)
                  .subscribe(result2 => {
                    this.requestIsSent_send = false;
                    const response2 = this.commonServices.xmlResponseParcer_complex(result2._body);

                    this.envoyeur_documents = (response2 && response2.identifiant && (+response2.error === 0)) ? response2.identifiant : [];
                  }, (err) => {
                    console.log(err);
                    this.requestIsSent_send = false;
                  });
                // **************************************
              }, (err) => {
                console.log(err);
                this.requestIsSent_send = false;
              });
            // ====================================

          } else {
            this.requestIsSent_send = false;
            this.retraitCode_valid = false;
            if (response.errorMessage) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.errorMessage); }
            if (response.message) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message); }
            this.clearSearch();
          }

        }, (err) => {
          this.loading = false;
          this.requestIsSent_send = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    }
  }

  public onChanged(beneficiaire: EnvoyeurClass) {
    this.beneficiaire = beneficiaire;
  }

  public clearAmount() {this.amount_retraitCode = undefined; }

  public setAmountAndBeneficiareIdFunction() {
    this.setAmountAndBeneficiareId = true;

  }

  public retrieveCashFunction() {
    if (!this.requestIsSent_retirer
      && this.amount_retraitCode && this.beneficiaire.nom && this.beneficiaire.prenom
      && this.beneficiaire.cellulaire && this.beneficiaire.id_type
      && this.beneficiaire.id_valeur && this.beneficiaire.id_debut) {
      this.requestIsSent_retirer = true;
      this.loading_retrieve = true;
      this.w2CRetraitTransactionService.retrieveCash(this.serverResponse.code, this.amount_retraitCode, 0, this.beneficiaire)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          this.loading_retrieve = false;
          this.requestIsSent_retirer = false;
          const response = this.commonServices.xmlResponseParcer_complex(result._body);
          this.retraitCode_valid = false;
          this.successMessage_1 = response.message;
        }, (err) => {
          this.loading_retrieve = false;
          this.requestIsSent_retirer = false;
          console.log(err);
          this.errorMessage_retrieve = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    } else {return false; }
  }

  public clearSearch() {
    this.retraitCode_valid = false;
    this.setAmountAndBeneficiareId = false;
    this.successMessage_1 = '';
    this.loading = false;
    this.loading_retrieve = false;
    this.serverResponse = {
      code: '',
      date: '',
      envoyeur: {},
      beneficiaire: {adresse: '', cellulaire: '', nom: '', prenom: ''},
      message: '',
      montant: ''
    };
    setTimeout(() => { this.mainInput.nativeElement.focus(); }, 1);
  }

}
