import { Component, OnInit, OnDestroy } from '@angular/core';
import {ReceiverClass} from '../../../../models/receiver-class';
import {UserDataService} from '../../../../models/user-data';
import {W2COrdreRetraitService} from '../../../../services/api/W2COrdreRetrait.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';
import {RegistrationClass} from '../../../../models/registration-class';
import {CreateNewAccountService} from '../../../../services/api/createNewAccount.service';
import {CurrencyParams} from '../../../../models/currency_params';
import {GetUOByCellularService} from '../../../../services/api/getUOByCellular.service';
declare let $: any;

@Component({
  selector: 'app-services-transfer-dargent',
  templateUrl: './transfer-dargent.component.html',
  styleUrls: ['./transfer-dargent.component.scss'],
  providers: [W2COrdreRetraitService, CreateNewAccountService, GetUOByCellularService]
})
export class TransferDargentComponent implements OnInit, OnDestroy {
  loading = false;
  profileAsAgent = this.userDataService.checkUserRole();
  sender = [];
  myAccount: any;
  newReceiver = new RegistrationClass('', '', 221, '', 'AUTO', 'AUTO', 'AUTO', 'AUTO', true);
  amountToReceiver: number;
  showReceiverInfo = false;
  successMessage_1 = '';
  successMessage_2 = '';
  errorMessage = '';
  alive = true;
  numTel_fromSelect2 = '';
  userRole = '';
  createNew = false;
  cellularToFind = '773336110 '; // 773151459
  citizenExist = false;
  beneficiaireFound: any;

  constructor(public userDataService: UserDataService,
              public w2COrdreRetraitService: W2COrdreRetraitService,
              public commonServices: CommonServices,
              public createNewAccountService: CreateNewAccountService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public getUOByCellularService: GetUOByCellularService) { }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    const profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(profil);

    switch (profil) {
      case 'citizen': {
        if (!this.userDataService.getCitizens().length) {this.userDataService.setCitizens(); }
        setTimeout(() => this.userDataService.setReceiversForSelect2(this.userDataService.getCitizens()), 500);
        break;
      }
      case 'client':
      case 'agent': {
        if (!this.userDataService.getClients().length) {this.userDataService.setClients(); }
        if (!this.userDataService.getCitizens().length) {this.userDataService.setCitizens(); }
        setTimeout(() => {
          this.userDataService.setCitizensClients((this.userDataService.getClients()).concat(this.userDataService.getCitizens()));
          this.userDataService.setReceiversForSelect2(this.userDataService.getCitizensClients());
          }, 900);
        break;
      }
      default:  console.log('=== there is a new type of user ! ===');
    }
    // this.select2F();
  }

  ngOnDestroy() {
    this.alive = false;
    // this.commonServices.removeEmptySelect2OnDestroy();
  }

  select2F() {
    $(() => {
      $('select').select2({
        language: {
          noResults: function() {
            return '<div>It seems we don’t have this number in the database. <br>New account have to be created.</div>';
          }// onclick="createNewUser()"
        },
        escapeMarkup: function (markup) {
          return markup;
        }
      });
    });
  }

  public setNewCitizen(newReceiver: RegistrationClass) {
    this.newReceiver = newReceiver;
    console.log(this.newReceiver );
  }

  public fillReceiverInfoFunction(myAccount: any, e: any) {
    // this.showReceiverInfo = false;
    this.clearSearch();
    this.myAccount = myAccount;
    // console.log(myAccount);
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].className = 'consult-user';
    }
    e.currentTarget.classList.add('active');

    // setTimeout(() => { this.showReceiverInfo = true; }, 500);
    this.showReceiverInfo = true;
    this.select2F();
  }

  public setSenderFunction(sender: any) {
    this.sender.push(sender);
    console.log(this.sender);
    this.profileAsAgent = false;
  }

  public discardReceiverInfoFunction() {
    const allItems: NodeListOf<Element> = window.document.querySelectorAll('div.consult-user');
    for (let i = 0; i < allItems.length; i++) {
      allItems[i].classList.remove('active');
    }
  }

  public findReceiverByTelephone() {
    this.loading = true;
    this.getUOByCellularService.getData(this.cellularToFind)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        const response = this.commonServices.xmlResponseParcer_simple(result._body);
        console.dir(response);
        this.loading = false;
        if (response.numTel && response.numTel.length) {
          this.beneficiaireFound = {nom: (response.nom) ? response.nom : undefined,
            prenom: (response.prenom) ? response.prenom : undefined,
            numTel: response.numTel,
            id: (response.id) ? response.id : undefined
          };
          this.newReceiver.nom = (response.nom) ? response.nom : undefined;
          this.newReceiver.prenom = (response.prenom) ? response.prenom : undefined;
          this.newReceiver.telephone = response.numTel;
          this.setBeneficiaryFunction({value: this.beneficiaireFound.numTel});
          console.log(this.beneficiaireFound);
          this.citizenExist = true;
        } else {
          // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          this.createNew = true;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public clearNumTel() {this.cellularToFind = undefined; }

  public setBeneficiaryFunction(beneficiary: any) {
    console.log(beneficiary);
    this.numTel_fromSelect2 = beneficiary.value;
    console.log(this.numTel_fromSelect2);
  }


  public submitTransferDargentFunction() {
    if (+this.amountToReceiver >= 0.01) {
      if (!this.createNew && this.numTel_fromSelect2) {
        this.makeTransaction();
      }
      if (this.createNew && this.newReceiver.nom && this.newReceiver.prenom && this.newReceiver.telephone) {
        this.newReceiver.mail = this.newReceiver.telephone;
        console.log(this.newReceiver);
            this.createNewAccountService.createNewAccount(this.newReceiver)
              .subscribe(result => {
                const response = this.commonServices.xmlResponseParcer_simple( result._body );
                console.dir( response );
                if (+response.error === 0
                  && response.message === 'Succès ! creation compte effectuée') {
                  console.log = response.message;
                  this.makeTransaction();
                } else {
                  this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
                }
              }, (err) => {
                this.loading = false;
                console.log(err);
                this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
                if (!this.errorMessage) {
                  this.errorMessage = this.errorMessageHandlerService._getMessageEquivalent(err._body);
                }
              });
      } else {return false; }
    }
  }

  public makeTransaction() {
    this.loading = true;
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    let beneficiaire: any;
    // if (!this.createNew) {
    //   beneficiaire = <ReceiverClass>this.userDataService.getReceiverFromSelect2(this.numTel_fromSelect2);
    //   console.log(beneficiaire);
    // } else {
      beneficiaire = new ReceiverClass(this.newReceiver.nom, this.newReceiver.prenom, this.newReceiver.telephone,
                                      'AUTO', 0, '', this.newReceiver.telephone, this.newReceiver.telephone, '', '', '');
      this.numTel_fromSelect2 = this.newReceiver.telephone;
    // }
    // console.log(this.numTel_fromSelect2);
    // console.log(beneficiaire);

    if (this.numTel_fromSelect2) {
      this.w2COrdreRetraitService.transferDargent(this.myAccount.telephone, this.amountToReceiver, beneficiaire)
        .takeWhile(() => this.alive)
        .subscribe(result => {
          this.loading = false;
          // console.log(result._body);
          const response = this.commonServices.xmlResponseParcer_simple(result._body);

          console.dir(response);
          if (+response.error === 0) {
            this.showReceiverInfo = false;
            this.clearSearch();
            this.successMessage_1 = response.message + ';';
            this.successMessage_2 = 'code: ' + response.code;
            this.discardReceiverInfoFunction();
          } else {
            this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          }

        }, (err) => {
          this.loading = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    } else {
      this.loading = false;
      this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent('no cellulaire in the database');
    }
  }

  public clearReceiver(field: string) {this.newReceiver[field] = undefined; }

  public clearAmount() {this.amountToReceiver = undefined; }
  public clearSearch() {
    this.amountToReceiver = undefined;
    this.newReceiver = new RegistrationClass('', '', 221, '', 'AUTO', 'AUTO', 'AUTO', 'AUTO', true);
    this.beneficiaireFound = {};
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.errorMessage = '';
    this.createNew = false;
    this.citizenExist = false;
  }



}
