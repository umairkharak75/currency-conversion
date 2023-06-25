/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import {  ICurrencyConversion } from 'src/app/shared/models/currency';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public currencyConvertor:CurrencyConversionService){

  }
  topCurrenciesResult!: ICurrencyConversion[];
conversionWithTopCurriences(event:any) {
  this.currencyConvertor
    .conversionWithMostPopularCurrencies(
      event.TopCurrencies,
      event.from,
      event.amount
    )
    .subscribe((res: any) => {
       this.topCurrenciesResult = res;
    });
}
}
