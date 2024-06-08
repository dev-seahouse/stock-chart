import AppLayout from './layouts/AppLayout';
import StocksAsyncSelect, {
  type StocksSelectOption,
} from './components/StocksAsyncSelect';
import { useState } from 'react';
import Heading from './lib/components/Heading';
import SelectedStocksList from '@/components/SelectedStocksList.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/Popover.tsx';
import { Calendar } from '@/lib/components/Calendar.tsx';
import { BarChartIcon, CalendarDaysIcon } from 'lucide-react';
import { Button } from '@/lib/components/Button.tsx';
import { DateTime } from 'luxon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './lib/components/DropdownMenu';
import StockPriceChart, {
  type StockPriceType,
} from './components/StockPriceChart';

const MAX_SELECTABLE_STOCKS = 3;

function App() {
  const [selectedStocks, setSelectedStocks] = useState<StocksSelectOption[]>(
    [],
  );
  const [dateRange, setDateRange] = useState({
    start: DateTime.now().minus({ month: 1 }).toJSDate(),
    end: DateTime.now().toJSDate(),
  });
  const [isFromPopoverOpen, setIsFromPopoverOpen] = useState(false);
  const [isToPopoverOpen, setIsToPopoverOpen] = useState(false);
  const [priceType, setPriceType] = useState<StockPriceType>('open');

  function handleFromDateChange(newFromDate: Date | undefined) {
    if (!newFromDate) return;
    setDateRange((prev) => ({
      start: newFromDate,
      end: newFromDate > prev.end ? newFromDate : prev.end,
    }));
    setIsFromPopoverOpen(false);
  }

  function handleToDateChange(newToDate: Date | undefined) {
    if (!newToDate) return;
    setDateRange((prev) => ({
      start: newToDate < prev.start ? newToDate : prev.start,
      end: newToDate,
    }));
    setIsToPopoverOpen(false);
  }

  const handlePriceTypeChange = (type: StockPriceType) => {
    setPriceType(type);
  };

  function handleStocksChange(newValue: StocksSelectOption | null) {
    if (
      !newValue ||
      selectedStocks?.some((item) => item.value === newValue.value)
    )
      return;
    setSelectedStocks((oldValues) => [newValue, ...oldValues]);
  }

  const handleDeselectStock = (stock: StocksSelectOption) => {
    setSelectedStocks((oldValues) =>
      oldValues.filter((s) => s.value !== stock.value),
    );
  };

  return (
    <AppLayout>
      <main
        className={`
          flex-1 bg-secondary p-4

          md:p-8
        `}
      >
        <div
          className={`
            grid grid-cols-1 gap-8

            md:grid-cols-3
          `}
        >
          <div className="col-span-1">
            <Heading as="h2">Select Stocks</Heading>
            <StocksAsyncSelect
              onChange={handleStocksChange}
              isDisabled={selectedStocks?.length >= MAX_SELECTABLE_STOCKS}
            />
            <div className="mt-4">
              <Heading className="mb-2" as="h2">
                Selected Stocks
              </Heading>
              <SelectedStocksList
                selectedStocks={selectedStocks}
                handleDeselectStock={handleDeselectStock}
              />
            </div>
          </div>

          <div className="col-span-2">
            <Heading as="h2">Time Series Chart</Heading>

            <div className="rounded-lg bg-background p-6 shadow-lg">
              {selectedStocks.length ? (
                <div className="grid gap-4">
                  <div
                    className={`
                      flex flex-col items-start justify-between

                      md:flex-row md:items-center
                    `}
                  >
                    {/* date picker */}
                    <div
                      className={`
                        flex w-full items-center gap-2

                        md:w-auto
                      `}
                    >
                      {/* from date */}
                      <Popover
                        open={isFromPopoverOpen}
                        onOpenChange={setIsFromPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`
                              flex w-full items-center gap-2 text-gray-800

                              dark:text-gray-200

                              md:w-auto
                            `}
                            onClick={() => setIsFromPopoverOpen(true)}
                          >
                            <CalendarDaysIcon
                              className={`
                                size-4 text-gray-500

                                dark:text-gray-400
                              `}
                            />
                            {DateTime.fromJSDate(dateRange.start).toFormat(
                              'dd/MM/yyyy',
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-[276px] p-0">
                          <Calendar
                            selected={dateRange.start}
                            mode="single"
                            onSelect={handleFromDateChange}
                          />
                        </PopoverContent>
                      </Popover>
                      <span
                        className={`
                          text-gray-800

                          dark:text-gray-200
                        `}
                      >
                        to
                      </span>
                      {/* to date */}
                      <Popover
                        open={isToPopoverOpen}
                        onOpenChange={setIsToPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`
                              flex w-full items-center gap-2 text-gray-800

                              dark:text-gray-200

                              md:w-auto
                            `}
                            onClick={() => setIsToPopoverOpen(true)}
                          >
                            <CalendarDaysIcon
                              className={`
                                size-4 text-gray-500

                                dark:text-gray-400
                              `}
                            />
                            {DateTime.fromJSDate(dateRange.end).toFormat(
                              'dd/MM/yyyy',
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-[276px] p-0">
                          <Calendar
                            selected={dateRange.end}
                            mode="single"
                            onSelect={handleToDateChange}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/* price type selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className={`
                            mt-4 flex w-full items-center gap-2 text-gray-800

                            dark:text-gray-200

                            md:mt-0 md:w-auto
                          `}
                        >
                          <BarChartIcon
                            className={`
                              size-4 text-gray-500

                              dark:text-gray-400
                            `}
                          />
                          {priceType.toUpperCase()}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup
                          value={priceType}
                          onValueChange={handlePriceTypeChange as () => void}
                        >
                          <DropdownMenuRadioItem
                            value="open"
                            className={`
                              text-gray-800

                              dark:text-gray-200
                            `}
                          >
                            Open
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="high"
                            className={`
                              text-gray-800

                              dark:text-gray-200
                            `}
                          >
                            High
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="low"
                            className={`
                              text-gray-800

                              dark:text-gray-200
                            `}
                          >
                            Low
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="close"
                            className={`
                              text-gray-800

                              dark:text-gray-200
                            `}
                          >
                            Close
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <StockPriceChart
                    priceType={priceType}
                    selectedTickers={selectedStocks.map((stock) => stock.value)}
                    dateRange={{
                      start:
                        DateTime.fromJSDate(dateRange.start).toISODate() ?? '',
                      end: DateTime.fromJSDate(dateRange.end).toISODate() ?? '',
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <p
                    className={`
                      text-gray-500

                      dark:text-gray-400
                    `}
                  >
                    Please select up to 3 stocks to view the price chart.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default App;
