import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BeneficiaryClass} from '../../../../models/beneficiary-class';
import {VirementSicaService} from '../../../../services/api/virementSica.service';
import {CommonServices} from '../../../../services/common.service';
import {UserDataService} from '../../../../models/user-data';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {GetMyBeneficiariesService} from '../../../../services/api/getMyBeneficiaries.service';

@Component({
  selector: 'app-beneficiares',
  templateUrl: './beneficiares.component.html',
  styleUrls: ['./beneficiares.component.scss'],
  providers: [GetMyBeneficiariesService, VirementSicaService]
})
export class BeneficiaresComponent implements OnInit, OnDestroy {
  beneficiaries = [];
  _beneficiary = new BeneficiaryClass('', '', '', '', '', '', '');
  activeSelect: string;
  userRole = '';
  nomClient: string;
  alive = true;
  @Output() errorMessage = new EventEmitter<string>();
  @Output() beneficiary = new EventEmitter<BeneficiaryClass>();

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getMyBeneficiariesService: GetMyBeneficiariesService,
              public virementSicaService: VirementSicaService,
              public errorMessageHandlerService: ErrorMessageHandlerService) { }

  ngOnInit() {
    if (this.userDataService.getUser().uoId) {this.getMyBeneficiariesFunction();
    } else {setTimeout(() => {this.getMyBeneficiariesFunction(); }, 1000); }
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public getMyBeneficiariesFunction() {
    console.log(this.userDataService.getUser().uoId);
    this.getMyBeneficiariesService.getMyBeneficiaries(+this.userDataService.getUser().uoId)
      .takeWhile( () => this.alive)
      .subscribe((result) => {
        // console.log(result._body);

        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        console.log(response);
        this.beneficiaries = (response.beneficiaries) ? response.beneficiaries : [];

        if (response.beneficiaries && response.beneficiaries.length) {
          this.showNextBeneficiary(this.beneficiaries['0'].id);
          this.activeSelect = this.beneficiaries['0'].id;
        }

        this.nomClient = (this._beneficiary.nom) ? (this._beneficiary.nom) : '';
        this.nomClient += (this._beneficiary.prenom) ? (' ' + this._beneficiary.prenom) : '';
        console.log(this.beneficiaries);
      }, (err) => {
        console.log(err);
        const _errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        this.errorMessage.emit(_errorMessage);
        // if (!_errorMessage) {
        //   this.errorMessage.emit(this.errorMessageHandlerService._getMessageEquivalent(err._body));
        // }
      });
  }

  public showNextBeneficiary(userChoice: string) {
    console.log(userChoice);
    this._beneficiary = this.beneficiaries.find(x => x.id === userChoice);
    console.log(this._beneficiary);
    this.sendBeneficiary();
  }

  public sendBeneficiary() {
    this.beneficiary.emit(this._beneficiary);
  }
}
