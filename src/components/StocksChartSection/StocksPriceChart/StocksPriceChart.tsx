import Loading from '@/lib/components/Loading.tsx';
import useStockPriceChartQuery from './StocksPriceChart.hooks.ts';
import { capitalize } from '@/lib/utils.ts';
import { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';
import { Button } from '@/lib/components/Button.tsx';
import LazyHighchartsWrapper from './LazyHighChart.tsx';

interface StockPriceChartProps {
  selectedTickers: string[];
  dateRange: { start: string; end: string };
  priceType: StockPriceType;
}

function StockPriceChart({
  selectedTickers,
  dateRange,
  priceType,
}: StockPriceChartProps) {
  const queries = useStockPriceChartQuery(
    selectedTickers,
    dateRange,
    priceType,
  );

  const chartData = selectedTickers.map((ticker) => {
    const query = queries.find((q) => q?.data?.[0]?.ticker === ticker);
    return {
      type: 'line' as const,
      name: ticker,
      data: query?.data?.map((point) => ({ x: point.x, y: point.y })) ?? [],
    };
  });

  const chartOptions = {
    chart: {
      zooming: {
        type: 'x',
      },
    },
    title: { text: 'Stock Prices' },
    subtitle: {
      text: 'Click and drag in the plot area to zoom in',
    },
    tooltip: {
      valuePrefix: '$',
    },
    xAxis: { type: 'datetime' },
    yAxis: {
      title: {
        text: `${capitalize(priceType)} Price`,
      },
      labels: {
        formatter: (data) => `$${data.value}`,
      },
    },
    legend: { enabled: true },
    series: chartData,
  } satisfies Highcharts.Options;

  const isError = queries.some((query) => query.isError);
  const isLoading = queries.some((query) => query.isLoading);

  const handleRetry = () => {
    queries.forEach((query) => {
      if (query?.isError) {
        void query.refetch();
      }
    });
  };

  if (isError)
    return (
      <div
        className={`
          flex h-[399px] flex-col items-center justify-center gap-4 text-center
          text-muted-foreground
        `}
      >
        <p>Error loading data, please wait for 1 minute to retry</p>
        <Button variant="outline" size="sm" type="button" onClick={handleRetry}>
          Retry
        </Button>
      </div>
    );

  if (isLoading) {
    return <Loading />;
  }

  return <LazyHighchartsWrapper options={chartOptions} />;
}

export default StockPriceChart;
