import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {UserDataService} from '../../../models/user-data';
import {CommonServices} from '../../../services/common.service';
import {CurrencyParams} from '../../../models/currency_params';
import {ActivatedRoute} from '@angular/router';
import {W2WVirementAccountService} from '../../../services/api/W2WVirementAccount.service';
import {ReceiverClass} from '../../../models/receiver-class';
import {GetCommissionsTTCService} from '../../../services/api/getCommissionsTTC.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  providers: [W2WVirementAccountService, GetCommissionsTTCService]
})
export class ParametersComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  loading = false;
  errorMessage = '';
  successMessage_1 = '';
  successMessage_2 = '';
  status = '';
  amountToReceiver: number;
  uoId_envoyeurForQR = 380686087517;
  uoId_beneficiaryFromQR = 43;
  commission = [];
s= '';
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public w2WVirementAccountService: W2WVirementAccountService,
              public getCommissionsTTCService: GetCommissionsTTCService) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      this.uoId_envoyeurForQR = +this.userDataService.getMyAccounts()['0'].uoId;
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      this.uoId_envoyeurForQR = +this.userDataService.getMyAccounts()['0'].uoId;
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

  public submitTransferCompteFunction() {
    if (this.uoId_beneficiaryFromQR && (+this.amountToReceiver >= 0.01)) {
      // if (!(this.uoId_beneficiaryFromQR === 'undefined')) {
      //   let _numTel_fromSelect2: string;
        // this.successMessage_1 = '';
        // this.successMessage_2 = '';
        this.errorMessage = '';
        this.loading = true;

        // console.log(this.myAccount);
        console.log(this.uoId_beneficiaryFromQR);
        // if (~(this.uoId_beneficiaryFromQR.indexOf(' '))) {
        //   _numTel_fromSelect2 = this.numTel_fromSelect2.split(', ')[1];
        // } else {
        //   _numTel_fromSelect2 = this.numTel_fromSelect2;
        // }
        // console.log(_numTel_fromSelect2);

        // const beneficiaire = <ReceiverClass>this.userDataService.getReceiverFromSelect2(_numTel_fromSelect2);
        // console.log(beneficiaire);

        // if (_numTel_fromSelect2) {
          this.getCommissionsTTCService.getCommission(this.amountToReceiver, 'W2W')
            .takeWhile(() => this.alive)
            .subscribe(result => {
              const response = this.commonServices.xmlResponseParcer_simple(result._body);
              console.dir(response);
              if (+response.error === 0) {
                this.commission.push(+response.commission);
                console.log(response.commission);

                // this.getAllListAccountService.getMyAccounts(_numTel_fromSelect2)
                //   .takeWhile(() => this.alive)
                //   .subscribe(result1 => {
                //     const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
                //     const _accounts = response1.accounts;
                //     let receiver_id: number;
                //     if (_accounts && _accounts.length) {
                //       receiver_id = _accounts['0'].id;
                //       console.log(receiver_id);
                //     }

                    /////////////////////////////
                    this.w2WVirementAccountService
                        .transferCompteStandart(this.amountToReceiver,
                                                response.commission,
                                                this.userDataService.getMyAccounts()['0'].uoId, // this.myAccount.id_account,
                                                this.uoId_beneficiaryFromQR)
                      .takeWhile(() => this.alive)
                      .subscribe(result2 => {
                        this.loading = false;
                        const _response = this.commonServices.xmlResponseParcer_simple(result2._body);

                        console.dir(_response);
                        if (+_response.error === 0) {
                          this.errorMessage = '';
                          this.successMessage_1 = response.message + ': ' + response.commission;
                          this.successMessage_2 = _response.message;
                        } else {
                          this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(_response.message);
                        }

                      }, (err) => {
                        this.loading = false;
                        console.log(err);
                        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
                        if (!this.errorMessage) {
                          this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
                        }
                      });
                    /////////////////////////////

                  // }, (err) => {
                  //   this.loading = false;
                  //   console.log(err);
                  //   this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
                  //   if (!this.errorMessage) {
                  //     this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
                  //   }
                  // });
              } else {
                this.loading = false;
                this.errorMessage = response.message + ': ' + response.commission;
                if (response.message) {
                  this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(response.message);
                }
                if (response.statusText) {
                  this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(response.statusText);
                }
              }

            }, (err) => {
              this.loading = false;
              console.log(err);
              if (err._body.type) {
                this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
              }
              if (err.statusText) {
                this.errorMessage += this.errorMessageHandlerService.getMessageEquivalent(err.statusText);
              }
            });
        // } else {
        //   this.loading = false;
        //   this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent('no cellulaire in the database');
        // }
      // } else {this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent('no cellulaire in the database'); }
    } else {return false; }
  }

  startScan() {

    // cordova.plugins.barcodeScanner.scan(
    //   function (result) {
    //     const s = 'Result: ' + result.text + '<br/>' +
    //       'Format: ' + result.format + '<br/>' +
    //       'Cancelled: ' + result.cancelled;
    //     window.document.getElementById('results').innerHTML = s;
    //     this.s = s;
    //   },
    //   function (error) {
    //     alert('Scanning failed: ' + error);
    //   }
    // );

  }

  public clearAmount() {this.amountToReceiver = undefined; }
  public clearBeneficiaryFromQR() {this.uoId_beneficiaryFromQR = undefined; }
}
