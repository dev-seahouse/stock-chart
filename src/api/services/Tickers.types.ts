export interface TickersParams {
  search?: string; // Search for terms within the ticker and/or company name.
  limit?: number; // Limit the number of results returned, default is 100 and max is 1000.
  ticker?: string; // Specify a ticker symbol. Defaults to empty string which queries all tickers.
  type?: string; // Specify the type of the tickers.Defaults to empty string which queries all types.
  market?: string; // Specify the market of the tickers.Defaults to empty string which queries all markets.
  locale?: string; // defaults to "us"
  exchange?: string; // https://www.iso20022.org/market-identifier-codes. Default to all.
  cusip?: string; // https://www.cusip.com/identifiers.html#/CUSIP. Defaults to empty string which queries all CUSIPs.
  cik?: string; // https://www.sec.gov/edgar/searchedgar/cik Defaults to empty string which queries all CUSIPs.
  date?: string; // Specify a point in time to retrieve tickers available on that date. Defaults to the most recent available date.
  sort?: string; // see https://polygon.io/docs/stocks/get_v3_reference_tickers for list
  active?: boolean; // Specify if the tickers returned should be actively traded on the queried date. Default is true.
}

export interface TickersResponse {
  count: number;
  next_url: string;
  request_id: string;
  results: Result[];
  status: string;
}

export interface Result {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}
