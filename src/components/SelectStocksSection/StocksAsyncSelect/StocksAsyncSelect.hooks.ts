import { useQuery } from '@tanstack/react-query';
import TickersService from '@/api/services/Tickers.ts';
import type { StocksSelectOption } from './StocksAsyncSelect.types.ts';

export const useFetchTickers = (search: string) => {
  return useQuery({
    queryKey: ['tickers', search],
    queryFn: ({ signal }) => fetchTickers(search, signal),
    enabled: !!search,
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const fetchTickers = async (
  search: string,
  signal?: AbortSignal,
): Promise<StocksSelectOption[]> => {
  const queryParams = {
    search,
    locale: 'us',
    limit: 20, // max 20 results
    market: 'stocks',
    type: 'CS',
  };
  try {
    const response = await TickersService.tickers(queryParams, signal);
    return response.data.results.map((ticker) => ({
      label: `${ticker.name} (${ticker.ticker})`,
      value: ticker.ticker,
    }));
  } catch (e) {
    throw new Error(e as string);
  }
};

export default useFetchTickers;
