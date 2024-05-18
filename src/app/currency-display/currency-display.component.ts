import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BankService } from '../services/BankData.service';

@Component({
  selector: 'app-currency-display',
  templateUrl: './currency-display.component.html',
  styleUrls: ['./currency-display.component.css']
})
export class CurrencyDisplayComponent implements OnChanges {

  constructor(private bankservice: BankService){}


  @Input() selectedCurrency: string = '';


  BogData: any;
  TbcData: any;
  ValutoData: any;
  NbgData: any;
  UsdNbg_Rate: string = ' ';

  loading: boolean = false;



  currentDate: string = ' ';
  LastRefreshBog: string = ' ';
  LastRefreshTbc: string = ' ';
  LastRefreshValuto: string = ' ';


  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCurrency'] && changes['selectedCurrency'].currentValue) {
      this.SearchData();
    }
  }


  SearchData() {

    this.loading = true;


    if (this.selectedCurrency === 'usd') {
      ///ოფიციალური
      this.bankservice.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'USD');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });
      /// საქართველოს ბანკი
      this.bankservice.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'USD');
        if (this.BogData) {
          this.LastRefreshBog = this.getCurrentDate();
        }
      });

      /// თიბისი ბანკი
      this.bankservice.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'USD');
          if (usdData) {
            this.TbcData = usdData;
            this.LastRefreshTbc = this.getCurrentDate();
          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// ვალუტო
      this.bankservice.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['USDGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });




    } else if (this.selectedCurrency === 'eur') {
      ///ოფიციალური
      this.bankservice.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'EUR');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      // საქართველოს ბანკი
      this.bankservice.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'EUR');
      });


      // თიბისი ბანკი
      this.bankservice.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'EUR');
          if (usdData) {
            this.TbcData = usdData;
          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// ვალუტო
      this.bankservice.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['EURGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } else if (this.selectedCurrency === 'gbp') {

      ///ოფიციალური
      this.bankservice.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'GBP');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      this.bankservice.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'GBP');
      });
      this.bankservice.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'GBP');
          if (usdData) {
            this.TbcData = usdData;
          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// ვალუტო
      this.bankservice.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['GBPGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    }else if (this.selectedCurrency === 'CHF') {
      this.BogData = '';
      this.TbcData = '';
      this.NbgData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = ' ';
      this.UsdNbg_Rate = ' ';
 

      ///ოფიციალური
      this.bankservice.getExchangeRatesNbg().subscribe(response => {
        const currenciesList = response[0].currencies;
        const usdCurrency = currenciesList.find((currency: any) => currency.code === 'CHF');
        if (usdCurrency) {
          this.UsdNbg_Rate = usdCurrency.rate;
        }
      });

      this.bankservice.GetExchangeRatesBog().subscribe(response => {
        this.BogData = response.data.find((item: any) => item.ccy === 'CHF');
        this.LastRefreshBog = this.getCurrentDate();

      });
      this.bankservice.getExchangeRatesTbc().subscribe(response => {
        if (response && response.commercialRatesList) {
          const usdData = response.commercialRatesList.find((item: any) => item.currency === 'CHF');
          if (usdData) {
            this.LastRefreshTbc = this.getCurrentDate();
            this.TbcData = usdData;
          } else {
            console.error('USD data not found in response');
          }
        } else {
          console.error('Invalid response from TBC API');
        }
      });

      /// valuto
      this.bankservice.GetExchangeRatesValuto().subscribe(response => {
        const currencies = response.data.currencies;
        this.ValutoData = currencies['CHFGEL'];

        if (this.ValutoData) {
          this.LastRefreshValuto = this.getCurrentDate();

        }
      });


    } 
     else {
      this.BogData = '';
      this.TbcData = '';
      this.ValutoData = '';
      this.LastRefreshBog = ' ';
      this.LastRefreshTbc = ' ';
      this.LastRefreshValuto = '';
    }

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  getCurrentDate(): string {
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: string = String(today.getMonth() + 1).padStart(2, '0');
    const day: string = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;


  }

}
