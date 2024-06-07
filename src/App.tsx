import AppLayout from './layouts/AppLayout';
import StocksAsyncSelect, {
  type StocksSelectOption,
} from './components/StocksAsyncSelect';
import { useState } from 'react';
import Heading from './lib/components/Heading';
import SelectedStocksList from '@/components/SelectedStocksList.tsx';

const MAX_SELECTABLE_STOCKS = 3;

function App() {
  const [selectedStocks, setSelectedStocks] = useState<StocksSelectOption[]>(
    [],
  );
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
            <Heading as="h2">Stock Price Chart</Heading>

            <div className={` rounded-l bg-background p-6 shadow-lg`}>
              <div className="grid gap-4">
                <div
                  className={`
                    flex flex-col items-start justify-between

                    md:flex-row md:items-center
                  `}
                >
                  <div
                    className={`
                      flex w-full items-center gap-2

                      md:w-auto
                    `}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}

export default App;
