export interface ICurrencyConversion {
  success: boolean;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: number;
    quote: number;
  };
  result: number;
}


export interface ICurrency {
  code: string;
  name: string;
}
export interface ICurrencyResponse {
  success: boolean;
  currencies: { [key: string]: string };
}


export interface ICurrencyConversionDetail {
  currencyConversionResult: ICurrencyConversion;
  from: ICurrency;
  to: ICurrency;
  navigationId: number;
}



export interface IExchangeRateResponse {
  success: boolean;
  timeframe: boolean;
  start_date: string;
  end_date: string;
  source: string;
  quotes: Record<string, IQuote>;
}

interface IQuote {
  [currencyPair: string]: number;
}
export interface IRecentCurriencis
  { currency1: string; currency2: string; }




