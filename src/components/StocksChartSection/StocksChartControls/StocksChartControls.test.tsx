import { it, vi } from 'vitest';
import StocksChartControls from '@/components/StocksChartSection/StocksChartControls/StocksChartControls.tsx';
import { render } from '@testing-library/react';

// smoke test
it('renders without error', () => {
  render(
    <StocksChartControls
      dateRange={{ start: new Date(2022, 1, 1), end: new Date(2023, 1, 1) }}
      onDateChange={vi.fn}
      priceType="high"
      onPriceTypeChange={vi.fn}
    />,
  );
});
