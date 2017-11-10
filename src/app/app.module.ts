import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './pages/index-page/app.component';
import {PagesModule} from './pages/pages.module';
import {AppRoutingModule} from './services/routing.module';
import {AuthGuard} from './guards/auth-guard.service';
import {ErrorMessageHandlerService} from './services/error-message-handler.service';
import {BackendService} from './services/backend.service';
import {CommonServices} from './services/common.service';
import {OnlyNumberDirective} from './shared/directives/only-number-directive';
import {UserDataService} from './models/user-data';
import {AgentGuard} from './guards/agent-guard.service';
import {CitizenGuard} from './guards/citizen-guard.service';
import {CustomerGuard} from './guards/customer-guard.service';
import {GetAllListAccountService} from './services/api/getAllListAccount.service';
import {GetAllCitizenService} from './services/api/getAllCitizen.service';
import {GetAllCustomerService} from './services/api/getAllCustomer.service';


@NgModule({
  declarations: [OnlyNumberDirective],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    PagesModule

  ],
  providers: [
    AuthGuard, AgentGuard, CitizenGuard, CustomerGuard,
    ErrorMessageHandlerService, BackendService, CommonServices, UserDataService, GetAllListAccountService,
    GetAllCustomerService, GetAllCitizenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
