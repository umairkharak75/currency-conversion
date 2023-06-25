export const URL={
fetchCurrencyList:'currency_data/list',
convertCurrency :(to:string,from:string,amount:string)=>{ return`currency_data/convert?to=${to}&from=${from}&amount=${amount}`}


}

export const DATES={
  startData:'2022-01-01',
  endDate:'2022-12-31'

}


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


