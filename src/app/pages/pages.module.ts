import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './index-page/app.component';
import {AppRoutingModule} from '../services/routing.module';
import { GeneralAboutUsComponent } from './general/about-us/aboutus.component';
import { ProfileComponent } from './users/profile/profile.component';
import { GeneralRegistrationComponent } from './general/registration/registration.component';
import { SitizenConsultationComponent } from './users/citizen/consultation/consultation.component';
import { SitizenAboutComponent } from './users/citizen/about/about.component';
import { SitizenTransferComponent } from './users/citizen/transfer/transfer.component';
import { AgentServicesComponent } from './users/agent/services/services.component';
import { LoginStartPageComponent } from './login/start-page/start-page.component';
import {SharedModule} from '../shared/shared.module';
import { GeneralTermsComponent } from './general/terms/terms.component';
import { GeneralFaqComponent } from './general/faq/faq.component';
import { GeneralPrivacyPolicyComponent } from './general/privacy-policy/privacy-policy.component';
import { GeneralCancellationComponent } from './general/cancellation/cancellation.component';
import { GeneralRefundPolicyComponent } from './general/refund-policy/refund-policy.component';
import { GeneralAuthorisationComponent } from './general/authorisation/authorisation.component';
import { GeneralCreateAccountComponent } from './general/create-account/create-account.component';
import { LogedInComponent } from './users/loged-in.component';


@NgModule({
  declarations: [
    AppComponent,
    GeneralAboutUsComponent,
    ProfileComponent,
    GeneralRegistrationComponent,
    SitizenConsultationComponent,
    SitizenAboutComponent,
    SitizenTransferComponent,
    AgentServicesComponent,
    LoginStartPageComponent,
    GeneralTermsComponent,
    GeneralFaqComponent,
    GeneralPrivacyPolicyComponent,
    GeneralCancellationComponent,
    GeneralRefundPolicyComponent,
    GeneralAuthorisationComponent,
    GeneralCreateAccountComponent,
    LogedInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    AppComponent,
    GeneralAboutUsComponent,
    ProfileComponent,
    GeneralRegistrationComponent,
    SitizenConsultationComponent,
    SitizenAboutComponent,
    SitizenTransferComponent,
    AgentServicesComponent,
    LoginStartPageComponent,
    GeneralTermsComponent,
    GeneralFaqComponent,
    GeneralPrivacyPolicyComponent,
    GeneralCancellationComponent,
    GeneralRefundPolicyComponent,
    GeneralAuthorisationComponent,
    GeneralCreateAccountComponent,
    LogedInComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
