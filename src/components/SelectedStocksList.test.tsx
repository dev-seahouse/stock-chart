// smoke test
import { it, vi } from 'vitest';
import renderWithProviders from '@/testing/renderWithProviders.tsx';
import SelectedStocksList from '@/components/SelectedStocksList.tsx';

// smoke test
it('should render without error', () => {
  renderWithProviders(
    <SelectedStocksList selectedStocks={[]} handleDeselectStock={vi.fn} />,
  );
});
