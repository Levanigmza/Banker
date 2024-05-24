import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { adminGuardGuard, isAuthenticatedGuard, userGuardGuard } from './guard';
import { MainComponent } from './currency/currency-main/main.component';
import { BanksComponent } from './banks/banks.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'userpage', component: UserpageComponent , canActivate: [userGuardGuard] },
  { path: 'adminpage', component: AdminpageComponent  ,  canActivate : [adminGuardGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
