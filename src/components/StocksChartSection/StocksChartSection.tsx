import type { StocksSelectOption } from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.types.ts';
import { useState } from 'react';
import { DateTime } from 'luxon';
import type { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';
import Heading from '@/lib/components/Heading.tsx';
import MaxSelectableStocksMessage from '@/components/StocksChartSection/MaxSelectableStocksMessage/MaxSelectableStocksMessage.tsx';
import { cn } from '@/lib/utils.ts';
import StocksChartControls from '@/components/StocksChartSection/StocksChartControls/StocksChartControls.tsx';
import Paper from '@/lib/components/Paper.tsx';
import StockPriceChart from '@/components/StocksChartSection/StocksPriceChart/StocksPriceChart.tsx';

interface StocksChartSectionProps {
  selectedStocks: StocksSelectOption[];
  maxSelectableStocks: number;
  className?: string;
}

// Displays time series chart for the selected stocks
function StocksChartSection({
  selectedStocks,
  maxSelectableStocks,
  className,
}: StocksChartSectionProps) {
  const [dateRange, setDateRange] = useState({
    start: DateTime.now().minus({ month: 6 }).toJSDate(), // default view 6 months data
    end: DateTime.now().toJSDate(),
  });

  const [priceType, setPriceType] = useState<StockPriceType>('open');

  function handleDateChange(start: Date, end: Date) {
    setDateRange({ start, end });
  }

  function handlePriceTypeChange(type: StockPriceType) {
    setPriceType(type);
  }

  return (
    <section className={cn(className)}>
      <Heading as="h2">Stocks Chart</Heading>

      <Paper>
        {selectedStocks.length ? (
          <div className="flex flex-col gap-4">
            <StocksChartControls
              dateRange={dateRange}
              onDateChange={handleDateChange}
              priceType={priceType}
              onPriceTypeChange={handlePriceTypeChange}
            />

            <StockPriceChart
              priceType={priceType}
              selectedTickers={selectedStocks.map((option) => option.value)}
              dateRange={{
                start: DateTime.fromJSDate(dateRange.start).toISODate() ?? '',
                end: DateTime.fromJSDate(dateRange.end).toISODate() ?? '',
              }}
            />
          </div>
        ) : (
          <MaxSelectableStocksMessage
            maxSelectableStocks={maxSelectableStocks}
          />
        )}
      </Paper>
    </section>
  );
}

export default StocksChartSection;
