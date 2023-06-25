/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, map } from 'rxjs';
import { combineLatest } from 'rxjs';
import { ICurrency } from '../shared/models/currency';
import { URL } from '../shared/constant/constant';

@Injectable({
  providedIn: 'root'
})

export class CurrencyConversionService {


  fetchCurrenciesList(url:string):Observable <any>{
    return this.httpService.get(url).pipe(map(response=>{
       response = Object.entries(response.currencies).map(([code, name]) => ({ code, name }));
       return response
    }))

  }
  convertRateCurrency(url:string): Observable<any>{
    return this.httpService.get(url)
  }

  constructor(public httpService: HttpService) {

  }
  saveCurrencyListToLocalStorage(currencyLsit:any){
    localStorage.setItem('currency-list',JSON.stringify(currencyLsit))
  }
  getCurrencyListFromLocalStorage(){
    const currencyList:any=localStorage.getItem('currency-list')
    if(currencyList){
      return JSON.parse(currencyList);
    }
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
      return this.httpService.get(url)
    }



  }





