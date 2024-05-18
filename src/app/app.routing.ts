import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyCalculatorComponent } from './currency-calculator/currency-calculator.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/valute', pathMatch: 'full' }, 
  { path: 'valute', component: MainComponent },
  { path: 'calculator', component: CurrencyCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
