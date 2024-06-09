import AppLayout from './layouts/AppLayout';
import { useState } from 'react';
import type { StocksSelectOption } from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.types';
import StocksChartSection from '@/components/StocksChartSection/StocksChartSection.tsx';
import SelectStocksSection from '@/components/SelectStocksSection/SelectStocksSection.tsx';
import GridLayout from '@/layouts/GridLayout.tsx';
import AppContainer from '@/layouts/AppContainer.tsx';

const MAX_SELECTABLE_STOCKS = 3;

/**
 * we can made another container to contain these shared states or use
 * a state management lib, or use context to prevent prop drilling
 * but it is not necessary as this app is not that complex
 */
function App() {
  const [selectedStocks, setSelectedStocks] = useState<StocksSelectOption[]>(
    [],
  );
  return (
    <AppLayout>
      <AppContainer>
        <GridLayout>
          <SelectStocksSection
            selectedStocks={selectedStocks}
            maxSelectableStocks={MAX_SELECTABLE_STOCKS}
            setSelectedStocks={setSelectedStocks}
            className="col-span-1"
          />
          <StocksChartSection
            selectedStocks={selectedStocks}
            maxSelectableStocks={MAX_SELECTABLE_STOCKS}
            className="col-span-2"
          />
        </GridLayout>
      </AppContainer>
    </AppLayout>
  );
}

export default App;
