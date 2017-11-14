import {Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {W2CCheckOrdreRetraitService} from '../../../../services/api/W2CCheckOrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {W2CRetraitTransactionService} from '../../../../services/api/W2CRetraitTransaction.service';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-services-retrait-code',
  templateUrl: './retrait-code.component.html',
  styleUrls: ['./retrait-code.component.scss'],
  providers: [W2CCheckOrdreRetraitService, W2CRetraitTransactionService]
})
export class RetraitCodeComponent implements OnInit, OnDestroy {
  successMessage = '';
  successMessage_1 = '';
  loading = false;
  loading_retrieve = false;
  amount_retraitCode: number;
  errorMessage = '';
  errorMessage_retrieve = '';
  retraitCode_valid = false;
  retraitCode_errorMessage = false;
  setAmountAndBeneficiareId = false;
  retraitCode = '391040042'; // '219120516'; // string;
  serverResponse = {
    code: '',
    date: '',
    envoyeur: {},
    beneficiaire: {adresse: '', cellulaire: '', nom: '', prenom: ''},
    message: '',
    montant: ''
  };
  // beneficiaire = new EnvoyeurClass('Ivan', 'Petrov', '773151459', 'DAKAR', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2019');

  subscription_w2CCheckOrdreRetraitService: Subscription;
  subscription_w2CRetraitTransactionService: Subscription;

  @Input() beneficiaire: any; // ('', '', '', '', '', '', '', '', '');
  @ViewChild('mainInput') mainInput: any;
  @ViewChild('secondInput') secondInput: any;


  constructor(public w2CCheckOrdreRetraitService: W2CCheckOrdreRetraitService,
              public w2CRetraitTransactionService: W2CRetraitTransactionService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    setTimeout(() => { this.mainInput.nativeElement.focus(); }, 1);
  }

  ngOnDestroy() {
    if (this.subscription_w2CCheckOrdreRetraitService) {
      this.subscription_w2CCheckOrdreRetraitService.unsubscribe();
    }
    if (this.subscription_w2CRetraitTransactionService) {
      this.subscription_w2CRetraitTransactionService.unsubscribe();
    }
  }

  public submitFunction() {
    this.clearSearch();
    this.loading = true;

    console.log(this.retraitCode);

    this.errorMessage = '';
    this.errorMessage_retrieve = '';

    this.subscription_w2CCheckOrdreRetraitService = this.w2CCheckOrdreRetraitService.retraitCode(this.retraitCode)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_complex( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.retraitCode_valid = true;
          this.serverResponse['code'] = response.code;
          this.serverResponse['date'] = response.date;
          this.serverResponse['envoyeur'] = response.envoyeur[0];
          this.serverResponse['beneficiaire'] = response.envoyeur[1];
          this.serverResponse['message'] = response.errorMessage;
          this.serverResponse['montant'] = response.montant;
          this.amount_retraitCode = response.montant;

          console.log(this.serverResponse);
          setTimeout(() => { this.secondInput.nativeElement.focus(); }, 1);


        //   this.showReceiverInfo = false;
        //   this.clearSearch();
        //   this.successMessage = response.message;
        //   this.discardReceiverInfoFunction();
        } else {
          this.retraitCode_valid = false;
          if (response.errorMessage) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.errorMessage); }
          if (response.message) {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message); }
          this.clearSearch();
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public onChanged(beneficiaire: EnvoyeurClass) {
    this.beneficiaire = beneficiaire;
  }

  public clearAmount() {this.amount_retraitCode = undefined; }

  public setAmountAndBeneficiareIdFunction() {
    this.setAmountAndBeneficiareId = true;
  }

  public retrieveCashFunction() {
    this.loading_retrieve = true;
    // console.log(this.beneficiaire);
    this.subscription_w2CRetraitTransactionService =
      this.w2CRetraitTransactionService.retrieveCash(this.serverResponse.code, this.amount_retraitCode, 1000, this.beneficiaire)
      .subscribe(result => {
        this.loading_retrieve = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        console.log(response);
        this.retraitCode_valid = false;
        this.successMessage_1 = response.message;
      }, (err) => {
        this.loading_retrieve = false;
        console.log(err);
        this.errorMessage_retrieve = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
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
