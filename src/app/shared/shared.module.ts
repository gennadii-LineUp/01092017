import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../services/routing.module';
import {HeaderGeneralComponent} from './components/header/header-general/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { HeaderLogedInComponent } from './components/header/header-loged-in/header-loged-in.component';
import {AboutUsComponent} from './components/menu-top/about-us/aboutus.component';
import {TermsComponent} from './components/menu-top/terms/terms.component';
import {FaqComponent} from './components/menu-top/faq/faq.component';
import {PrivacyPolicyComponent} from './components/menu-top/privacy-policy/privacy-policy.component';
import {CancellationComponent} from './components/menu-top/cancellation/cancellation.component';
import {RefundPolicyComponent} from './components/menu-top/refund-policy/refund-policy.component';
import { HeaderUsersComponent } from './components/header/header-users/header-users.component';
import { HeaderCitizenComponent } from './components/header/header-citizen/header-citizen.component';
import { HeaderCustomerComponent } from './components/header/header-customer/header-customer.component';
import { NavbarForDeleteComponent } from './components/navbar-for-delete/navbar-for-delete.component';
import { VirementsVersBanqueComponent } from './components/services/virements-vers-banque/virements-vers-banque.component';
import { ServicesAgentComponent } from './components/services/services/services-agent/services-agent.component';
import { ServicesCustCitizComponent } from './components/services/services/services-cust-citiz/services-cust-citiz.component';
import { ConsultationSoldeComponent } from './components/services/consultation-solde/consultation-solde.component';
import { DepotCitizenComponent } from './components/services/depot-citizen/depot-citizen.component';
import { DepotClientComponent } from './components/services/depot-client/depot-client.component';
import { RetraitCodeComponent } from './components/services/retrait-code/retrait-code.component';
import { ManageAdminCitizenComponent } from './components/services/manage-admin-citizen/manage-admin-citizen.component';
import { TransferDargentComponent } from './components/services/transfer-dargent/transfer-dargent.component';
import { TransferCompteComponent } from './components/services/transfer-compte/transfer-compte.component';
import { ConsultationOperationsComponent } from './components/services/consultation-operations/consultation-operations.component';
import { GeolocalisationAgentComponent } from './components/services/geolocalisation-agent/geolocalisation-agent.component';
import { BankToWalletComponent } from './components/services/bank-to-wallet/bank-to-wallet.component';


@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule, AppRoutingModule,
  ],
  declarations: [
    HeaderGeneralComponent, HeaderUsersComponent, HeaderCitizenComponent, HeaderCustomerComponent,
    FooterComponent,
    UserMenuComponent,
    HeaderLogedInComponent,
    AboutUsComponent,
    TermsComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    CancellationComponent,
    RefundPolicyComponent,
    NavbarForDeleteComponent,
    ServicesAgentComponent, ServicesCustCitizComponent,
    ConsultationSoldeComponent, DepotCitizenComponent, DepotClientComponent, RetraitCodeComponent,
    ManageAdminCitizenComponent, TransferDargentComponent, TransferCompteComponent, ConsultationOperationsComponent,
    GeolocalisationAgentComponent, BankToWalletComponent, VirementsVersBanqueComponent,

  ],
  exports: [
    HeaderGeneralComponent, HeaderUsersComponent, HeaderCitizenComponent, HeaderCustomerComponent,
    FooterComponent,
    UserMenuComponent,
    HeaderLogedInComponent,
    AboutUsComponent,
    TermsComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    CancellationComponent,
    RefundPolicyComponent,
    NavbarForDeleteComponent,
    ServicesAgentComponent, ServicesCustCitizComponent,
    ConsultationSoldeComponent, DepotCitizenComponent, DepotClientComponent, RetraitCodeComponent,
    ManageAdminCitizenComponent, TransferDargentComponent, TransferCompteComponent, ConsultationOperationsComponent,
    GeolocalisationAgentComponent, BankToWalletComponent, VirementsVersBanqueComponent,
  ],
  providers: [

  ],
  bootstrap: []

})
export class SharedModule { }
