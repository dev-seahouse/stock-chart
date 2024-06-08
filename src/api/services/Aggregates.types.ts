export interface AggregatesParams {
  // For example, if timespan = ‘minute’ and multiplier = ‘5’ then 5-minute bars will be returned.
  multiplier: number; // size of timespan multiplier (e.g., 1, 5, 15)
  timespan:
    | 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'quarter'
    | 'year'; // Size of timespan
  from: string; //  (YYYY-MM-DD or timestamp)
  to: string; // (YYYY-MM-DD or timestamp)
  adjusted?: boolean; // adjust for splits (true/false) defualt true
  limit?: number; // max 50000 or default 5000
}

export interface AggregatesResult {
  c: number; // close price
  h: number; // high price
  l: number; // low price
  n: number; // number of transactions
  o: number; // open price
  t: number; // timestamp
  v: number; // trading volume
  vw: number; // volume weighted average price
}

export interface AggregatesResponse {
  ticker: string;
  results: AggregatesResult[];
  status: string; // response status
  queryCount: number; // number of results returned
  resultsCount: number; // total results for query
  adjusted: boolean; // results adjusted for splits
  next_url: string; // next URL for results, pagination?
  request_id: string;
}
