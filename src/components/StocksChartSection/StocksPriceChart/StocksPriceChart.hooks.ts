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
  timespan: AggregatesParams['timespan'] = 'hour',
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

const useStockPriceChartQuery = (
  selectedTickers: string[],
  dateRange: DateRange,
  priceType: StockPriceType,
  multiplier?: number,
  timespan?: AggregatesParams['timespan'],
  getBarSize?: (dateRange: DateRange) => {
    multiplier: number;
    timespan: AggregatesParams['timespan'];
  },
): UseQueryResult<{ x: number; y: number; ticker: string }[], unknown>[] => {
  const getBarSizeFn = getBarSize ?? defaultGetBarSize;

  const { multiplier: defaultMultipler, timespan: defaultTimespan } =
    getBarSizeFn(dateRange);

  const ownMultiplier = multiplier ?? defaultMultipler;
  const ownTimespan = timespan ?? defaultTimespan;

  return useQueries({
    queries: selectedTickers.map((ticker) => ({
      queryKey: [
        'aggregates',
        ticker,
        dateRange,
        priceType,
        ownMultiplier,
        ownTimespan,
      ],
      queryFn: () =>
        fetchStockData(
          ticker,
          dateRange,
          priceType,
          ownMultiplier,
          ownTimespan,
        ),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    })),
  });
};

// if date range is too short we want shorter interval bars
function defaultGetBarSize(dateRange: DateRange): {
  multiplier: number;
  timespan: AggregatesParams['timespan'];
} {
  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);
  const diffInHours =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  if (diffInHours <= 1) {
    return { multiplier: 1, timespan: 'minute' };
  } else if (diffInHours <= 24) {
    return { multiplier: 1, timespan: 'hour' };
  } else {
    return { multiplier: 1, timespan: 'day' };
  }
}

export default useStockPriceChartQuery;
