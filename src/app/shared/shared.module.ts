import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../services/routing.module';
import {HeaderGeneralComponent} from './components/header/header-general/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { HeaderLogedInComponent } from './components/header/header-loged-in/header-loged-in.component';
import {AboutUsComponent} from './components/about-us/aboutus.component';
import {TermsComponent} from './components/terms/terms.component';
import {FaqComponent} from './components/faq/faq.component';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';
import {CancellationComponent} from './components/cancellation/cancellation.component';
import {RefundPolicyComponent} from './components/refund-policy/refund-policy.component';
import { HeaderAgentComponent } from './components/header/header-agent/header-agent.component';
import { HeaderCitizenComponent } from './components/header/header-citizen/header-citizen.component';
import { HeaderCustomerComponent } from './components/header/header-customer/header-customer.component';


@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule, AppRoutingModule,
  ],
  declarations: [
    HeaderGeneralComponent, HeaderAgentComponent, HeaderCitizenComponent, HeaderCustomerComponent,
    FooterComponent,
    UserMenuComponent,
    HeaderLogedInComponent,
    AboutUsComponent,
    TermsComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    CancellationComponent,
    RefundPolicyComponent,

  ],
  exports: [
    HeaderGeneralComponent, HeaderAgentComponent, HeaderCitizenComponent, HeaderCustomerComponent,
    FooterComponent,
    UserMenuComponent,
    HeaderLogedInComponent,
    AboutUsComponent,
    TermsComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    CancellationComponent,
    RefundPolicyComponent,
  ],
  providers: [

  ],
  bootstrap: []

})
export class SharedModule { }
