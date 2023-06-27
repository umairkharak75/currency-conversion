import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CurrencyConversionService } from '../../../services/currency-conversion.service';
import { Router } from '@angular/router';
import {
  ICurrency,
  ICurrencyConversion,
  ICurrencyConversionDetail,
} from '../../models/currency';
import { URL } from '../../constant/constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-exchanger-form',
  templateUrl: './currency-exchanger-form.component.html',
  styleUrls: ['./currency-exchanger-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurrencyExchangerFormComponent implements OnInit ,OnDestroy,OnChanges{
  currenciyList: ICurrency[] = [];
  title = 'currency-convertor';
  subscription: Subscription=new Subscription()
  fromCurrency!:string;
  currencyConversionResult: ICurrencyConversion | undefined;
  currencyConversionFrom!: FormGroup;
  quotationResult!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() topCurrencyResultEmitter: EventEmitter<any> = new EventEmitter();
  @Input()
  currencyExchangeDetails!: ICurrencyConversionDetail;

  TopCurrencies: ICurrency[] = [];

  constructor(
    public currencyConvertor: CurrencyConversionService,
    public fb: FormBuilder,
    public router: Router
  ) {

    if (!this.currencyConvertor.getCurrencyListFromLocalStorage()) {
      this.subscription.add(this.currencyConvertor
        .fetchCurrenciesList(URL.fetchCurrencyList)
        .subscribe((fechtedCurrencies: ICurrency[]) => {
          (this.currenciyList = fechtedCurrencies),
            this.currencyConvertor.saveCurrencyListToLocalStorage(
              this.currenciyList
            );

          this.TopCurrencies = this.currenciyList.slice(0, 9);
        }));
    }else{
      this.currenciyList=this.currencyConvertor.getCurrencyListFromLocalStorage()
      this.TopCurrencies = this.currenciyList.slice(0, 9);
    }
  }

  ngOnChanges(){
    this.quotationResult=''
    this.currencyExchangeFormInitializer()
  }

  ngOnInit(): void {
    this.currencyExchangeFormInitializer()
    this.subscription.add(this.amount.valueChanges.subscribe((val) => {
      if (val) {
        if (this.currencyExchangeDetails) {
          this.to.enable();
        } else {
          this.to.enable();
          this.from.enable();
        }
      } else {
        this.to.disable();
        this.from.disable();
      }
    }))
  }
  compareFn(o1: ICurrency, o2: ICurrency): boolean {
    if (o1.code === o2.code) return true;
    return false;
  }

  currencyExchangeFormInitializer(){
    if (this.currencyExchangeDetails) {
      this.currencyConversionResult =
        this.currencyExchangeDetails?.currencyConversionResult||'';
    }
    this.currencyConversionFrom = this.fb.group({
      to: [this.currencyExchangeDetails?.to || '', Validators.required],
      from: [this.currencyExchangeDetails?.from || '', Validators.required],
      amount: [this.currencyConversionResult?.query?.amount || ''],
    });
    if (this.currencyExchangeDetails) {
      this.calculateQuotation();

      this.from.disable();
    } else {
      this.from.disable();
      this.to.disable();
    }
     this.currencyConversionResult =
      this.currencyExchangeDetails?.currencyConversionResult;
  }
  calcualteRates(): void {

    const url = URL.convertCurrency(
      this.currencyConversionFrom.value.to.code,
      this.from.value.code,
      this.currencyConversionFrom.value.amount
    );
    this.subscription.add(this.currencyConvertor.convertRateCurrency(url).subscribe((response) => {
      this.currencyConversionResult = response;
      this.calculateQuotation();
      this.fromCurrency = this.currencyConversionFrom.value.to.code;

      this.topCurrencyResultEmitter.emit({
        TopCurrencies: this.TopCurrencies,
        from: this.from.value.code,
        amount: this.amount.value,
      });
    }))
  }
  swapRates(): void {
    const temp = this.currencyConversionFrom.value.from;
    this.currencyConversionFrom
      .get('from')
      ?.setValue(this.currencyConversionFrom.value.to);
    this.currencyConversionFrom.get('to')?.setValue(temp);
    this.calcualteRates();
  }

  goToDeatilPage(): void {
    const currencyDetail = {
      currencyConversionResult: this.currencyConversionResult,
      from: this.from.value,
      to: this.to.value,
    };
    this.router.navigateByUrl(`/detail/${this.from.value.code}${this.to.value.code}`, { state: currencyDetail });
  }
  get from(): FormControl {
    return this.currencyConversionFrom.get('from') as FormControl;
  }
  get to(): FormControl {
    return this.currencyConversionFrom.get('to') as FormControl;
  }
  get amount(): FormControl {
    return this.currencyConversionFrom.get('amount') as FormControl;
  }
  calculateQuotation() {
    if(this.currencyConversionResult){
    this.quotationResult = this.quotationResult =
      this.currencyConversionResult?.query?.from +
      '=' +
      this.currencyConversionResult?.info?.quote.toFixed(2) +
      this.currencyConversionResult?.query?.to;}
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
