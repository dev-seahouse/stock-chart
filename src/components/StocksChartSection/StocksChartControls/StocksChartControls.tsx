import type { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';
import DateRangePicker from '@/components/StocksChartSection/DateRangePicker/DateRangePicker.tsx';
import PriceTypePicker from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.tsx';

function StocksChartControls(props: {
  dateRange: { start: Date; end: Date };
  onDateChange: (start: Date, end: Date) => void;
  priceType: 'open' | 'high' | 'low' | 'close';
  onPriceTypeChange: (type: StockPriceType) => void;
}) {
  return (
    <div
      className={`
        flex flex-col items-start justify-between

        md:flex-row md:items-center
      `}
    >
      <DateRangePicker
        dateRange={props.dateRange}
        onDateChange={props.onDateChange}
      />
      <PriceTypePicker
        priceType={props.priceType}
        onPriceTypeChange={props.onPriceTypeChange}
      />
    </div>
  );
}
export default StocksChartControls;
