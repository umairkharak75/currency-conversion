export const URL={
fetchCurrencyList:'currency_data/list',
convertCurrency :(to:string,from:string,amount:string)=>{ return`currency_data/convert?to=${to}&from=${from}&amount=${amount}`}


}
