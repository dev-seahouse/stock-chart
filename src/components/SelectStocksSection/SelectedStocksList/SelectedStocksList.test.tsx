import { it, vi, describe } from 'vitest';
import renderWithProviders from '@/testing/renderWithProviders.tsx';
import SelectedStocksList from '@/components/SelectStocksSection/SelectedStocksList/SelectedStocksList.tsx';

describe('SelectedStocksList.tsx', () => {
  // smoke test
  it('should render without error', () => {
    renderWithProviders(
      <SelectedStocksList
        selectedStocks={[]}
        handleDeselectStock={vi.fn}
        maxSelectableStocks={3}
      />,
    );
  });
});
