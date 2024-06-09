import { expect, it, test } from 'vitest';
import renderWithProviders from '@/testing/renderWithProviders.tsx';
import StocksChartSection from '@/components/StocksChartSection/StocksChartSection.tsx';
import { screen } from '@testing-library/react';
import { StocksSelectOption } from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.types.ts';

const renderComp = (
  selectedStocks: StocksSelectOption[] = [],
  maxStocks = 3,
) => {
  renderWithProviders(
    <StocksChartSection
      selectedStocks={selectedStocks}
      maxSelectableStocks={maxStocks}
    />,
  );
};

// smoke test
it('should render without error', () => {
  renderWithProviders(
    <StocksChartSection selectedStocks={[]} maxSelectableStocks={3} />,
  );
});

test('user should see "stocks chart" heading', () => {
  renderComp();
  expect(screen.getByRole('heading', { level: 2 })).toBeVisible();
});

test("when user have not selected any stock, user should see 'select stocks' message", () => {
  renderComp();
  expect(screen.getByText(/select up to \d stocks/i)).toBeVisible();
});

test("when user have selected stock, user should not see 'select stocks' message", () => {
  renderComp([{ label: 'Apple', value: 'APPL' }]);
  expect(screen.queryByText(/select up to \d stocks/i)).toBeNull();
});
