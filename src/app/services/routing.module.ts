import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginStartPageComponent} from '../pages/login/start-page/start-page.component';
import {GeneralAuthorisationComponent} from '../pages/general/authorisation/authorisation.component';
import {GeneralAboutUsPageComponent} from '../pages/general/general-about-us-page.component';
import {GeneralFaqPageComponent} from '../pages/general/general-faq-page.component';
import {GeneralPrivacyPageComponent} from '../pages/general/general-privacy-page.component';
import {GeneralTermsPageComponent} from '../pages/general/general-terms-page.component';
import {GeneralCancellationPageComponent} from '../pages/general/general-cancellation-page.component';
import {GeneralRefundPageComponent} from '../pages/general/general-refund-page.component';
import {AgentComponent} from '../pages/agent/agent.component';
import {AgentAboutUsPageComponent} from '../pages/agent/menu-top/agent-about-us-page.component';
import {AgentFaqPageComponent} from '../pages/agent/menu-top/agent-faq-page.component';
import {AgentCancellationRefundPageComponent} from '../pages/agent/menu-top/agent-cancellation-refund-page.component';
import {AgentPrivacyPageComponent} from '../pages/agent/menu-top/agent-privacy-page.component';
import {AgentTermsPageComponent} from '../pages/agent/menu-top/agent-terms-page.component';
import {CitizenComponent} from '../pages/citizen/citizen.component';
import {CitizenAboutUsPageComponent} from '../pages/citizen/menu-top/citizen-about-us-page.component';
import {CitizenCancellationRefundPageComponent} from '../pages/citizen/menu-top/citizen-cancellation-refund-page.component';
import {CitizenFaqPageComponent} from '../pages/citizen/menu-top/citizen-faq-page.component';
import {CitizenPrivacyPageComponent} from '../pages/citizen/menu-top/citizen-privacy-page.component';
import {CitizenTermsPageComponent} from '../pages/citizen/menu-top/citizen-terms-page.component';
import {CNotificationsPageComponent} from '../pages/citizen/menu-user/c-notifications-page/c-notifications-page.component';
import {COperationsPageComponent} from '../pages/citizen/menu-user/c-operations-page/c-operations-page.component';
import {CParametersPageComponent} from '../pages/citizen/menu-user/c-parameters-page/c-parameters-page.component';
import {CSettingsPageComponent} from '../pages/citizen/menu-user/c-settings-page/c-settings-page.component';
import {AOperationsPageComponent} from '../pages/agent/menu-user/a-operations-page/a-operations-page.component';
import {AParametersPageComponent} from '../pages/agent/menu-user/a-parameters-page/a-parameters-page.component';
import {ASettingsPageComponent} from '../pages/agent/menu-user/a-settings-page/a-settings-page.component';
import {CustomerComponent} from '../pages/customer/customer.component';
import {CustomerAboutUsPageComponent} from '../pages/customer/menu-top/customer-about-us-page.component';
import {CustomerTermsPageComponent} from '../pages/customer/menu-top/customer-terms-page.component';
import {CustomerFaqPageComponent} from '../pages/customer/menu-top/customer-faq-page.component';
import {CustomerPrivacyPageComponent} from '../pages/customer/menu-top/customer-privacy-page.component';
import {CustomerCancellationRefundPageComponent} from '../pages/customer/menu-top/customer-cancellation-refund-page.component';
import {CustNotificationsPageComponent} from '../pages/customer/menu-user/cust-notifications-page/cust-notifications-page.component';
import {CustOperationsPageComponent} from '../pages/customer/menu-user/cust-operations-page/cust-operations-page.component';
import {CustParametersPageComponent} from '../pages/customer/menu-user/cust-parameters-page/cust-parameters-page.component';
import {CustSettingsPageComponent} from '../pages/customer/menu-user/cust-settings-page/cust-settings-page.component';
import {GeneralRegistrationComponent} from '../pages/general/registration/registration.component';
import {CServicesTransferDargentPageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-transfer-dargent-page.component';
import {CServicesTransferComptePageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-transfer-compte-page.component';
import {CServicesConsultationSoldePageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-consultation-solde-page.component';
import {CServicesConsultationOperationsPageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-consultation-operations-page.component';
import {CServicesGeolocalisationAgentPageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-geolocalisation-agent-page.component';
import {CServicesVirementsVersBankPageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-virements-vers-bank-page.component';
import {CServicesBankToWalletPageComponent} from '../pages/citizen/menu-user/c-services-page/items/c-services-bank-to-wallet-page.component';
import {AServicesTransferDargentPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-transfer-dargent-page.component';
import {AgentServicesPageComponent} from '../pages/agent/menu-user/a-services-page/agent-services-page.component';
import {AServicesVirementsVersBankPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-virements-vers-bank-page.component';
import {AServicesTransferComptePageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-transfer-compte-page.component';
import {AServicesConsultationSoldePageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-consultation-solde-page.component';
import {AServicesConsultationOperationsPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-consultation-operations-page.component';
import {AServicesGeolocalisationAgentPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-geolocalisation-agent-page.component';
import {AServicesBankToWalletPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-bank-to-wallet-page.component';
import {AServicesDepotCitizenPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-depot-citizen-page.component';
import {AServicesDepotClientPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-depot-client-page.component';
import {AServicesManageAdminCitizenPageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-manage-admin-citizen-page.component';
import {AServicesRetraitCodePageComponent} from '../pages/agent/menu-user/a-services-page/items/a-services-retrait-code-page.component';
import {CServicesPageComponent} from '../pages/citizen/menu-user/c-services-page/c-services-page.component';
import {CustServicesPageComponent} from '../pages/customer/menu-user/cust-services-page/cust-services-page.component';
import {CustServicesBankToWalletPageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-bank-to-wallet-page.component';
import {CustServicesConsultationSoldePageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-consultation-solde-page.component';
import {CustServicesConsultationOperationsPageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-consultation-operations-page.component';
import {CustServicesTransferComptePageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-transfer-compte-page.component';
import {CustServicesTransferDargentPageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-transfer-dargent-page.component';
import {CustServicesVirementsMultiplesPageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-virements-multiples-page.component';
import {CustServicesPaiementsPageComponent} from '../pages/customer/menu-user/cust-services-page/items/cust-services-paiements.component';
import {ANotificationsPageComponent} from '../pages/agent/menu-user/a-notifications-page/a-notifications-page.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoginStartPageComponent },
  { path: 'about-us', component: GeneralAboutUsPageComponent},
  { path: 'terms-conditions', component: GeneralTermsPageComponent },
  { path: 'faq', component: GeneralFaqPageComponent },
  { path: 'privacy-policy', component: GeneralPrivacyPageComponent },
  { path: 'cancellation', component: GeneralCancellationPageComponent },
  { path: 'refund-policy', component: GeneralRefundPageComponent },
  { path: 'authorisation', component: GeneralAuthorisationComponent },
  { path: 'create-account', component: GeneralRegistrationComponent },
  { path: 'agent', component: AgentComponent, // canActivate: [AuthGuard, AgentGuard],
    children: [
      { path: 'about-us', component: AgentAboutUsPageComponent },
      { path: 'terms-conditions', component: AgentTermsPageComponent },
      { path: 'faq', component: AgentFaqPageComponent },
      { path: 'privacy-policy', component: AgentPrivacyPageComponent },
      { path: 'cancellation-refund', component: AgentCancellationRefundPageComponent },
        { path: 'services', component: AgentServicesPageComponent },
            { path: 'services/depot-citizen', component: AServicesDepotCitizenPageComponent },
            { path: 'services/depot-client', component: AServicesDepotClientPageComponent },
            { path: 'services/retrait-code', component: AServicesRetraitCodePageComponent },
            { path: 'services/manage-admin-citizen', component: AServicesManageAdminCitizenPageComponent },
            /////menu-user-->services://///////////////////////
            { path: 'services/transfer-dargent', component: AServicesTransferDargentPageComponent },
            { path: 'services/transfer-compte', component: AServicesTransferComptePageComponent },
            { path: 'services/consultation-solde', component: AServicesConsultationSoldePageComponent },
            { path: 'services/consultation-operations', component: AServicesConsultationOperationsPageComponent },
            { path: 'services/geolocalisation-agent', component: AServicesGeolocalisationAgentPageComponent },
            { path: 'services/virements-vers-bank', component: AServicesVirementsVersBankPageComponent },
            { path: 'services/bank-to-wallet', component: AServicesBankToWalletPageComponent },
        { path: 'notifications', component: ANotificationsPageComponent },
        { path: 'operations', component: AOperationsPageComponent },
        { path: 'parameters', component: AParametersPageComponent },
        { path: 'settings', component: ASettingsPageComponent },
    ]
  },
  { path: 'citizen', component: CitizenComponent, // canActivate: [AuthGuard, CitizenGuard],
    children: [
      { path: 'about-us', component: CitizenAboutUsPageComponent },
      { path: 'terms-conditions', component: CitizenTermsPageComponent },
      { path: 'faq', component: CitizenFaqPageComponent },
      { path: 'privacy-policy', component: CitizenPrivacyPageComponent },
      { path: 'cancellation-refund', component: CitizenCancellationRefundPageComponent },
        { path: 'services', component: CServicesPageComponent },
            /////menu-user-->services://///////////////////////
            { path: 'services/transfer-dargent', component: CServicesTransferDargentPageComponent },
            { path: 'services/transfer-compte', component: CServicesTransferComptePageComponent },
            { path: 'services/consultation-solde', component: CServicesConsultationSoldePageComponent },
            { path: 'services/consultation-operations', component: CServicesConsultationOperationsPageComponent },
            { path: 'services/geolocalisation-agent', component: CServicesGeolocalisationAgentPageComponent },
            { path: 'services/virements-vers-bank', component: CServicesVirementsVersBankPageComponent },
            { path: 'services/bank-to-wallet', component: CServicesBankToWalletPageComponent },
        { path: 'notifications', component: CNotificationsPageComponent },
        { path: 'operations', component: COperationsPageComponent },
        { path: 'parameters', component: CParametersPageComponent },
        { path: 'settings', component: CSettingsPageComponent },
    ]
  },
  { path: 'customer', component: CustomerComponent, // canActivate: [AuthGuard, CustomerGuard],
    children: [
      { path: 'about-us', component: CustomerAboutUsPageComponent },
      { path: 'terms-conditions', component: CustomerTermsPageComponent },
      { path: 'faq', component: CustomerFaqPageComponent },
      { path: 'privacy-policy', component: CustomerPrivacyPageComponent },
      { path: 'cancellation-refund', component: CustomerCancellationRefundPageComponent },
        { path: 'services', component: CustServicesPageComponent },
            /////menu-user-->services://///////////////////////
            { path: 'services/transfer-dargent', component: CustServicesTransferDargentPageComponent },
            { path: 'services/transfer-compte', component: CustServicesTransferComptePageComponent },
            { path: 'services/consultation-solde', component: CustServicesConsultationSoldePageComponent },
            { path: 'services/consultation-operations', component: CustServicesConsultationOperationsPageComponent },
            { path: 'services/virements-multiples', component: CustServicesVirementsMultiplesPageComponent },
            { path: 'services/paiements', component: CustServicesPaiementsPageComponent },
            { path: 'services/bank-to-wallet', component: CustServicesBankToWalletPageComponent },
        { path: 'notifications', component: CustNotificationsPageComponent },
        { path: 'operations', component: CustOperationsPageComponent },
        { path: 'parameters', component: CustParametersPageComponent },
        { path: 'settings', component: CustSettingsPageComponent },
    ]
  },
  { path: '**', component: LoginStartPageComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
