import {Component, OnDestroy, OnInit} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {ErrorMessageHandlerService} from '../../../services/error-message-handler.service';
import {UserDataService} from '../../../models/user-data';
import {CommonServices} from '../../../services/common.service';
import {CurrencyParams} from '../../../models/currency_params';
import {ActivatedRoute} from '@angular/router';
import {W2WVirementAccountService} from '../../../services/api/W2WVirementAccount.service';
import {GetCommissionsTTCService} from '../../../services/api/getCommissionsTTC.service';
import {ReceiverClass} from '../../../models/receiver-class';

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
  myAccount: any;
  choseAccount_mode = true;
  showQRCode_mode = false;
  confirmation_mode = false;
  amountToReceiver: number;
  receiver_idAccount = 380686087517;
  receiver_nomPrenom = '';
  beneficiaryFromQR_idAccount = undefined;
  beneficiaryFromQR_nomPrenom = '';
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
      // console.log(myAccounts);
      // this.receiver_idAccount = +this.userDataService.getMyAccounts()['0'].id_account;
    });
  }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    this.goto_choseAccount_mode();
    if ((this.userDataService.getMyAccounts()).length) {
      // this.receiver_idAccount = +this.userDataService.getMyAccounts()['0'].id_account;
    } else {
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    // console.log(this.profil);
  }

  ngOnDestroy() {
    this.alive = false;
    this.showQRCode_mode = false;
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
    const qr_data = data.split(';');
    console.log(qr_data);
    let nom = (qr_data[1] && qr_data[1].length) ? qr_data[1] : ' ';
    let prenom = (qr_data[2] && qr_data[2].length) ? qr_data[2] : ' ';
    this.beneficiaryFromQR_idAccount = +qr_data[0];

    // console.log('from QR - beneficiaryFromQR_idAccount: ', this.beneficiaryFromQR_idAccount);
    this.beneficiaryFromQR_nomPrenom = '' + nom + ' ' + prenom;
    this.cd.detectChanges();
  }

  public fillReceiverInfoFunction(myAccount: ReceiverClass, e: any) {
    // this.showReceiverInfo = false;
    // this.clearSearch();
    this.myAccount = myAccount;
    this.receiver_idAccount = +myAccount.id_account;
    this.receiver_nomPrenom = myAccount.nom + ';' + myAccount.prenom;
    // console.log(this.receiver_nomPrenom);
    console.log(myAccount);
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    e.currentTarget.classList.add('active');

    // setTimeout(() => { this.showReceiverInfo = true; }, 500);
    this.goto_showQRCode_mode();
  }

  public submitTransferCompteFunction() {
    if (this.beneficiaryFromQR_idAccount && (+this.amountToReceiver >= 0.01)) {
        // this.successMessage_1 = '';
        // this.successMessage_2 = '';
        this.errorMessage = '';
        this.loading = true;
        this.goto_showQRCode_mode();
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
                                                this.receiver_idAccount,
                                                this.beneficiaryFromQR_idAccount)
                      .takeWhile(() => this.alive)
                      .subscribe(result2 => {
                        this.loading = false;
                        const _response = this.commonServices.xmlResponseParcer_simple(result2._body);

                        console.dir(_response);
                        if (+_response.error === 0) {
                          this.errorMessage = '';
                          this.successMessage_1 = response.message + ': ' + response.commission;
                          this.successMessage_2 = _response.message + '. ' + this.beneficiaryFromQR_nomPrenom + ' est le bénéficiaire.';
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

  public goto_choseAccount_mode() {
    this.amountToReceiver = undefined;
    this.receiver_idAccount = undefined;
    this.beneficiaryFromQR_idAccount = undefined;
    this.beneficiaryFromQR_nomPrenom = undefined;
    this.choseAccount_mode = true;
    this.showQRCode_mode = false;
    this.confirmation_mode = false;
  }
  public goto_showQRCode_mode() {
    this.choseAccount_mode = false;
    this.showQRCode_mode = true;
    this.confirmation_mode = false;
  }
  public goto_confirmation_mode() {
    this.choseAccount_mode = false;
    this.showQRCode_mode = false;
    this.confirmation_mode = true;
  }

  public clearAmount() {this.amountToReceiver = undefined; }
  public clearBeneficiaryFromQR() {
    this.beneficiaryFromQR_idAccount = undefined;
    this.beneficiaryFromQR_nomPrenom = undefined;
  }
}
