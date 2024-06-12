import type { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';
import DateRangePicker from '@/components/StocksChartSection/DateRangePicker/DateRangePicker.tsx';
import PriceTypePicker from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.tsx';
import { DropdownMenu } from '@/lib/components/DropdownMenu';
import { Button } from '@/lib/components/Button';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

function StocksChartControls(props: {
  dateRange: { start: Date; end: Date };
  onDateChange: (start: Date, end: Date) => void;
  priceType: 'open' | 'high' | 'low' | 'close';
  onPriceTypeChange: (type: StockPriceType) => void;
}) {
  return (
    <div
      className={`
        flex flex-col justify-between gap-4

        md:flex-row md:items-center
      `}
    >
      <DateRangePicker
        dateRange={props.dateRange}
        onDateChange={props.onDateChange}
        className={`
          w-full

          md:w-auto md:pb-0
        `}
      />

      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="pb-4">
            test
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu> */}

      <PriceTypePicker
        priceType={props.priceType}
        onPriceTypeChange={props.onPriceTypeChange}
        className={`
          w-full

          md:w-auto
        `}
      />
    </div>
  );
}
export default StocksChartControls;
