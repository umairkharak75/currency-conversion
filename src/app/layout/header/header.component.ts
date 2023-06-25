import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { ICurrency } from 'src/app/shared/models/currency';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currencyList!: ICurrency[];
  constructor(public router:Router,public currencyConversion:CurrencyConversionService){}

  goToDeatilPage(fromC:string,toC:string): void{
    this.currencyList= this.currencyConversion.getCurrencyListFromLocalStorage()

    const currencyDetail = {

      from: this.currencyList.filter((curr:ICurrency)=> curr.code===fromC)[0],
      to: this.currencyList.filter((curr:ICurrency)=> curr.code===toC)[0]
    };
    this.router.navigateByUrl('/detail', { state: currencyDetail });
  }

}
