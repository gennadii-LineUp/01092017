import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {UserDataService} from '../../../models/user-data';
import {CommonServices} from '../../../services/common.service';
import {CurrencyParams} from '../../../models/currency_params';
import {ActivatedRoute} from '@angular/router';
import {W2WVirementAccountService} from '../../../services/api/W2WVirementAccount.service';
import {GetCommissionsTTCService} from '../../../services/api/getCommissionsTTC.service';

// declare var device;
// declare let navigator: any;
declare var cordova: any;

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
  idAccountEnvoyeur = 380686087517;
  idAccountBeneficiaryFromQR = undefined;
  commission = [];
  temp_str = '';
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public w2WVirementAccountService: W2WVirementAccountService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public cd: ChangeDetectorRef) {
    userDataService.myAccounts$.subscribe((myAccounts) => {
      console.log(myAccounts);
      console.log('hello');
      this.idAccountEnvoyeur = +this.userDataService.getMyAccounts()['0'].id_account;
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      this.idAccountEnvoyeur = +this.userDataService.getMyAccounts()['0'].id_account;
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

  startScan() {
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    console.log('touchend');
    cordova.plugins.barcodeScanner.scan(
      (result) => {
        const s = 'Result: ' + result.text + '<br/>';
        console.log(result.text);
        setTimeout(this.showQRdata(result.text), 100);
      },
      function (error) {
        alert('Scanning failed: ' + error);
      }
    );
  }

  showQRdata(data: string) {
    this.idAccountBeneficiaryFromQR = +data;
    console.log('from QR: ', this.idAccountBeneficiaryFromQR);
    this.cd.detectChanges();
  }

  public submitTransferCompteFunction() {
    if (this.idAccountBeneficiaryFromQR && (+this.amountToReceiver >= 0.01)) {
        // this.successMessage_1 = '';
        // this.successMessage_2 = '';
        this.errorMessage = '';
        this.loading = true;

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
                                                this.idAccountEnvoyeur,
                                                this.idAccountBeneficiaryFromQR)
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
    } else {return false; }
  }

  public clearAmount() {this.amountToReceiver = undefined; }
  public clearBeneficiaryFromQR() {this.idAccountBeneficiaryFromQR = undefined; }
}
