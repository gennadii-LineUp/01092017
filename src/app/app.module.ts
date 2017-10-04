import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './pages/index-page/app.component';
import {PagesModule} from './pages/pages.module';
import {AppRoutingModule} from './services/routing.module';
import {AuthGuard} from './guards/auth-guards.service';
import {ErrorMessageHandlerService} from './services/error-message-handler.service';
import {BackendService} from './services/backend.service';
import {CommonServices} from './services/common.service';
import {OnlyNumberDirective} from './shared/directives/only-number-directive';


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
    AuthGuard,
    ErrorMessageHandlerService, BackendService, CommonServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
