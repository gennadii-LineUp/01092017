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
import {AgentComponent} from '../pages/users/agent/agent.component';
import {AgentAboutUsPageComponent} from '../pages/users/agent/menu-top/agent-about-us-page.component';
import {AgentFaqPageComponent} from '../pages/users/agent/menu-top/agent-faq-page.component';
import {AgentCancellationRefundPageComponent} from '../pages/users/agent/menu-top/agent-cancellation-refund-page.component';
import {AgentPrivacyPageComponent} from '../pages/users/agent/menu-top/agent-privacy-page.component';
import {AgentTermsPageComponent} from '../pages/users/agent/menu-top/agent-terms-page.component';
import {CitizenComponent} from '../pages/users/citizen/citizen.component';
import {CitizenAboutUsPageComponent} from '../pages/users/citizen/menu-top/citizen-about-us-page.component';
import {CitizenCancellationRefundPageComponent} from '../pages/users/citizen/menu-top/citizen-cancellation-refund-page.component';
import {CitizenFaqPageComponent} from '../pages/users/citizen/menu-top/citizen-faq-page.component';
import {CitizenPrivacyPageComponent} from '../pages/users/citizen/menu-top/citizen-privacy-page.component';
import {CitizenTermsPageComponent} from '../pages/users/citizen/menu-top/citizen-terms-page.component';
import {CServicesPageComponent} from '../pages/users/citizen/menu-user/c-services-page/c-services-page.component';
import {CNotificationsPageComponent} from '../pages/users/citizen/menu-user/c-notifications-page/c-notifications-page.component';
import {COperationsPageComponent} from '../pages/users/citizen/menu-user/c-operations-page/c-operations-page.component';
import {CParametersPageComponent} from '../pages/users/citizen/menu-user/c-parameters-page/c-parameters-page.component';
import {CSettingsPageComponent} from '../pages/users/citizen/menu-user/c-settings-page/c-settings-page.component';
import {AServicesPageComponent} from '../pages/users/agent/menu-user/a-services-page/a-services-page.component';
import {ANotificationsPageComponent} from '../pages/users/agent/menu-user/a-notifications-page/a-notifications-page.component';
import {AOperationsPageComponent} from '../pages/users/agent/menu-user/a-operations-page/a-operations-page.component';
import {AParametersPageComponent} from '../pages/users/agent/menu-user/a-parameters-page/a-parameters-page.component';
import {ASettingsPageComponent} from '../pages/users/agent/menu-user/a-settings-page/a-settings-page.component';
import {CustomerComponent} from '../pages/users/customer/customer.component';
import {CustomerAboutUsPageComponent} from '../pages/users/customer/menu-top/customer-about-us-page.component';
import {CustomerTermsPageComponent} from '../pages/users/customer/menu-top/customer-terms-page.component';
import {CustomerFaqPageComponent} from '../pages/users/customer/menu-top/customer-faq-page.component';
import {CustomerPrivacyPageComponent} from '../pages/users/customer/menu-top/customer-privacy-page.component';
import {CustomerCancellationRefundPageComponent} from '../pages/users/customer/menu-top/customer-cancellation-refund-page.component';
import {CustServicesPageComponent} from '../pages/users/customer/menu-user/cust-services-page/cust-services-page.component';
import {CustNotificationsPageComponent} from '../pages/users/customer/menu-user/cust-notifications-page/cust-notifications-page.component';
import {CustOperationsPageComponent} from '../pages/users/customer/menu-user/cust-operations-page/cust-operations-page.component';
import {CustParametersPageComponent} from '../pages/users/customer/menu-user/cust-parameters-page/cust-parameters-page.component';
import {CustSettingsPageComponent} from '../pages/users/customer/menu-user/cust-settings-page/cust-settings-page.component';
import {GeneralRegistrationComponent} from '../pages/general/registration/registration.component';


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
  // { path: 'profile', component: LogedInComponent, // canActivate: [AuthGuard],
  //   children: [
  //     // { path: '', component: AdminAccueilContentComponent },
  //     { path: 'about-us', component: AgentAboutUsPageComponent },
  //     { path: 'terms-conditions', component: UserTermsPageComponent },
  //     { path: 'faq', component: UserFaqPageComponent },
  //     { path: 'privacy-policy', component: UserPrivacyPageComponent },
  //     { path: 'cancellation-refund', component: UserCancellationRefundPageComponent },
  //     { path: 'agent', component: AgentComponent, // canActivate: [AgentGuard],
  //       children: [
  //         { path: 'services', component: AgentServicesPageComponent },
  //         { path: 'notifications', component: AgentNotificationsPageComponent },
  //         { path: 'operations', component: AgentOperationsPageComponent },
  //         { path: 'parameters', component: AgentParametersPageComponent },
  //         { path: 'settings', component: AgentSettingsPageComponent },
  //       ]
  //     }
  //
  //   ]
  // },

  { path: 'agent', component: AgentComponent, // canActivate: [AuthGuard, AgentGuard],
    children: [
      { path: 'about-us', component: AgentAboutUsPageComponent },
      { path: 'terms-conditions', component: AgentTermsPageComponent },
      { path: 'faq', component: AgentFaqPageComponent },
      { path: 'privacy-policy', component: AgentPrivacyPageComponent },
      { path: 'cancellation-refund', component: AgentCancellationRefundPageComponent },
        { path: 'services', component: AServicesPageComponent },
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
