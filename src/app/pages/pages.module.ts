import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './index-page/app.component';
import {AppRoutingModule} from '../services/routing.module';
import { ProfileComponent } from './users/profile/profile.component';
import { GeneralRegistrationComponent } from './general/registration/registration.component';
import { SitizenConsultationComponent } from './users/citizen/consultation/consultation.component';
import { SitizenAboutComponent } from './users/citizen/about/about.component';
import { SitizenTransferComponent } from './users/citizen/transfer/transfer.component';
import { AgentServicesComponent } from './users/agent/services/services.component';
import { LoginStartPageComponent } from './login/start-page/start-page.component';
import {SharedModule} from '../shared/shared.module';
import { GeneralAuthorisationComponent } from './general/authorisation/authorisation.component';
import { LogedInComponent } from './users/loged-in.component';
import {GeneralAboutUsPageComponent} from './general/general-about-us-page.component';
import {GeneralFaqPageComponent} from './general/general-faq-page.component';
import {GeneralPrivacyPageComponent} from './general/general-privacy-page.component';
import {GeneralTermsPageComponent} from './general/general-terms-page.component';
import {UserCancellationRefundPageComponent} from './users/user-cancellation-refund-page.component';
import {GeneralCancellationPageComponent} from './general/general-cancellation-page.component';
import {GeneralRefundPageComponent} from './general/general-refund-page.component';
import {UserFaqPageComponent} from './users/user-faq-page.component';
import {UserPrivacyPageComponent} from './users/user-privacy-page.component';
import {UserTermsPageComponent} from './users/user-terms-page.component';
import { AgentComponent } from './users/agent/agent.component';
import {UserAboutUsPageComponent} from './users/user-about-us-page.component';
import {AgentAboutUsPageComponent} from './users/agent/menu-top/agent-about-us-page.component';
import {AgentCancellationRefundPageComponent} from './users/agent/menu-top/agent-cancellation-refund-page.component';
import {AgentFaqPageComponent} from './users/agent/menu-top/agent-faq-page.component';
import {AgentPrivacyPageComponent} from './users/agent/menu-top/agent-privacy-page.component';
import {AgentTermsPageComponent} from './users/agent/menu-top/agent-terms-page.component';
import {CitizenComponent} from './users/citizen/citizen.component';
import {CitizenAboutUsPageComponent} from './users/citizen/menu-top/citizen-about-us-page.component';
import {CitizenCancellationRefundPageComponent} from './users/citizen/menu-top/citizen-cancellation-refund-page.component';
import {CitizenFaqPageComponent} from './users/citizen/menu-top/citizen-faq-page.component';
import {CitizenPrivacyPageComponent} from './users/citizen/menu-top/citizen-privacy-page.component';
import {CitizenTermsPageComponent} from './users/citizen/menu-top/citizen-terms-page.component';
import { COperationsPageComponent } from './users/citizen/menu-user/c-operations-page/c-operations-page.component';
import { CNotificationsPageComponent } from './users/citizen/menu-user/c-notifications-page/c-notifications-page.component';
import { CParametersPageComponent } from './users/citizen/menu-user/c-parameters-page/c-parameters-page.component';
import { CServicesPageComponent } from './users/citizen/menu-user/c-services-page/c-services-page.component';
import { CSettingsPageComponent } from './users/citizen/menu-user/c-settings-page/c-settings-page.component';
import { ASettingsPageComponent } from './users/agent/menu-user/a-settings-page/a-settings-page.component';
import { AServicesPageComponent } from './users/agent/menu-user/a-services-page/a-services-page.component';
import { AParametersPageComponent } from './users/agent/menu-user/a-parameters-page/a-parameters-page.component';
import { ANotificationsPageComponent } from './users/agent/menu-user/a-notifications-page/a-notifications-page.component';
import { AOperationsPageComponent } from './users/agent/menu-user/a-operations-page/a-operations-page.component';
import { CustomerComponent } from './users/customer/customer.component';
import {CustomerAboutUsPageComponent} from './users/customer/menu-top/customer-about-us-page.component';
import {CustomerCancellationRefundPageComponent} from './users/customer/menu-top/customer-cancellation-refund-page.component';
import {CustomerFaqPageComponent} from './users/customer/menu-top/customer-faq-page.component';
import {CustomerPrivacyPageComponent} from './users/customer/menu-top/customer-privacy-page.component';
import {CustomerTermsPageComponent} from './users/customer/menu-top/customer-terms-page.component';
import { CustOperationsPageComponent } from './users/customer/menu-user/cust-operations-page/cust-operations-page.component';
import { CustNotificationsPageComponent } from './users/customer/menu-user/cust-notifications-page/cust-notifications-page.component';
import { CustParametersPageComponent } from './users/customer/menu-user/cust-parameters-page/cust-parameters-page.component';
import { CustSettingsPageComponent } from './users/customer/menu-user/cust-settings-page/cust-settings-page.component';
import { CustServicesPageComponent } from './users/customer/menu-user/cust-services-page/cust-services-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    GeneralRegistrationComponent,
    SitizenConsultationComponent,
    SitizenAboutComponent,
    SitizenTransferComponent,
    AgentServicesComponent,
    LoginStartPageComponent,
    GeneralAuthorisationComponent,
    LogedInComponent,
    GeneralAboutUsPageComponent, GeneralFaqPageComponent, GeneralPrivacyPageComponent, GeneralTermsPageComponent,
    GeneralCancellationPageComponent, GeneralRefundPageComponent,
    UserAboutUsPageComponent, UserCancellationRefundPageComponent, UserFaqPageComponent, UserPrivacyPageComponent,
    UserTermsPageComponent,
    AgentComponent,
    ASettingsPageComponent, AServicesPageComponent, AParametersPageComponent, ANotificationsPageComponent, AOperationsPageComponent,
    AgentAboutUsPageComponent, AgentCancellationRefundPageComponent, AgentFaqPageComponent, AgentPrivacyPageComponent,
    AgentTermsPageComponent,
    CitizenComponent,
    CitizenAboutUsPageComponent, CitizenCancellationRefundPageComponent, CitizenFaqPageComponent, CitizenPrivacyPageComponent,
    CitizenTermsPageComponent,
    COperationsPageComponent, CNotificationsPageComponent, CParametersPageComponent, CServicesPageComponent, CSettingsPageComponent,
    CustomerComponent, CustomerTermsPageComponent,
    CustomerAboutUsPageComponent, CustomerCancellationRefundPageComponent, CustomerFaqPageComponent, CustomerPrivacyPageComponent,
    CustOperationsPageComponent, CustNotificationsPageComponent, CustParametersPageComponent, CustSettingsPageComponent,
    CustServicesPageComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppComponent,
    ProfileComponent,
    GeneralRegistrationComponent,
    SitizenConsultationComponent,
    SitizenAboutComponent,
    SitizenTransferComponent,
    AgentServicesComponent,
    LoginStartPageComponent,
    GeneralAuthorisationComponent,
    LogedInComponent,
    GeneralAboutUsPageComponent, GeneralFaqPageComponent, GeneralPrivacyPageComponent, GeneralTermsPageComponent,
    GeneralCancellationPageComponent, GeneralRefundPageComponent,
    UserAboutUsPageComponent, UserCancellationRefundPageComponent, UserFaqPageComponent, UserPrivacyPageComponent,
    UserTermsPageComponent,
    AgentComponent,
    ASettingsPageComponent, AServicesPageComponent, AParametersPageComponent, ANotificationsPageComponent, AOperationsPageComponent,
    AgentAboutUsPageComponent, AgentCancellationRefundPageComponent, AgentFaqPageComponent, AgentPrivacyPageComponent,
    AgentTermsPageComponent,
    CitizenComponent,
    CitizenAboutUsPageComponent, CitizenCancellationRefundPageComponent, CitizenFaqPageComponent, CitizenPrivacyPageComponent,
    CitizenTermsPageComponent,
    COperationsPageComponent, CNotificationsPageComponent, CParametersPageComponent, CServicesPageComponent, CSettingsPageComponent,
    CustomerComponent, CustomerTermsPageComponent,
    CustomerAboutUsPageComponent, CustomerCancellationRefundPageComponent, CustomerFaqPageComponent, CustomerPrivacyPageComponent,
    CustOperationsPageComponent, CustNotificationsPageComponent, CustParametersPageComponent, CustSettingsPageComponent,
    CustServicesPageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
