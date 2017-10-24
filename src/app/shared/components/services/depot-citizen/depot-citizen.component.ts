import { Component, OnInit } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {C2WDepotTransactionService} from 'app/services/api/C2WDepotTransaction.service';

@Component({
  selector: 'app-services-depot-citizen',
  templateUrl: './depot-citizen.component.html',
  styleUrls: ['./depot-citizen.component.scss'],
  providers: [GetCommissionsTTCService, C2WDepotTransactionService]
})
export class DepotCitizenComponent implements OnInit {
  successMessage = '';
  loading = false;
  errorMessage = '';
  newReceiver = this.userDataService.beneficiaires[0];
  // newReceiver = new ReceiverClass('', '', '', '', 0, '');
  receiverExist = false;
  createNewReceiver = true;
  receiverStatus = '';
  receiverToFind = '';
  amount_depotCitizen: number;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen'),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen'),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen')];

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public c2WDepotTransactionService: C2WDepotTransactionService) { }

  ngOnInit() {
    // this.createNewReceiverMode();
    this.receiverExistMode();
  }

  public submitDepotSitizen() {
    console.log(this.amount_depotCitizen + '  to send');
    console.dir(this.commonServices.getSelectedReceivers());

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // console.log(this.myAccount);
    this.getCommissionsTTCService.getCommission(this.amount_depotCitizen, 'C2W')
      .subscribe(result => {
        console.log(result._body);
        const response = this.commonServices.xmlResponseParcer_simple( result._body );

        console.dir( response );
        if (+response.error === 0) {
          this.errorMessage = response.message + ' - ' + response.commission;
          /////////////////////////////
          this.c2WDepotTransactionService.makeDepotSitizen()
            .subscribe(result => {
              this.loading = false;
              console.log(result._body);
              const response = this.commonServices.xmlResponseParcer_simple( result._body );

              console.dir( response );
              if (+response.error === 0) {
                this.errorMessage = response.message + ' - ' + response.commission;

              } else {
                this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
              }

            }, (err) => {
              this.loading = false;
              console.log(err);
              this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
            });

          /////////////////////////////
        } else {
          this.loading = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
        }

      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public receiverExistMode() {
    this.clearSearch();
    this.receiverExist = true;
    this.commonServices.unSelectAllReceiversFunction();
  }
  public createNewReceiverMode() {
    this.clearSearch();
    this.receiverStatus = 'New';
    this.createNewReceiver = true;
  }
  public clearAmount() {this.amount_depotCitizen = undefined; }
  public clearSearch() {
    this.amount_depotCitizen = undefined;
    // this.receivers = [];
    this.receiverToFind = '';
    this.newReceiver = new ReceiverClass('', '', '', '', 0, '');
    this.receiverExist = false;
    this.createNewReceiver = false;
    this.receiverStatus = '';
    this.loading = false;
    this.successMessage = '';
    this.errorMessage = '';

  }
}
