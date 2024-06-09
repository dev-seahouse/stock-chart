import { useQueries, UseQueryResult } from '@tanstack/react-query';
import AggregatesService from '@/api/services/Aggregates.ts';
import type { AggregatesResult } from '@/api/services/Aggregates.types.ts';
import type { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';

interface DateRange {
  start: string;
  end: string;
}

const fetchStockData = async (
  ticker: string,
  dateRange: DateRange,
  priceType: StockPriceType,
) => {
  try {
    const { start, end } = dateRange;
    const params = {
      multiplier: 1,
      timespan: 'day' as const,
      from: start,
      to: end,
    };
    const response = await AggregatesService.getAggregates(ticker, params);
    const priceKeyMap: Record<StockPriceType, keyof AggregatesResult> = {
      open: 'o',
      high: 'h',
      low: 'l',
      close: 'c',
    };
    const priceKey = priceKeyMap[priceType];
    return response.data.results.map((point) => ({
      x: point.t, // time
      y: point[priceKey], // price
      ticker,
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

//
const useStockPriceChartQuery = (
  selectedTickers: string[],
  dateRange: DateRange,
  priceType: StockPriceType,
): UseQueryResult<{ x: number; y: number; ticker: string }[], unknown>[] => {
  return useQueries({
    queries: selectedTickers.map((ticker) => ({
      queryKey: ['aggregates', ticker, dateRange, priceType],
      queryFn: () => fetchStockData(ticker, dateRange, priceType),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    })),
  });
};

export default useStockPriceChartQuery;
