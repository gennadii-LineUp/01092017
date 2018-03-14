import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetAllListAccountService} from '../../../../services/api/getAllListAccount.service';
import {GetCommercantsPaysService} from '../../../../services/api/getCommercantsPays.service';
import {W2WVirementAccountService} from '../../../../services/api/W2WVirementAccount.service';
import {GetCommissionsTTCService} from '../../../../services/api/getCommissionsTTC.service';
import {GetFacturiersPaysService} from '../../../../services/api/getFacturiersPays.service';
import {GetAllCitizenService} from '../../../../services/api/getAllCitizen.service';
import {CommonServices} from '../../../../services/common.service';
import {ErrorMessageHandlerService} from '../../../../services/error-message-handler.service';
import {UserDataService} from '../../../../models/user-data';
import {CurrencyParams} from '../../../../models/currency_params';
import {ReceiverClass} from '../../../../models/receiver-class';
import {Select2optionClass} from '../../../../models/select2option-class';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-services-manage-admin-citizen',
  templateUrl: './manage-admin-citizen.component.html',
  styleUrls: ['./manage-admin-citizen.component.scss'],
  providers: [GetAllCitizenService]
})
export class ManageAdminCitizenComponent implements OnInit, OnDestroy {
  userRole = '';
  profil = '';
  citizens = [];
  _citizens = [];
  loading_nom = false;
  loading_prenom = false;
  loading_mail = false;
  loading_phone = false;
  _i: number;
  readOnly_nom = true;
  readOnly_prenom = true;
  readOnly_phone = true;
  editableRow = {i: undefined, name: undefined};
  errorMessage = '';
  numTel_fromSelect2 = '';
  alive = true;

  constructor(public userDataService: UserDataService,
              public commonServices: CommonServices,
              public getAllCitizenService: GetAllCitizenService,
              public errorMessageHandlerService: ErrorMessageHandlerService,
              private activateRoute: ActivatedRoute,
              public currencyParams: CurrencyParams) { }

  ngOnInit() {
    this.activateRoute.parent.url
      .takeWhile(() => this.alive)
      .subscribe(resp =>  this.userRole = resp['0'].path);

    if ((this.userDataService.getMyAccounts()).length) {
      // console.log('=== MyAccounts\' length ' + this.userDataService.getMyAccounts().length);
    } else {
      // console.log('=== MyAccounts\' is empty ===');
      this.userDataService.setMyAccounts();
    }

    this.profil = ((<any>this.userDataService.getUser).profil) ? (<any>this.userDataService.getUser).profil :
      localStorage.getItem('profil');
    console.log(this.profil);

    this.loadCitizens();

  }

  ngOnDestroy() {
    this.alive = false;
  }

  loadCitizens() {
      this.citizens = [];
      this.getAllCitizenService.getAllCitizens()
        .takeWhile(() => this.alive)
        .subscribe(result => {
          const response = (this.commonServices.xmlResponseParcer_complex(result._body)).uos;
          this.citizens = (response.length) ? response : [];
          this._citizens = this.citizens;
          console.log(this.citizens);
          this.userDataService.setReceiversForSelect2(this.citizens);
        }, (err) => {
          console.log(err);
          this.errorMessage = this.errorMessageHandlerService.getMessageEquivalent(err._body.type);
        });
  }

  findCitizen() {
    let temp = [];
    const arr = this.userDataService.getReceiversForSelect2();

    if (this.numTel_fromSelect2.length > 0) {
      arr.forEach((obj) => {
        if (~(obj.text.toLowerCase()).indexOf(this.numTel_fromSelect2.toLowerCase())) {
          this.citizens = this._citizens;
          this.citizens.forEach(citizen => {
            if (citizen.numTel === obj.id) {
              temp.push(citizen);
            }
          });
        }
      });
      this.citizens = temp;
    } else {
      this.citizens = this._citizens;
    }
  }

  setEditableRow(i: number, name: string) {
    this._i = i;
    this.editableRow.i = i;
    this.editableRow.name = name;
  }
  public submitFunction(name: string, i: number) {
    this.loading_nom = true;
    this.editableRow.i = undefined;
    this.editableRow.name = undefined;
    setTimeout(() => { this.loading_nom = false; }, 1000);
    console.log(name, i);
  }

}
