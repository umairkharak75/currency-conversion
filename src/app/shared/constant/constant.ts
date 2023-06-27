export const URL={
fetchCurrencyList:'currency_data/list',
convertCurrency :(to:string,from:string,amount:string)=>{ return`currency_data/convert?to=${to}&from=${from}&amount=${amount}`},
currencyHistory:(startDate:string,endDate:string,currency:string,source:string)=>{ return`currency_data/timeframe?start_date=${startDate}&end_date=${endDate}&currencies=${currency}&source=${source}`}

}

export const DATES={
  startData:'2022-01-01',
  endDate:'2022-12-31'

}



export const frequentUseCurriencis: { currency1: string; currency2: string; }[]=[

    { currency1: 'EUR', currency2: 'USD' },
    { currency1: 'EUR', currency2: 'GBP' },
]
export const MONTH_LABELS=
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]


