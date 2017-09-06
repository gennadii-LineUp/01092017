import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../services/routing.module';
import {HeaderGeneralComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';


@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule, AppRoutingModule,
  ],
  declarations: [
    HeaderGeneralComponent,
    FooterComponent,
    UserMenuComponent,
  ],
  exports: [
    HeaderGeneralComponent,
    FooterComponent,
    UserMenuComponent,
  ],
  providers: [

  ],
  bootstrap: []

})
export class SharedModule { }
