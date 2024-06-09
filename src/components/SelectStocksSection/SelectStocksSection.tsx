import type { StocksSelectOption } from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.types.ts';
import Heading from '@/lib/components/Heading.tsx';
import StocksAsyncSelect from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.tsx';
import SelectedStocksList from '@/components/SelectStocksSection/SelectedStocksList/SelectedStocksList.tsx';
import { cn } from '@/lib/utils.ts';
import { Dispatch, SetStateAction } from 'react';

interface SelectStocksSectionProps {
  setSelectedStocks: Dispatch<SetStateAction<StocksSelectOption[]>>;
  selectedStocks: StocksSelectOption[];
  maxSelectableStocks: number;
  className?: string;
}

/**
 * SelectStocks Section
 * allow user to search and select stocks to display stocks price chart for
 */
function SelectStocksSection({
  setSelectedStocks,
  selectedStocks,
  maxSelectableStocks,
  className,
}: SelectStocksSectionProps) {
  function handleStocksChange(newOption: StocksSelectOption | null) {
    if (
      newOption?.value &&
      !selectedStocks?.some((o) => o.value === newOption.value)
    ) {
      setSelectedStocks((oldOptions) => [newOption, ...oldOptions]);
    }
  }

  function handleDeselectStock(newOption: StocksSelectOption) {
    setSelectedStocks((old) =>
      old.filter((option) => option.value !== newOption.value),
    );
  }

  return (
    <section className={cn(className)}>
      <Heading as="h2">Select Stocks</Heading>
      <StocksAsyncSelect
        onChange={handleStocksChange}
        isDisabled={selectedStocks?.length >= maxSelectableStocks}
        className="mb-4"
      />

      <Heading className="mb-2" as="h2">
        Selected Stocks
      </Heading>
      <SelectedStocksList
        selectedStocks={selectedStocks}
        handleDeselectStock={handleDeselectStock}
        maxSelectableStocks={maxSelectableStocks}
      />
    </section>
  );
}

export default SelectStocksSection;
