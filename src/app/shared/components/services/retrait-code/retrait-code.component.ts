import {Component, OnInit, ViewChild} from '@angular/core';
import {W2CCheckOrdreRetraitService} from '../../../../services/api/W2CCheckOrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';

@Component({
  selector: 'app-services-retrait-code',
  templateUrl: './retrait-code.component.html',
  styleUrls: ['./retrait-code.component.scss'],
  providers: [W2CCheckOrdreRetraitService]
})
export class RetraitCodeComponent implements OnInit {
  successMessage = '';
  loading = false;
  errorMessage = '';
  retraitCode_valid = false;
  retraitCode_errorMessage = false;
  retraitCode = '219120516'; // string;
  serverResponse = {
    code: '',
    date: '',
    envoyeur: {},
    beneficiaire: {adresse: '', cellulaire: '', nom: '', prenom: ''},
    message: '',
    montant: ''
  };

  @ViewChild('mainInput') mainInput: any;
  @ViewChild('secondInput') secondInput: any;


  constructor(public w2CCheckOrdreRetraitService: W2CCheckOrdreRetraitService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    setTimeout(() => { this.mainInput.nativeElement.focus(); }, 1);
  }

  public submitFunction() {
    this.clearSearch();
    this.loading = true;

    console.log(this.retraitCode);

    this.successMessage = '';
    this.errorMessage = '';

    this.w2CCheckOrdreRetraitService.retraitCode(this.retraitCode)
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

          console.log(this.serverResponse);
          setTimeout(() => { this.secondInput.nativeElement.focus(); }, 1);


        //   this.showReceiverInfo = false;
        //   this.clearSearch();
        //   this.successMessage = response.message;
        //   this.discardReceiverInfoFunction();
        } else {
          this.retraitCode_valid = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.errorMessage);
          this.clearSearch();
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public clearSearch() {
    this.retraitCode_valid = false;
    this.loading = false;
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
