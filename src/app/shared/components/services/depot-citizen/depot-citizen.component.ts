import {Component, OnInit, ViewChild} from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';
import {C2WDepotTransactionService} from '../../../../services/api/C2WDepotTransaction.service';

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
  // newReceiver = new ReceiverClass('', '', '', '', 0, '', '', '');
  receiverExist = false;
  createNewReceiver = true;
  receiverStatus = '';
  receiverToFind = '7722222222';
  amount_depotCitizen: number;
  commission = [];
  envoyeur = new EnvoyeurClass('KANE', 'MOMAR', '773151459', 'DAKAR', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2017');
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', '', ''),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', '', ''),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '', '')];

  @ViewChild('amount2') amount2: any;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public c2WDepotTransactionService: C2WDepotTransactionService) { }

  ngOnInit() {
    this.firstStepMode();

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);
    this.userDataService.setReceivers(profil);
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
          this.commission.push(+response.commission);
          console.log(this.commission);
          /////////////////////////////
          this.c2WDepotTransactionService.makeDepotSitizen(this.newReceiver.telephone,
            +this.amount_depotCitizen, +response.commission, this.envoyeur)
            .subscribe(_result => {
              this.loading = false;
              console.log(_result._body);
              const _response = this.commonServices.xmlResponseParcer_simple( _result._body );

              console.dir( _response );
              if (+_response.error === 0) {
                this.errorMessage += '  ' +  _response.message;
              } else {
                this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(_response.message);
              }
            }, (err) => {
              this.loading = false;
              console.log(err);
              if (err._body.type) {this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type); }
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

  public setBeneficiaryFunction(beneficiary: any) {
    this.newReceiver.nom = beneficiary.nom;
    this.newReceiver.prenom = beneficiary.prenom;
    this.newReceiver.telephone = this.receiverToFind;
    this.secondStepMode();
    console.log(this.newReceiver);
  }

  public firstStepMode() {
    this.clearSearch();
    this.receiverExist = true;
    this.commonServices.unSelectAllReceiversFunction();
  }
  public secondStepMode() {
    this.clearSearch();
    this.receiverStatus = '' + this.newReceiver.nom + ' ' + this.newReceiver.prenom + ', ' + this.newReceiver.telephone;
    this.createNewReceiver = true;
    // setTimeout(() => { this.amount2.nativeElement.focus(); this.amount2.nativeElement.focus(); }, 1000);
  }
  public clearAmount() {this.amount_depotCitizen = undefined; }
  public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }

  public clearSearch() {
    // this.amount_depotCitizen = undefined;
    // this.receivers = [];
    // this.receiverToFind = '';
    // this.newReceiver = new ReceiverClass('', '', '', '', 0, '', '', '');
    this.receiverExist = false;
    this.createNewReceiver = false;
    this.receiverStatus = '';
    this.loading = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.commission = [];
  }
}
