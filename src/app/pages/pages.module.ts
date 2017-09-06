import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './index-page/app.component';
import {AppRoutingModule} from '../services/routing.module';
import { LoginAuthorisationComponent } from './login/authorisation/authorisation.component';
import { GeneralAboutusComponent } from './general/aboutus/aboutus.component';
import { GeneralProfileComponent } from './general/profile/profile.component';
import { GeneralRegistrationComponent } from './general/registration/registration.component';
import { SitizenConsultationComponent } from './citizen/consultation/consultation.component';
import { SitizenAboutComponent } from './citizen/about/about.component';
import { SitizenTransferComponent } from './citizen/transfer/transfer.component';
import { AgentServicesComponent } from './agent/services/services.component';
import { LoginStartPageComponent } from './login/start-page/start-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginAuthorisationComponent,
    GeneralAboutusComponent,
    GeneralProfileComponent,
    GeneralRegistrationComponent,
    SitizenConsultationComponent,
    SitizenAboutComponent,
    SitizenTransferComponent,
    AgentServicesComponent,
    LoginStartPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    AppComponent,
    LoginAuthorisationComponent,
    GeneralAboutusComponent,
    GeneralProfileComponent,
    GeneralRegistrationComponent,
    SitizenConsultationComponent,
    SitizenAboutComponent,
    SitizenTransferComponent,
    AgentServicesComponent,
    LoginStartPageComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class PagesModule { }
