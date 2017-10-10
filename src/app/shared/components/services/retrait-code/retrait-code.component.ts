import { Component, OnInit } from '@angular/core';
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
  retraitCode: string;

  constructor(public w2CCheckOrdreRetraitService: W2CCheckOrdreRetraitService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
  }

  public submitFunction() {
    this.loading = true;
    // this.retraitCode_valid = !this.retraitCode_valid;
    console.log(this.retraitCode);

    this.successMessage = '';
    this.errorMessage = '';

    this.w2CCheckOrdreRetraitService.retraitCode(this.retraitCode)
      .subscribe(result => {
        this.loading = false;
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer( result._body );

        console.dir( response );
        if (+response.error === 0) {
        //   this.showReceiverInfo = false;
        //   this.clearSearch();
        //   this.successMessage = response.message;
        //   this.discardReceiverInfoFunction();
        } else {
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.errorMessage);
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

}
