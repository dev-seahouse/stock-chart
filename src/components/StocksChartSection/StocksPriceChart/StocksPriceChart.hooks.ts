import { useQueries, UseQueryResult } from '@tanstack/react-query';
import AggregatesService from '@/api/services/Aggregates.ts';
import type {
  AggregatesParams,
  AggregatesResult,
} from '@/api/services/Aggregates.types.ts';
import type { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';

interface DateRange {
  start: string;
  end: string;
}

// if there is a lot of params i will make it an object instead
const fetchStockData = async (
  ticker: string,
  dateRange: DateRange,
  priceType: StockPriceType,
  multiplier = 1,
  timespan: AggregatesParams['timespan'] = 'day',
) => {
  try {
    const { start, end } = dateRange;
    const params = {
      multiplier: multiplier,
      timespan: timespan,
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
  multiplier?: number,
  timespan?: AggregatesParams['timespan'],
): UseQueryResult<{ x: number; y: number; ticker: string }[], unknown>[] => {
  return useQueries({
    queries: selectedTickers.map((ticker) => ({
      queryKey: [
        'aggregates',
        ticker,
        dateRange,
        priceType,
        multiplier,
        timespan,
      ],
      queryFn: () =>
        fetchStockData(ticker, dateRange, priceType, multiplier, timespan),
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
