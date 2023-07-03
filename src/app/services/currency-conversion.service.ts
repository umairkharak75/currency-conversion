/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject, map } from 'rxjs';
import { combineLatest } from 'rxjs';
import { ICurrency, ICurrencyConversion, ICurrencyResponse, IExchangeRateResponse, IRecentCurriencis } from '../shared/models/currency';
import { URL } from '../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})

export class CurrencyConversionService {

  frequentCurrency:Subject<IRecentCurriencis[]>=new Subject()

  fetchCurrenciesList(url:string):Observable <ICurrency[]>{
    return this.httpService.get<ICurrencyResponse>(url).pipe(
      map((response: ICurrencyResponse) => {
        return Object.entries(response.currencies).map(([code, name]) => ({ code, name }));
      })
    );

  }
  convertRateCurrency(url:string): Observable<ICurrencyConversion>{
    return this.httpService.get(url)
  }

  constructor(public httpService: HttpService) {

  }
  saveCurrencyListToLocalStorage(currencyLsit:ICurrency[]){
    localStorage.setItem('currency-list',JSON.stringify(currencyLsit))
  }
  getCurrencyListFromLocalStorage(){
    let currencyList: string| null = null;
     currencyList=localStorage.getItem('currency-list')
    if(currencyList){
      return JSON.parse(currencyList);
    }
  }
  addRecentUsedCurrencies(recentSearchCurrencies: { currency1: string, currency2: string }){
    const recent: { currency1: string, currency2: string }[]=this.getRecentUsedCurrencies()
  const found=this.findCurrencyObject(recent,recentSearchCurrencies)
  if(!found){
    if (recent.length === 5) {
      recent.shift();
    }
    recent.push(recentSearchCurrencies)
    this.frequentCurrency.next(recent)
    localStorage.setItem('recent_used_currencies',JSON.stringify(recent))
  }

  }
  findCurrencyObject(arr: { currency1: string; currency2: string; }[], currencyObj: { currency1: string; currency2: string; }): { currency1: string; currency2: string; } | undefined {
    return arr.find(obj => obj.currency1 === currencyObj.currency1 && obj.currency2 === currencyObj.currency2);
  }

  addDefaultUsedCurrencies(recentSearchCurrencies: { currency1: string, currency2: string }[]){

    localStorage.setItem('recent_used_currencies',JSON.stringify(recentSearchCurrencies))
  }
  getRecentUsedCurrencies(){
    const recentUsedCurrencies = localStorage.getItem('recent_used_currencies');
    const parsedCurrencies = recentUsedCurrencies !== null ? JSON.parse(recentUsedCurrencies) : null;
    return parsedCurrencies;
     }
  conversionWithMostPopularCurrencies(topCurr:ICurrency[] = [],from:string,amount:string){
    const currencyCalls:any=[]
    topCurr.forEach(curr => {
      currencyCalls.push(this.convertRateCurrency(URL.convertCurrency(curr.code,from,amount)))
    });
      return combineLatest(currencyCalls)
    }

    getLastYearRates(startDate:string,endDate:string,source:string,currency:string){
      const url=URL.currencyHistory(startDate,endDate,currency,source)
      return this.httpService.get<IExchangeRateResponse>(url)
    }
  }





