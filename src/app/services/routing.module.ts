import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginStartPageComponent} from '../pages/login/start-page/start-page.component';
import {GeneralAboutUsComponent} from '../pages/general/about-us/aboutus.component';
import {GeneralTermsComponent} from '../pages/general/terms/terms.component';
import {GeneralFaqComponent} from '../pages/general/faq/faq.component';
import {GeneralPrivacyPolicyComponent} from '../pages/general/privacy-policy/privacy-policy.component';
import {GeneralCancellationComponent} from '../pages/general/cancellation/cancellation.component';
import {GeneralRefundPolicyComponent} from '../pages/general/refund-policy/refund-policy.component';
import {GeneralAuthorisationComponent} from '../pages/general/authorisation/authorisation.component';
import {GeneralCreateAccountComponent} from '../pages/general/create-account/create-account.component';
import {ProfileComponent} from '../pages/users/profile/profile.component';
import {LogedInComponent} from '../pages/users/loged-in.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoginStartPageComponent },
  { path: 'about-us', component: GeneralAboutUsComponent },
  { path: 'terms-conditions', component: GeneralTermsComponent },
  { path: 'faq', component: GeneralFaqComponent },
  { path: 'privacy-policy', component: GeneralPrivacyPolicyComponent },
  { path: 'cancellation', component: GeneralCancellationComponent },
  { path: 'refund-policy', component: GeneralRefundPolicyComponent },
  { path: 'authorisation', component: GeneralAuthorisationComponent },
  { path: 'create-account', component: GeneralCreateAccountComponent },
  { path: 'profile', component: LogedInComponent, // canActivate: [AuthGuard],
    children: [
      // { path: '', component: AdminAccueilContentComponent },
      // { path: 'reglages', component: AdminReglagesPageComponent },
      // { path: 'client', component: AdminClientsPageComponent},
      // { path: 'client/ajouter-un-client', component: AdminClientAjouterComponent },
      // { path: 'bibliotheque', component: AdminBibliothequePageComponent }
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
