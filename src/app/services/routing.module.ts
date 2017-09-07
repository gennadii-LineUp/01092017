import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginStartPageComponent} from '../pages/login/start-page/start-page.component';
import {GeneralAuthorisationComponent} from '../pages/general/authorisation/authorisation.component';
import {GeneralCreateAccountComponent} from '../pages/general/create-account/create-account.component';
import {LogedInComponent} from '../pages/users/loged-in.component';
import {GeneralAboutUsPageComponent} from '../pages/general/general-about-us-page.component';
import {UserAboutUsPageComponent} from '../pages/users/user-about-us-page.component';
import {GeneralFaqPageComponent} from '../pages/general/general-faq-page.component';
import {GeneralPrivacyPageComponent} from '../pages/general/general-privacy-page.component';
import {GeneralTermsPageComponent} from '../pages/general/general-terms-page.component';
import {UserCancellationRefundPageComponent} from '../pages/users/user-cancellation-refund-page.component';
import {GeneralCancellationPageComponent} from '../pages/general/general-cancellation-page.component';
import {GeneralRefundPageComponent} from '../pages/general/general-refund-page.component';
import {UserFaqPageComponent} from '../pages/users/user-faq-page.component';
import {UserPrivacyPageComponent} from '../pages/users/user-privacy-page.component';
import {UserTermsPageComponent} from '../pages/users/user-terms-page.component';
import {AgentComponent} from '../pages/users/agent/agent.component';
import {AgentServicesPageComponent} from '../pages/users/agent/agent-services-page.component';
import {AgentNotificationsPageComponent} from '../pages/users/agent/agent-notifications-page.component';
import {AgentOperationsPageComponent} from '../pages/users/agent/agent-operations-page.component';
import {AgentParametersPageComponent} from '../pages/users/agent/agent-parameters-page.component';
import {AgentSettingsPageComponent} from '../pages/users/agent/agent-settings-page.component';


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
  { path: 'create-account', component: GeneralCreateAccountComponent },
  { path: 'profile', component: LogedInComponent, // canActivate: [AuthGuard],
    children: [
      // { path: '', component: AdminAccueilContentComponent },
      { path: 'about-us', component: UserAboutUsPageComponent },
      { path: 'terms-conditions', component: UserTermsPageComponent },
      { path: 'faq', component: UserFaqPageComponent },
      { path: 'privacy-policy', component: UserPrivacyPageComponent },
      { path: 'cancellation-refund', component: UserCancellationRefundPageComponent },
      { path: 'agent', component: AgentComponent, // canActivate: [AgentGuard],
        children: [
          { path: 'services', component: AgentServicesPageComponent },
          { path: 'notifications', component: AgentNotificationsPageComponent },
          { path: 'operations', component: AgentOperationsPageComponent },
          { path: 'parameters', component: AgentParametersPageComponent },
          { path: 'settings', component: AgentSettingsPageComponent },
        ]
      }

    ]
  },

  { path: 'agent', component: LogedInComponent, // canActivate: [AuthGuard],
    children: [
      // { path: '', component: AdminAccueilContentComponent },
      { path: 'about-us', component: UserAboutUsPageComponent },
      { path: 'terms-conditions', component: UserTermsPageComponent },
      { path: 'faq', component: UserFaqPageComponent },
      { path: 'privacy-policy', component: UserPrivacyPageComponent },
      { path: 'cancellation-refund', component: UserCancellationRefundPageComponent },
      { path: 'agent', component: AgentComponent, // canActivate: [AgentGuard],
        children: [
          { path: 'services', component: AgentServicesPageComponent },
          { path: 'notifications', component: AgentNotificationsPageComponent },
          { path: 'operations', component: AgentOperationsPageComponent },
          { path: 'parameters', component: AgentParametersPageComponent },
          { path: 'settings', component: AgentSettingsPageComponent },
        ]
      }

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
