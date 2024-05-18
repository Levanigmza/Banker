import { Component } from '@angular/core';
import { BankService } from '../services/BankData.service';

@Component({
  selector: 'app-currency-calculator',
  templateUrl: './currency-calculator.component.html',
  styleUrls: ['./currency-calculator.component.css']
})

export class CurrencyCalculatorComponent {
  fromCurrency: string = 'USD';
  toCurrency: string = 'GEL';
  selectedBank: string = 'NBG';
  amount: number = 1;
  conversionResult: string | null = null;

  constructor(private bankService: BankService) { 
    this.convert();
  }

  convert() {
    if (!this.amount || isNaN(this.amount) || this.amount < 0) {
      this.conversionResult = null;
      return;
    }

    let rate: number = 1;
    
    this.bankService.getExchangeRatesNbg().subscribe(response => {
      const currenciesList = response[0].currencies;
      const fromRate = currenciesList.find((currency: any) => currency.code === this.fromCurrency)?.rate || 1;
      const toRate = currenciesList.find((currency: any) => currency.code === this.toCurrency)?.rate || 1;
      rate = fromRate / toRate;
      this.conversionResult = (this.amount * rate).toFixed(3);
    });
  }
}
