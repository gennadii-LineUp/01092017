import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './index-page/app.component';
import {AppRoutingModule} from '../services/routing.module';
import { GeneralRegistrationComponent } from './general/registration/registration.component';
import { LoginStartPageComponent } from './login/start-page/start-page.component';
import {SharedModule} from '../shared/shared.module';
import { GeneralAuthorisationComponent } from './general/authorisation/authorisation.component';
import {GeneralAboutUsPageComponent} from './general/general-about-us-page.component';
import {GeneralFaqPageComponent} from './general/general-faq-page.component';
import {GeneralPrivacyPageComponent} from './general/general-privacy-page.component';
import {GeneralTermsPageComponent} from './general/general-terms-page.component';
import {GeneralCancellationPageComponent} from './general/general-cancellation-page.component';
import {GeneralRefundPageComponent} from './general/general-refund-page.component';
import { AgentComponent } from './agent/agent.component';
import {AgentAboutUsPageComponent} from './agent/menu-top/agent-about-us-page.component';
import {AgentCancellationRefundPageComponent} from './agent/menu-top/agent-cancellation-refund-page.component';
import {AgentFaqPageComponent} from './agent/menu-top/agent-faq-page.component';
import {AgentPrivacyPageComponent} from './agent/menu-top/agent-privacy-page.component';
import {AgentTermsPageComponent} from './agent/menu-top/agent-terms-page.component';
import {CitizenComponent} from './citizen/citizen.component';
import {CitizenAboutUsPageComponent} from './citizen/menu-top/citizen-about-us-page.component';
import {CitizenCancellationRefundPageComponent} from './citizen/menu-top/citizen-cancellation-refund-page.component';
import {CitizenFaqPageComponent} from './citizen/menu-top/citizen-faq-page.component';
import {CitizenPrivacyPageComponent} from './citizen/menu-top/citizen-privacy-page.component';
import {CitizenTermsPageComponent} from './citizen/menu-top/citizen-terms-page.component';
import { COperationsPageComponent } from './citizen/menu-user/c-operations-page/c-operations-page.component';
import { CNotificationsPageComponent } from './citizen/menu-user/c-notifications-page/c-notifications-page.component';
import { CParametersPageComponent } from './citizen/menu-user/c-parameters-page/c-parameters-page.component';
import { CSettingsPageComponent } from './citizen/menu-user/c-settings-page/c-settings-page.component';
import { ASettingsPageComponent } from './agent/menu-user/a-settings-page/a-settings-page.component';
import { AParametersPageComponent } from './agent/menu-user/a-parameters-page/a-parameters-page.component';
import { ANotificationsPageComponent } from './agent/menu-user/a-notifications-page/a-notifications-page.component';
import { AOperationsPageComponent } from './agent/menu-user/a-operations-page/a-operations-page.component';
import { CustomerComponent } from './customer/customer.component';
import {CustomerAboutUsPageComponent} from './customer/menu-top/customer-about-us-page.component';
import {CustomerCancellationRefundPageComponent} from './customer/menu-top/customer-cancellation-refund-page.component';
import {CustomerFaqPageComponent} from './customer/menu-top/customer-faq-page.component';
import {CustomerPrivacyPageComponent} from './customer/menu-top/customer-privacy-page.component';
import {CustomerTermsPageComponent} from './customer/menu-top/customer-terms-page.component';
import { CustOperationsPageComponent } from './customer/menu-user/cust-operations-page/cust-operations-page.component';
import { CustNotificationsPageComponent } from './customer/menu-user/cust-notifications-page/cust-notifications-page.component';
import { CustParametersPageComponent } from './customer/menu-user/cust-parameters-page/cust-parameters-page.component';
import { CustSettingsPageComponent } from './customer/menu-user/cust-settings-page/cust-settings-page.component';
import {CServicesTransferDargentPageComponent} from './citizen/menu-user/c-services-page/items/c-services-transfer-dargent-page.component';
import {CServicesTransferComptePageComponent} from './citizen/menu-user/c-services-page/items/c-services-transfer-compte-page.component';
import {CServicesConsultationSoldePageComponent} from './citizen/menu-user/c-services-page/items/c-services-consultation-solde-page.component';
import {CServicesConsultationOperationsPageComponent} from './citizen/menu-user/c-services-page/items/c-services-consultation-operations-page.component';
import {CServicesGeolocalisationAgentPageComponent} from './citizen/menu-user/c-services-page/items/c-services-geolocalisation-agent-page.component';
import {CServicesVirementsVersBankPageComponent} from './citizen/menu-user/c-services-page/items/c-services-virements-vers-bank-page.component';
import {CServicesBankToWalletPageComponent} from './citizen/menu-user/c-services-page/items/c-services-bank-to-wallet-page.component';
import {AServicesTransferDargentPageComponent} from './agent/menu-user/a-services-page/items/a-services-transfer-dargent-page.component';
import {AgentServicesPageComponent} from './agent/menu-user/a-services-page/agent-services-page.component';
import {AServicesVirementsVersBankPageComponent} from './agent/menu-user/a-services-page/items/a-services-virements-vers-bank-page.component';
import {AServicesTransferComptePageComponent} from './agent/menu-user/a-services-page/items/a-services-transfer-compte-page.component';
import {AServicesConsultationSoldePageComponent} from './agent/menu-user/a-services-page/items/a-services-consultation-solde-page.component';
import {AServicesConsultationOperationsPageComponent} from './agent/menu-user/a-services-page/items/a-services-consultation-operations-page.component';
import {AServicesGeolocalisationAgentPageComponent} from './agent/menu-user/a-services-page/items/a-services-geolocalisation-agent-page.component';
import {AServicesBankToWalletPageComponent} from './agent/menu-user/a-services-page/items/a-services-bank-to-wallet-page.component';
import {AServicesDepotCitizenPageComponent} from './agent/menu-user/a-services-page/items/a-services-depot-citizen-page.component';
import {AServicesDepotClientPageComponent} from './agent/menu-user/a-services-page/items/a-services-depot-client-page.component';
import {AServicesManageAdminCitizenPageComponent} from './agent/menu-user/a-services-page/items/a-services-manage-admin-citizen-page.component';
import {AServicesRetraitCodePageComponent} from './agent/menu-user/a-services-page/items/a-services-retrait-code-page.component';
import {CServicesPageComponent} from './citizen/menu-user/c-services-page/c-services-page.component';
import {CustServicesPageComponent} from './customer/menu-user/cust-services-page/cust-services-page.component';
import {CustServicesBankToWalletPageComponent} from './customer/menu-user/cust-services-page/items/cust-services-bank-to-wallet-page.component';
import {CustServicesConsultationOperationsPageComponent} from './customer/menu-user/cust-services-page/items/cust-services-consultation-operations-page.component';
import {CustServicesConsultationSoldePageComponent} from './customer/menu-user/cust-services-page/items/cust-services-consultation-solde-page.component';
import {CustServicesGeolocalisationAgentPageComponent} from './customer/menu-user/cust-services-page/items/cust-services-geolocalisation-agent-page.component';
import {CustServicesTransferComptePageComponent} from './customer/menu-user/cust-services-page/items/cust-services-transfer-compte-page.component';
import {CustServicesTransferDargentPageComponent} from './customer/menu-user/cust-services-page/items/cust-services-transfer-dargent-page.component';
import {CustServicesVirementsVersBankPageComponent} from './customer/menu-user/cust-services-page/items/cust-services-virements-vers-bank-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GeneralRegistrationComponent,
    LoginStartPageComponent,
    GeneralAuthorisationComponent,
    GeneralAboutUsPageComponent, GeneralFaqPageComponent, GeneralPrivacyPageComponent, GeneralTermsPageComponent,
    GeneralCancellationPageComponent, GeneralRefundPageComponent,
    AgentComponent,
    ASettingsPageComponent, AParametersPageComponent, ANotificationsPageComponent, AOperationsPageComponent,
    AgentAboutUsPageComponent, AgentCancellationRefundPageComponent, AgentFaqPageComponent, AgentPrivacyPageComponent,
    AgentTermsPageComponent,
    CitizenComponent,
    CitizenAboutUsPageComponent, CitizenCancellationRefundPageComponent, CitizenFaqPageComponent, CitizenPrivacyPageComponent,
    CitizenTermsPageComponent,
    COperationsPageComponent, CNotificationsPageComponent, CParametersPageComponent, CSettingsPageComponent,
    CustomerComponent, CustomerTermsPageComponent,
    CustomerAboutUsPageComponent, CustomerCancellationRefundPageComponent, CustomerFaqPageComponent, CustomerPrivacyPageComponent,
    CustOperationsPageComponent, CustNotificationsPageComponent, CustParametersPageComponent, CustSettingsPageComponent,
    CustServicesPageComponent, CustServicesBankToWalletPageComponent, CustServicesConsultationOperationsPageComponent,
    CustServicesConsultationSoldePageComponent, CustServicesGeolocalisationAgentPageComponent,
    CustServicesTransferComptePageComponent, CustServicesTransferDargentPageComponent, CustServicesVirementsVersBankPageComponent,
    CServicesTransferDargentPageComponent, CServicesTransferComptePageComponent, CServicesConsultationSoldePageComponent,
    CServicesConsultationOperationsPageComponent, CServicesGeolocalisationAgentPageComponent, CServicesVirementsVersBankPageComponent,
    CServicesBankToWalletPageComponent,
    AgentServicesPageComponent, AServicesTransferDargentPageComponent, AServicesVirementsVersBankPageComponent,
    AServicesTransferComptePageComponent, AServicesConsultationSoldePageComponent, AServicesConsultationOperationsPageComponent,
    AServicesGeolocalisationAgentPageComponent, AServicesBankToWalletPageComponent, AServicesDepotCitizenPageComponent,
    AServicesDepotClientPageComponent, AServicesManageAdminCitizenPageComponent, AServicesRetraitCodePageComponent,
    CServicesPageComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppComponent,
    GeneralRegistrationComponent,
    LoginStartPageComponent,
    GeneralAuthorisationComponent,
    GeneralAboutUsPageComponent, GeneralFaqPageComponent, GeneralPrivacyPageComponent, GeneralTermsPageComponent,
    GeneralCancellationPageComponent, GeneralRefundPageComponent,
    AgentComponent,
    ASettingsPageComponent, AParametersPageComponent, ANotificationsPageComponent, AOperationsPageComponent,
    AgentAboutUsPageComponent, AgentCancellationRefundPageComponent, AgentFaqPageComponent, AgentPrivacyPageComponent,
    AgentTermsPageComponent,
    CitizenComponent,
    CitizenAboutUsPageComponent, CitizenCancellationRefundPageComponent, CitizenFaqPageComponent, CitizenPrivacyPageComponent,
    CitizenTermsPageComponent,
    COperationsPageComponent, CNotificationsPageComponent, CParametersPageComponent, CSettingsPageComponent,
    CustomerComponent, CustomerTermsPageComponent,
    CustomerAboutUsPageComponent, CustomerCancellationRefundPageComponent, CustomerFaqPageComponent, CustomerPrivacyPageComponent,
    CustOperationsPageComponent, CustNotificationsPageComponent, CustParametersPageComponent, CustSettingsPageComponent,
    CustServicesPageComponent, CustServicesBankToWalletPageComponent, CustServicesConsultationOperationsPageComponent,
    CustServicesConsultationSoldePageComponent, CustServicesGeolocalisationAgentPageComponent,
    CustServicesTransferComptePageComponent, CustServicesTransferDargentPageComponent, CustServicesVirementsVersBankPageComponent,
    CServicesTransferDargentPageComponent, CServicesTransferComptePageComponent, CServicesConsultationSoldePageComponent,
    CServicesConsultationOperationsPageComponent, CServicesGeolocalisationAgentPageComponent, CServicesVirementsVersBankPageComponent,
    CServicesBankToWalletPageComponent,
    AgentServicesPageComponent, AServicesTransferDargentPageComponent, AServicesVirementsVersBankPageComponent,
    AServicesTransferComptePageComponent, AServicesConsultationSoldePageComponent, AServicesConsultationOperationsPageComponent,
    AServicesGeolocalisationAgentPageComponent, AServicesBankToWalletPageComponent, AServicesDepotCitizenPageComponent,
    AServicesDepotClientPageComponent, AServicesManageAdminCitizenPageComponent, AServicesRetraitCodePageComponent,
    CServicesPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
