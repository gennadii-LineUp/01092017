import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../services/routing.module';
import {HeaderGeneralComponent} from './components/header/header-general/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { UserMenuComponent } from './components/header/user-menu/user-menu.component';
import { HeaderLogedInComponent } from './components/header/header-loged-in/header-loged-in.component';


@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule, AppRoutingModule,
  ],
  declarations: [
    HeaderGeneralComponent,
    FooterComponent,
    UserMenuComponent,
    HeaderLogedInComponent,
  ],
  exports: [
    HeaderGeneralComponent,
    FooterComponent,
    UserMenuComponent,
    HeaderLogedInComponent,
  ],
  providers: [

  ],
  bootstrap: []

})
export class SharedModule { }
