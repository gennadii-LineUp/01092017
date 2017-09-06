import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginStartPageComponent} from '../pages/login/start-page/start-page.component';


const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoginStartPageComponent },
  { path: '**', component: LoginStartPageComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    // AuthGuard, AdminGuard, ClientGuard, AdminAsClientGuard, EmployeeNullGuard, ClientOrEmployeeAdminGuard
  ]
})
export class AppRoutingModule {}
