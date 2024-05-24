import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './currency/currency-main/main.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyCalculatorComponent } from './currency/currency-calculator/currency-calculator.component';
import { AppRoutingModule } from './app.routing';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { HomeComponent } from './home/home.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { CurrencyDisplayComponent } from './currency/currency-display/currency-display.component';
import { BanksComponent } from './banks/banks.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CurrencyDisplayComponent,
    CurrencyCalculatorComponent,
    RegistrationComponent,
    AuthorizationComponent,
    HomeComponent,
    UserpageComponent,
    AdminpageComponent,
    BanksComponent,
    AppointmentsComponent,
    UserAppointmentsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
