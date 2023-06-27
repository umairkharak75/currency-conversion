/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { map } from 'rxjs';
import { CurrencyConversionService } from 'src/app/services/currency-conversion.service';
import { DATES, MONTH_LABELS } from 'src/app/shared/constant/constant';
import { ICurrencyConversionDetail, IRecentCurriencis } from 'src/app/shared/models/currency';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent {
  // eslint-disable-next-line @typescript-eslint/ban-types
  lastYearData!: Object;
  graphDates: any = [];
  currencyExchangeDetails!: ICurrencyConversionDetail;

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  hasLoader=false
  public lineChartLegend = true;

  public lineChartData!: ChartConfiguration<'line'>['data'];

  lastDayOfMonths: string[] = [];
  constructor(
    public currencyConversion: CurrencyConversionService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.getLastDay();
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.currencyExchangeDetails = res;
        const obj:IRecentCurriencis={currency1:this.currencyExchangeDetails.from.code,
                currency2:this.currencyExchangeDetails.to.code
                 }
        this.currencyConversion.addRecentUsedCurrencies(obj)

        this.getLastYearRates();
      });
  }

  navigateTohome(): void {
    this.router.navigateByUrl('/');
  }
  getLastDay() {
    for (let i = 0; i < 12; i++) {
      const d = new Date(2022, i + 1, 0);
      this.lastDayOfMonths.push(moment(d).format('YYYY-MM-DD'));
    }
  }

  getLastYearRates() {
    this.hasLoader=true

    this.currencyConversion
      .getLastYearRates(
        DATES.startData,
        DATES.endDate,
        this.currencyExchangeDetails.from.code,
        this.currencyExchangeDetails.to.code
      )
      .subscribe((data) => {

        this.lastYearData = data.quotes;
        const quotesArray = Object.entries(this.lastYearData).map(
          ([date, rates]) => ({
            date,
            ...rates,
          })
        );
        this.lastDayOfMonths.forEach((element: string) => {
          const result = this.findObjectByDate(quotesArray, element);
          this.graphDates.push(result);
        });
        this.hasLoader=false
        const values = this.graphDates.map((obj:any) => Object.values(obj)[1]);
        this.initializeChart(values);

      });
  }
  findObjectByDate(quotesArray: any, targetDate: string) {
    return quotesArray.find((obj: { date: string }) => obj.date === targetDate);
  }
  initializeChart(value: number[]) {
    this.lineChartData = {
      labels: MONTH_LABELS,
      datasets: [
        {
          data: value,
          label: 'Series A',
          fill: true,
          tension: 0.6,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }
}
