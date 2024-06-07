import client from '../client';
import { TickersResponse, type TickersParams } from './Tickers.types';

export default {
  // @see https://polygon.io/docs/stocks/get_v3_reference_tickers
  tickers: (params: TickersParams, signal?: AbortSignal) =>
    client.get<TickersResponse>('/v3/reference/tickers', {
      params,
      signal,
    }),
};
