import { Component, EventEmitter, Output } from '@angular/core';
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


  @Output() closeCalculator: EventEmitter<void> = new EventEmitter<void>();

  constructor(private bankService: BankService) { 
    this.convert();
  }


  closecalculator(){
    this.closeCalculator.emit();

  }



  convert() {
    if (!this.amount || isNaN(this.amount) || this.amount < 0) {
      this.conversionResult = null;
      return;
    }
  
    let rate: number = 1;
    let fromRate: number = 1;
    let toRate: number = 1;
  
    const fetchRates = (fromRate: number, toRate: number) => {
      rate = fromRate / toRate;
      this.conversionResult = (this.amount * rate).toFixed(3);
    };
  
    switch (this.selectedBank) {
      case 'NBG':
        this.bankService.getExchangeRatesNbg().subscribe(response => {
          const currenciesList = response[0].currencies;
          fromRate = currenciesList.find((currency: any) => currency.code === this.fromCurrency)?.rate || 1;
          toRate = currenciesList.find((currency: any) => currency.code === this.toCurrency)?.rate || 1;
          fetchRates(fromRate, toRate);
        });
        break;
  
      case 'BOG':
        this.bankService.GetExchangeRatesBog().subscribe(response => {
          fromRate = response.data.find((item: any) => item.ccy === this.fromCurrency)?.buyRate || 1;
          toRate = response.data.find((item: any) => item.ccy === this.toCurrency)?.sellRate || 1;
          fetchRates(fromRate, toRate);
        });
        break;
  
      case 'TBC':
        this.bankService.getExchangeRatesTbc().subscribe(response => {
          if (response && response.commercialRatesList) {
            fromRate = response.commercialRatesList.find((item: any) => item.currency === this.fromCurrency)?.buy || 1;
            toRate = response.commercialRatesList.find((item: any) => item.currency === this.toCurrency)?.sell || 1;
            fetchRates(fromRate, toRate);
          } else {
            console.error('Invalid response from TBC API');
            this.conversionResult = null;
          }
        });
        break;
  
      default:
        console.error('Selected bank is not supported');
        this.conversionResult = null;
        break;
    }
  }
  

}
