import { useQueries } from '@tanstack/react-query';
import AggregatesService from '@/api/services/Aggregates';
import type { AggregatesResult } from '@/api/services/Aggregates.types';
import type { StockPriceType } from './StockPriceChart';

async function fetchStockPriceChartData(
  ticker: string,
  dateRange: { start: string; end: string },
  priceType: StockPriceType,
) {
  const { start, end } = dateRange;
  const params = {
    multiplier: 1,
    timespan: 'day' as const,
    from: start,
    to: end,
  };
  const response = await AggregatesService.getAggregates(ticker, params);
  const priceTypeKeyMap: Record<StockPriceType, keyof AggregatesResult> = {
    open: 'o',
    high: 'h',
    low: 'l',
    close: 'c',
  };
  const priceTypeKey = priceTypeKeyMap[priceType];
  return response.data.results.map((point) => ({
    x: point.t,
    y: point[priceTypeKey],
    ticker,
  }));
}

/**
 * Fetches stock price chart data for the selected tickers and date range
 * and transform the data into the format required by the chart library.
 */
export function useStockPriceChartData(
  selectedTickers: string[],
  dateRange: { start: string; end: string },
  priceType: StockPriceType,
  onSuccessCallback: (
    data: { ticker: string; data: { x: number; y: number }[] }[],
  ) => void,
) {
  return useQueries({
    queries: selectedTickers.map((ticker) => ({
      queryKey: ['aggregates', ticker, dateRange, priceType],
      queryFn: () => fetchStockPriceChartData(ticker, dateRange, priceType),
      onSuccess: (data: { x: number; y: number }[]) => {
        const seriesData = data.map((point) => ({
          x: point.x,
          y: point.y,
        }));
        onSuccessCallback([{ ticker, data: seriesData }]);
      },
    })),
  });
}

export default useStockPriceChartData;
