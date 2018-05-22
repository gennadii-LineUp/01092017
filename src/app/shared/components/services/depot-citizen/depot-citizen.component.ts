import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {EnvoyeurClass} from '../../../../models/envoyeur-class';
import {C2WDepotTransactionService} from '../../../../services/api/C2WDepotTransaction.service';
import 'rxjs/add/operator/takeWhile';
import {ActivatedRoute} from '@angular/router';
import {CurrencyParams} from '../../../../models/currency_params';
import {RegistrationClass} from '../../../../models/registration-class';
import {CreateNewAccountService} from '../../../../services/api/createNewAccount.service';
import {GetCitizenByCellularService} from '../../../../services/api/getCitizenByCellular.service';
import {GetIdentifiantsUOService} from '../../../../services/api/getIdentifiantsUO.service';
import {PassportClass} from '../../../../models/passport-class';
declare var $: any;

@Component({
  selector: 'app-services-depot-citizen',
  templateUrl: './depot-citizen.component.html',
  styleUrls: ['./depot-citizen.component.scss'],
  providers: [GetCommissionsTTCService, C2WDepotTransactionService, GetCitizenByCellularService,
              CreateNewAccountService, GetIdentifiantsUOService]
})
export class DepotCitizenComponent implements OnInit, OnDestroy {
  successMessage = '';
  loading = false;
  errorMessage = '';
  receiverExist = false;
  requestIsSent = false;
  createNewReceiver = true;
  createNewReceiver_mobile_amount = true;
  receiverStatus = '';
  receiverToFind = '';
  cellularToFind = '7722222222';
  newReceiver = new RegistrationClass('', '', 221, '', 'AUTO', 'AUTO', 'AUTO', 'AUTO', true);
  beneficiaireFound: any;
  amount_depotCitizen: number;
  successMessage_1 = '';
  successMessage_2 = '';
  commission = [];
  envoyeur = new EnvoyeurClass('KANE', 'MOMAR', '773151459', 'DAKAR', 'CNI', 'SEN', '1619198107350', '01/01/2016', '01/01/2017');
  envoyeur_default: EnvoyeurClass;
  _envoyeur_default = {};
  envoyeur_documents = Array<PassportClass>(0);
  citizen_fromSelect2 = '';
  additionalCaption = '  (enregistré)';
  userRole = '';
  checkboxSameBenef = true;
  citizenDoesntExist = false;
  alive = true;

  @ViewChild('amount_mobile') amount_input_mobile: any;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              public getCommissionsTTCService: GetCommissionsTTCService,
              public c2WDepotTransactionService: C2WDepotTransactionService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams,
              public getCitizenByCellularService: GetCitizenByCellularService,
              public createNewAccountService: CreateNewAccountService,
              public getIdentifiantsUOService: GetIdentifiantsUOService) { }

  ngOnInit() {
    this.firstStepMode();
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);
    // const select2 = <HTMLCollection>window.document.getElementsByClassName('select2-container select2-container--default');
    // if (select2 && select2['0'] && select2['0'].style) {
    //   select2['0'].style.cssText = 'select2-container select2-container--default select2-container--close';
    // }

    // console.log($);
  }

  ngOnDestroy() {
    this.alive = false;
    // this.commonServices.removeEmptySelect2OnDestroy();
  }


  public submitDepotSitizen() {
    if (!this.requestIsSent
        &&(+this.amount_depotCitizen >= 0.01)
        && this.citizen_fromSelect2
        // && (this.envoyeur.id_fin && this.envoyeur.id_debut
        // && this.envoyeur.id_type && this.envoyeur.id_pays && this.envoyeur.id_valeur)
        && this.envoyeur.nom && this.envoyeur.prenom && this.envoyeur.cellulaire) {
      // console.log(this.amount_depotCitizen + '  to send');
      // console.dir(this.commonServices.getSelectedReceivers());

      this.loading = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.requestIsSent = true;
      this.getCommissionsTTCService.getCommission(this.amount_depotCitizen, 'C2W')
        .takeWhile(() => this.alive)
        .subscribe(result => {
          console.log(result._body);
          const response = this.commonServices.xmlResponseParcer_simple(result._body);

          console.dir(response);
          if (+response.error === 0) {
            // this.errorMessage = response.message + ': ' + response.commission;
            this.commission.push(+response.commission);
            console.log(this.commission);
            /////////////////////////////
            this.c2WDepotTransactionService.makeDepotSitizen(this.beneficiaireFound.numTel,
              +this.amount_depotCitizen, +response.commission, this.envoyeur)
              .subscribe(_result => {
                this.loading = false;
                console.log(_result._body);
                const _response = this.commonServices.xmlResponseParcer_simple(_result._body);

                console.dir(_response);
                if (+_response.error === 0) {
                  this.successMessage_1 = response.message + ': ' + response.commission +
                    ' pour le montant ' + this.amount_depotCitizen + ' ' + this.currencyParams.curXOF();
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

  public setBeneficiaryFunction(beneficiary: any) {
    // console.log(beneficiary);
    this.citizen_fromSelect2 = beneficiary.value;
    this.receiverToFind = this.citizen_fromSelect2;
    // console.log(this.citizen_fromSelect2);
    this.secondStepMode();
  }

  public firstStepMode() {
    this.clearSearch();
    this.amount_depotCitizen = undefined;
    this.receiverExist = true;
    this.citizen_fromSelect2 = '';
    this.commonServices.unSelectAllReceiversFunction();
  }
  public secondStepMode() {
    this.clearSearch();
    // const beneficiaire = this.userDataService.getReceiverFromSelect2(this.citizen_fromSelect2);
    const addr = (this.beneficiaireFound.address) ? this.beneficiaireFound.address : undefined;
    this.envoyeur_default = new EnvoyeurClass(this.beneficiaireFound.nom,
                                              this.beneficiaireFound.prenom,
                                              this.beneficiaireFound.numTel,
                                              addr, '', 'SEN', '', '', '');
    this._envoyeur_default = Object.assign({}, this.envoyeur_default);
    this.receiverStatus = (this.beneficiaireFound.nom) ? (this.beneficiaireFound.nom) : '';
    this.receiverStatus += (this.beneficiaireFound.prenom) ? (' ' + this.beneficiaireFound.prenom) : '';
    // this.receiverStatus += (beneficiaire.nom || beneficiaire.prenom) ? (', ') : '';
    // this.receiverStatus += (beneficiaire.telephone) ? (beneficiaire.telephone) : '';
    this.createNewReceiver = true;
    this.createNewReceiver_mobile_amount = true;
    setTimeout(() => { this.amount_input_mobile.nativeElement.focus(); }, 10);
    this.successMessage_1 = '';
    this.successMessage_2 = '';
  }

  private setEnvoyeurFromForm(envoyeur: EnvoyeurClass) {
    this.envoyeur = envoyeur;
    console.log(this.envoyeur);
    console.log(this.envoyeur.nom + ' - ' + (<EnvoyeurClass>this._envoyeur_default).nom);
    console.log(this.envoyeur.prenom + ' - ' + (<EnvoyeurClass>this._envoyeur_default).prenom);
    console.log(this.envoyeur.cellulaire + ' - ' + (<EnvoyeurClass>this._envoyeur_default).cellulaire);
    if (this.envoyeur.nom === (<EnvoyeurClass>this._envoyeur_default).nom
      && this.envoyeur.prenom === (<EnvoyeurClass>this._envoyeur_default).prenom
      && this.envoyeur.cellulaire === (<EnvoyeurClass>this._envoyeur_default).cellulaire) {
      this.checkboxSameBenef = true;
      console.log(this.checkboxSameBenef);
    } else {this.checkboxSameBenef = false; console.log(this.checkboxSameBenef); }
console.log('------------------------------');
  }

  public setNewCitizen(newReceiver: RegistrationClass) {
    this.newReceiver = newReceiver;
    console.log(this.newReceiver );
  }

  public createNewCitizenFunction() {
    if (this.citizenDoesntExist && this.newReceiver.nom && this.newReceiver.prenom && this.newReceiver.telephone) {
      this.createNewAccountService.createNewAccount(this.newReceiver)
        .subscribe(result => {
          const response = this.commonServices.xmlResponseParcer_simple( result._body );
          console.dir( response );
          if (+response.error === 0
            && response.message === 'Succès ! creation compte effectuée') {
            console.log = response.message;
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
  public findReceiverByTelephone() {
    this.loading = true;
    this.getCitizenByCellularService.getCitizenByCellular(this.cellularToFind)
      .takeWhile(() => this.alive)
      .subscribe(result => {
        const response = this.commonServices.xmlResponseParcer_simple(result._body);
        if (response && response.id) {
          // ====================================
          this.getIdentifiantsUOService.getIdentifiantsUOService(response.id)
            .takeWhile(() => this.alive)
            .subscribe(result1 => {
              const response1 = this.commonServices.xmlResponseParcer_complex(result1._body);
              console.dir(response1);

              if (+response1.error === 0 && response1.identifiant && response1.identifiant.length) {
                this.envoyeur_documents = response1.identifiant;
                this.beneficiaireFound = {
                      nom: (response.nom) ? response.nom : undefined,
                      prenom: (response.prenom) ? response.prenom : undefined,
                      numTel: response.numTel,
                      id: (response.id) ? response.id : undefined
                };
                this.setBeneficiaryFunction({value: this.beneficiaireFound.numTel});
              } else {
                this.loading = false;
                // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
                this.citizenDoesntExist = true;
              }
            }, (err) => {
              this.loading = false;
              console.log(err);
              this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
            });

          // ====================================
        } else if (response.numTel && response.numTel.length) {
          this.beneficiaireFound = {nom: (response.nom) ? response.nom : undefined,
                                    prenom: (response.prenom) ? response.prenom : undefined,
                                    numTel: response.numTel,
                                    id: (response.id) ? response.id : undefined
          };
          this.setBeneficiaryFunction({value: this.beneficiaireFound.numTel});
        } else {
          this.loading = false;
          // this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(response.message);
          this.citizenDoesntExist = true;
        }
      }, (err) => {
        this.loading = false;
        console.log(err);
        this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
      });
  }

  public setDeposantSameAsBeneficiary(e) {
    this.checkboxSameBenef = !this.checkboxSameBenef;
    console.log(this.checkboxSameBenef);
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
    // console.log(this._envoyeur_default);
    console.log(this.envoyeur);
  }
  public clearAmount() {this.amount_depotCitizen = undefined; }
  public clearNumTel() {this.cellularToFind = undefined; }
  public clearEnvoyeur(field: string) {this.envoyeur[field] = undefined; }

  public clearSearch() {
    // this.amount_depotCitizen = undefined;
    // this.receivers = [];
    // this.receiverToFind = '';
    // this.newReceiver = new ReceiverClass('', '', '', '', 0, '', '', '', '', '', '');
    this.receiverExist = false;
    this.createNewReceiver = false;
    this.receiverStatus = '';
    this.loading = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.commission = [];
  }

  public clearDefaultUser() {
    this.checkboxSameBenef = false;
    this.envoyeur_default = new EnvoyeurClass('', '', '', '', '', 'SEN', '', '', '');
  }

}
