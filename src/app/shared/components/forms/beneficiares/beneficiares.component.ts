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
    this.getMyBeneficiariesService.getMyBeneficiaries(+this.userDataService.getUser().uoId)
      .takeWhile( () => this.alive)
      .subscribe((result) => {

        const response = this.commonServices.xmlResponseParcer_complex( result._body );
        this.beneficiaries = (response.beneficiaries) ? response.beneficiaries : [];

        if (response.beneficiaries && response.beneficiaries.length) {
          this.showNextBeneficiary(this.beneficiaries['0'].id);
          this.activeSelect = this.beneficiaries['0'].id;
        }

        this.nomClient = (this._beneficiary.nom) ? (this._beneficiary.nom) : '';
        this.nomClient += (this._beneficiary.prenom) ? (' ' + this._beneficiary.prenom) : '';
       }, (err) => {
        console.log(err);
        const _errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        this.errorMessage.emit(_errorMessage);
       });
  }

  public showNextBeneficiary(userChoice: string) {
    this._beneficiary = this.beneficiaries.find(x => x.id === userChoice);
     this.sendBeneficiary();
  }

  public sendBeneficiary() {
    this.beneficiary.emit(this._beneficiary);
  }
}
