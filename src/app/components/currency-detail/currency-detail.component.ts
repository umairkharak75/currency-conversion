import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from "chart.js";
import {  map } from 'rxjs';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { ICurrencyConversionDetail } from 'src/app/shared/models/currency';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent {
  currencyExchangeDetails!: ICurrencyConversionDetail;
  constructor(public currencyConversion:CurrencyConversionService, public route: ActivatedRoute,public router:Router){
    this.route.paramMap
    .pipe(map(() => window.history.state)).subscribe(res=>{

          this.currencyExchangeDetails=res
         console.log(res)
     })
}

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  navigateTohome():void{
    this.router.navigateByUrl('/');

  }

}
