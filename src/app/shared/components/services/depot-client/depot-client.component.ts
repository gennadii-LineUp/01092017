import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {UserDataService} from '../../../../models/user-data';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {V2WDepotClientTransactionService} from '../../../../services/api/V2WDepotClientTransaction.service';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';
import {ReceiverClass} from '../../../../models/receiver-class';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';
import {RegistrationClass} from '../../../../models/registration-class';
import {CreateNewAccountService} from '../../../../services/api/createNewAccount.service';
import {GetCustomerByCellularService} from '../../../../services/api/getCustomerByCellular.service';
import {GetContactOfCustomerService} from '../../../../services/api/getContactOfCustomer.service';
import {PassportClass} from '../../../../models/passport-class';
import {GetIdentifiantsUOService} from '../../../../services/api/getIdentifiantsUO.service';

@Component({
  selector: 'app-services-depot-client',
  templateUrl: './depot-client.component.html',
  styleUrls: ['./depot-client.component.scss'],
  providers: [GetCommissionsTTCService, V2WDepotClientTransactionService, GetCustomerByCellularService,
              CreateNewAccountService, GetContactOfCustomerService, GetIdentifiantsUOService]
})
export class DepotClientComponent implements OnInit, OnDestroy {
  amount_depotClient: number;
  successMessage = '';
  loading = false;
  requestIsSent = false;
  errorMessage = '';
  newReceiver = new RegistrationClass('', '', 221, '', 'AUTO', 'AUTO', 'AUTO', 'AUTO', true);
  receiverExist = false;
  createNewReceiver = true;
  createNewReceiver_mobile_amount = true;
  clientDoesntExist = false;
  cellularToFind = '775419345';
  beneficiaireFound: any;
  receiverStatus = '';
  receiverToFind = '';
  successMessage_1 = '';
  successMessage_2 = '';
  additionalCaption = '  (enregistré)';
  client = {id: undefined, nom: undefined, prenom: undefined, numTel: undefined};
  commission = [];
  envoyeur = new EnvoyeurClass('KANE', 'MOMAR', '773151459', 'DAKAR', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2017');
  envoyeur_default: EnvoyeurClass;
  _envoyeur_default = {};
  checkboxSameBenef = true;
  receivers = [new ReceiverClass('Tom', 'Henks', '123456789', '15', 1, 'citizen', '', '', '', '', ''),
              new ReceiverClass('Ann', 'Hattaway', '+38(123)4567890', '2', 2, 'citizen', '', '', '', '', ''),
              new ReceiverClass('Bon', 'Jovi', '12-345-67-89', '24', 3, 'citizen', '', '', '', '', '')];
  client_fromSelect2 = '';
  envoyeur_documents = Array<PassportClass>(0);
  userRole = '';
  alive = true;

  @ViewChild('amount_mobile') amount_input_mobile: any;


  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public v2WDepotClientTransactionService: V2WDepotClientTransactionService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public getCustomerByCellularService: GetCustomerByCellularService,
              public createNewAccountService: CreateNewAccountService,
              public getContactOfCustomerService: GetContactOfCustomerService,
              public getIdentifiantsUOService: GetIdentifiantsUOService) { }

  ngOnInit() {
    this.firstStepMode();
    // this.secondStepMode();
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if (!(this.userDataService.getMyAccounts()).length) {
      this.userDataService.setMyAccounts();
    }

  }

  ngOnDestroy() {
    this.alive = false;
  }


  public clearAmount() {this.amount_depotClient = undefined; }

  public submitDepotClient() {
    if (!this.requestIsSent
          && (+this.amount_depotClient >= 0.01)
          && this.client_fromSelect2
          && this.envoyeur.nom && this.envoyeur.prenom && this.envoyeur.cellulaire) {

      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.requestIsSent = true;
      this.getCommissionsTTCService.getCommission(this.amount_depotClient, 'C2W')
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const response = this.commonServices.xmlResponseParcer_simple(result._body);

          if (+response.error === 0) {
            // this.errorMessage = response.message + ': ' + response.commission;
            this.commission.push(+response.commission);
            /////////////////////////////
            this.v2WDepotClientTransactionService.makeDepotClient(this.client.numTel,
              +this.amount_depotClient,
              +response.commission,
              this.envoyeur)
              .subscribe(_result => {
                this.loading = false;
                const _response = this.commonServices.xmlResponseParcer_simple(_result._body);

                if (+_response.error === 0) {
                  this.successMessage_1 = response.message + ': ' + response.commission +
                    ' pour le montant ' + this.amount_depotClient + ' ' + this.currencyParams.curXOF();
                  this.successMessage_2 = _response.message;
                  this.firstStepMode();
                } else {
                  this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(_response.message);
                }
                this.requestIsSent = false;
              }, (err) => {
                this.loading = false;
                this.requestIsSent = false;
                console.log(err);
                if (err._body.type) {
                  this.errorMessage += '  ' + this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
                }
              });

            /////////////////////////////
          } else {
            this.requestIsSent = false;
            this.loading = false;
            this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          }

        }, (err) => {
          this.loading = false;
          this.requestIsSent = false;
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
    } else {return false; }
  }

  public findReceiverByTelephone() {
    this.loading = true;
    this.getCustomerByCellularService.getCustomerByCellular(this.cellularToFind)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        const response = this.commonServices.xmlResponseParcer_simple(result._body);
         this.client.id = response.id;
        this.client.nom = (response.nom) ? (response.nom) : '';
        this.client.prenom = (response.prenom) ? (response.prenom) : '';
        this.client.numTel = (response.numTel) ? (response.numTel) : '';

        if (response && response.id) {
          // ====================================
          this.getIdentifiantsUOService.getIdentifiantsUOService(response.id)
            .takeWhile(() => this.alive)
            .subscribe(result1 => {
              const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
              this.findContactsOfClient(response.id);

              if (+response1.error === 0 && response1.identifiant && response1.identifiant.length) {
                this.envoyeur_documents = response1.identifiant;
                // this.setBeneficiaryFunction({value: this.beneficiaireFound.numTel});
              } else {
                this.loading = false;
                // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
                // this.clientDoesntExist = true;
              }
            }, (err1) => {
              this.loading = false;
              console.log(err1);
              this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err1._body.type);
            });
          // ====================================
        } else {
          this.loading = false;
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          // this.clientDoesntExist = true;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public findContactsOfClient(uoId: string) {
    // this.loading = true;
    this.getContactOfCustomerService.getContactOfCustomer(uoId)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        this.loading = false;
        const response = this.commonServices.xmlResponseParcer_simple(result._body);
        if (+response.error === 0) {
          this.beneficiaireFound = {nom: (response.nomContact) ? response.nomContact : undefined,
            prenom: (response.prenomContact) ? response.prenomContact : undefined,
            numTel: response.telephoneContact ? response.telephoneContact : undefined,
            id: (response.id) ? response.id : undefined
          };
          this.setBeneficiaryFunction({value: this.beneficiaireFound.numTel});
        } else {
          this.loading = false;
          // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          // this.clientDoesntExist = true;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public setNewClient(newReceiver: RegistrationClass) {
    this.newReceiver = newReceiver;
  }
  public createNewCitizenFunction() {
    if (this.clientDoesntExist && this.newReceiver.nom && this.newReceiver.prenom && this.newReceiver.telephone) {
      this.createNewAccountService.createNewAccount(this.newReceiver)
        .subscribe(result => {
          const response = this.commonServices.xmlResponseParcer_simple( result._body );
          if (+response.error === 0
            && response.message === 'Succès ! creation compte effectuée') {
            this.beneficiaireFound = {nom: (this.newReceiver.nom) ? this.newReceiver.nom : undefined,
              prenom: (this.newReceiver.prenom) ? this.newReceiver.prenom : undefined,
              numTel: this.newReceiver.telephone,
              id: undefined
            };
            this.setBeneficiaryFunction({value: this.beneficiaireFound.numTel});
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

  public setBeneficiaryFunction(beneficiary: any) {
    this.client_fromSelect2 = beneficiary.value;
    this.receiverToFind = this.client.numTel;
    this.secondStepMode();
  }

  public firstStepMode() {
    this.clearSearch();
    this.receiverExist = true;
    this.client_fromSelect2 = ';';
    this.amount_depotClient = undefined;
    this.commonServices.unSelectAllReceiversFunction();
  }
  public secondStepMode() {
    this.clearSearch();
    // const beneficiaire = this.userDataService.getReceiverFromSelect2(this.client_fromSelect2);
    const addr = (this.beneficiaireFound.address) ? this.beneficiaireFound.address : 'undefined';
    this.envoyeur_default = new EnvoyeurClass(this.beneficiaireFound.nom, this.beneficiaireFound.prenom,
                                              this.beneficiaireFound.numTel, addr, '', 'SEN', '', '', '');
    this._envoyeur_default = Object.assign({}, this.envoyeur_default);
    this.receiverStatus = (this.client.nom) ? (this.client.nom) : '';
    this.receiverStatus += (this.client.prenom) ? (' ' + this.client.prenom) : '';
    this.successMessage_1 = '';
    this.successMessage_2 = '';
    this.createNewReceiver = true;
    this.createNewReceiver_mobile_amount = true;
    setTimeout(() => { this.amount_input_mobile.nativeElement.focus(); }, 10);
  }

  public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }
  public clearNumTel() {this.cellularToFind = undefined; }

  private setEnvoyeurFromForm(envoyeur: EnvoyeurClass) {
    this.envoyeur = envoyeur;
    if (this.envoyeur.nom === (<EnvoyeurClass>this._envoyeur_default).nom
      && this.envoyeur.prenom === (<EnvoyeurClass>this._envoyeur_default).prenom
      && this.envoyeur.cellulaire === (<EnvoyeurClass>this._envoyeur_default).cellulaire) {
      this.checkboxSameBenef = true;
    } else {this.checkboxSameBenef = false; }
  }

  public clearSearch() {
    this.receiverExist = false;
    this.createNewReceiver = false;
    this.receiverStatus = '';
    this.loading = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.commission = [];
  }
show() {
}
  public setDeposantSameAsBeneficiary(e) {
    this.checkboxSameBenef = !this.checkboxSameBenef;
    this.envoyeur = new EnvoyeurClass('', '', '', '', '', 'SEN', '', '', '');
    if (this.checkboxSameBenef) {
      this.envoyeur_default = new EnvoyeurClass((<EnvoyeurClass>this._envoyeur_default).nom,
        (<EnvoyeurClass>this._envoyeur_default).prenom,
        (<EnvoyeurClass>this._envoyeur_default).cellulaire,
        (<EnvoyeurClass>this._envoyeur_default).addresse,
        (<EnvoyeurClass>this._envoyeur_default).id_type,
        (<EnvoyeurClass>this._envoyeur_default).id_pays,
        (<EnvoyeurClass>this._envoyeur_default).id_valeur,
        (<EnvoyeurClass>this._envoyeur_default).id_debut,
        (<EnvoyeurClass>this._envoyeur_default).id_fin);
      // this.envoyeur_default = Object.assign({}, this.envoyeur_default);

      // this.envoyeur.nom = (<EnvoyeurClass>this._envoyeur_default).nom;
      // this.envoyeur.prenom = (<EnvoyeurClass>this._envoyeur_default).prenom;
      // this.envoyeur.cellulaire = (<EnvoyeurClass>this._envoyeur_default).cellulaire;
    } else {
      this.envoyeur_default = new EnvoyeurClass('', '', '', '', '', 'SEN', '', '', '');
    }
  }

  public clearDefaultUser() {
    this.checkboxSameBenef = false;
    this.envoyeur_default = new EnvoyeurClass('', '', '', '', '', 'SEN', '', '', '');
  }
}
