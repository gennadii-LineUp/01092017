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
import { GeneralCreateAccountComponent } from './general/create-account/create-account.component';
import { LogedInComponent } from './users/loged-in.component';
import {GeneralAboutUsPageComponent} from './general/general-about-us-page.component';
import {UserAboutUsPageComponent} from './users/user-about-us-page.component';
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
import {AgentServicesPageComponent} from './users/agent/agent-services-page.component';
import {AgentNotificationsPageComponent} from './users/agent/agent-notifications-page.component';
import {AgentOperationsPageComponent} from './users/agent/agent-operations-page.component';
import {AgentParametersPageComponent} from './users/agent/agent-parameters-page.component';
import {AgentSettingsPageComponent} from './users/agent/agent-settings-page.component';


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
    GeneralCreateAccountComponent,
    LogedInComponent,
    GeneralAboutUsPageComponent, GeneralFaqPageComponent, GeneralPrivacyPageComponent, GeneralTermsPageComponent,
    GeneralCancellationPageComponent, GeneralRefundPageComponent,
    UserAboutUsPageComponent, UserCancellationRefundPageComponent, UserFaqPageComponent, UserPrivacyPageComponent,
    UserTermsPageComponent,
    AgentComponent, AgentServicesPageComponent, AgentNotificationsPageComponent, AgentOperationsPageComponent,
    AgentParametersPageComponent, AgentSettingsPageComponent
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
    GeneralCreateAccountComponent,
    LogedInComponent,
    GeneralAboutUsPageComponent, GeneralFaqPageComponent, GeneralPrivacyPageComponent, GeneralTermsPageComponent,
    GeneralCancellationPageComponent, GeneralRefundPageComponent,
    UserAboutUsPageComponent, UserCancellationRefundPageComponent, UserFaqPageComponent, UserPrivacyPageComponent,
    UserTermsPageComponent,
    AgentComponent, AgentServicesPageComponent, AgentNotificationsPageComponent, AgentOperationsPageComponent,
    AgentParametersPageComponent, AgentSettingsPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
