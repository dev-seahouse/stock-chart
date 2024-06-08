import client from '../client';
import type { AggregatesParams, AggregatesResponse } from './Aggregates.types';

export default {
  getAggregates: (
    ticker: string,
    params: AggregatesParams,
    signal?: AbortSignal,
  ) => {
    const encodedTicker = encodeURIComponent(ticker);
    const encodedMultiplier = encodeURIComponent(params.multiplier);
    const encodedTimespan = encodeURIComponent(params.timespan);
    const encodedFrom = encodeURIComponent(params.from);
    const encodedTo = encodeURIComponent(params.to);

    const url = `/v2/aggs/ticker/${encodedTicker}/range/${encodedMultiplier}/${encodedTimespan}/${encodedFrom}/${encodedTo}`;

    return client.get<AggregatesResponse>(url, {
      params: params,
      signal,
    });
  },
};
