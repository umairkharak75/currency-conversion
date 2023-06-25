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


export interface ICurrencyConversionDetail {
  currencyConversionResult: ICurrencyConversion;
  from: ICurrency;
  to: ICurrency;
  navigationId: number;
}




