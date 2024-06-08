import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useQueries } from '@tanstack/react-query';
import AggregatesService from '@/api/services/Aggregates';
import type { AggregatesResult } from '@/api/services/Aggregates.types';
import { Skeleton } from '@/lib/components/Skeleton';

export type StockPriceType = 'open' | 'high' | 'low' | 'close';

interface StockPriceChartProps {
  selectedTickers: string[];
  dateRange: { start: string; end: string };
  priceType: StockPriceType;
}

const fetchStockData = async (
  stock: string,
  dateRange: { start: string; end: string },
  priceType: StockPriceType,
) => {
  const { start, end } = dateRange;
  const params = {
    multiplier: 1,
    timespan: 'day' as const,
    from: start,
    to: end,
  };
  const response = await AggregatesService.getAggregates(stock, params);
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
    stock,
  }));
};

const StockPriceChart: React.FC<StockPriceChartProps> = ({
  selectedTickers,
  dateRange,
  priceType,
}) => {
  const queries = useQueries({
    queries: selectedTickers.map((stock) => ({
      queryKey: ['aggregates', stock, dateRange, priceType],
      queryFn: () => fetchStockData(stock, dateRange, priceType),
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  const chartData = selectedTickers.map((stockTicker) => {
    const query = queries.find(
      (q) => q.data && q.data[0]?.stock === stockTicker,
    );
    return {
      name: stockTicker,
      data: query?.data?.map((point) => ({ x: point.x, y: point.y })) ?? [],
    };
  });

  const chartOptions = {
    title: { text: 'Stock Prices' },
    xAxis: { type: 'datetime' },
    legend: { enabled: true },
    series: chartData,
  };

  if (isLoading)
    return (
      <div className="flex h-[400px] items-center justify-center space-x-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="h-[400px] text-center text-muted-foreground">
        Error loading data
      </div>
    );

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default StockPriceChart;
