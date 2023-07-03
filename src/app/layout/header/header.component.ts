import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { frequentUseCurriencis } from 'src/app/shared/constant/constant';
import { ICurrency, IRecentCurriencis } from 'src/app/shared/models/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currencyList!: ICurrency[];
  frequentUseCurrencies!: IRecentCurriencis[];
  constructor(public router:Router,public currencyConversion:CurrencyConversionService){
    if(!this.currencyConversion.getRecentUsedCurrencies()){
       this.currencyConversion.addDefaultUsedCurrencies(frequentUseCurriencis)
       this.frequentUseCurrencies=frequentUseCurriencis

    }
    else{
      this.frequentUseCurrencies=this.currencyConversion.getRecentUsedCurrencies()
    }
    this.currencyConversion.frequentCurrency.subscribe((freq:IRecentCurriencis[])=>{
      this.frequentUseCurrencies=freq
    })

  }

  goToDeatilPage(fromC:string,toC:string): void{
    this.currencyList= this.currencyConversion.getCurrencyListFromLocalStorage()

    const currencyDetail = {
      from: this.currencyList.filter((curr:ICurrency)=> curr.code===fromC)[0],
      to: this.currencyList.filter((curr:ICurrency)=> curr.code===toC)[0]
    };
    this.router.navigateByUrl(`/detail/${fromC}${toC}`, { state: currencyDetail });
  }
  navigateTohome(): void {
    this.router.navigateByUrl('/');
  }

}
