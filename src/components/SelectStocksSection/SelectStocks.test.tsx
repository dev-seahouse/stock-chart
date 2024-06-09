import { expect, it, test, vi } from 'vitest';
import { screen, within } from '@testing-library/react';
import SelectStocksSection from '@/components/SelectStocksSection/SelectStocksSection.tsx';
import { StocksSelectOption } from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.types.ts';
import renderWithProviders from '@/testing/renderWithProviders.tsx';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

const mockSetSelectedStocks = vi.fn();

const selectedStocks: StocksSelectOption[] = [
  { label: 'Apple', value: 'AAPL' },
  { label: 'Google', value: 'GOOGL' },
];

const renderComp = (props = {}) => {
  const defaultProps = {
    setSelectedStocks: mockSetSelectedStocks,
    selectedStocks: selectedStocks,
    maxSelectableStocks: 3,
    className: 'test-class',
    ...props,
  };

  return renderWithProviders(<SelectStocksSection {...defaultProps} />);
};

const renderStatefulComp = () => {
  const TestComponent = () => {
    const [selectedStocks, setSelectedStocks] = useState<StocksSelectOption[]>([
      { label: 'Apple', value: 'AAPL' },
      { label: 'Google', value: 'GOOGL' },
    ]);

    return (
      <SelectStocksSection
        setSelectedStocks={setSelectedStocks}
        selectedStocks={selectedStocks}
        maxSelectableStocks={3}
      />
    );
  };

  renderWithProviders(<TestComponent />);
};

// smoke test
it('should render without error', () => {
  renderWithProviders(
    <SelectStocksSection
      maxSelectableStocks={3}
      selectedStocks={[]}
      setSelectedStocks={vi.fn}
    />,
  );
});

test("user should see 'selected stocks heading'", () => {
  renderComp();
  expect(
    screen.getByRole('heading', { level: 2, name: /Selected Stocks/i }),
  ).toBeVisible();
});

it('displays selected stocks', () => {
  renderComp();
  const selectedStocksList = screen.getByRole('list');
  expect(within(selectedStocksList).getByText(/^Apple$/i)).toBeVisible();
  expect(within(selectedStocksList).getByText(/^Google$/i)).toBeVisible();
});

it('prevents duplicate stocks from being added', async () => {
  renderStatefulComp();

  expect(screen.getByText(/^Apple$/i)).toBeVisible();
  expect(screen.getByText(/^Google$/i)).toBeVisible();

  const input = screen.getByRole('combobox');

  await userEvent.type(input, 'AAPL{enter}');

  const selectedStocksList = screen.getByRole('list');

  expect(within(selectedStocksList).getAllByText(/^Apple$/i)).toHaveLength(1);
  expect(within(selectedStocksList).getByText(/^Google$/i)).toBeVisible();
});

it('adds a new stock when it is not a duplicate', async () => {
  renderStatefulComp();
  const input = screen.getByRole('combobox');
  await userEvent.type(input, 'Tesla{arrowdown}{enter}');
  const selectedStocksList = screen.getByRole('list');
  expect(
    within(selectedStocksList).getByText(/^Tesla Inc/i),
  ).toBeInTheDocument();
  expect(within(selectedStocksList).getByText(/^apple$/i)).toBeInTheDocument();
  expect(within(selectedStocksList).getByText(/^google/i)).toBeInTheDocument();
});

it('removes a stock when remove button is clicked', async () => {
  renderStatefulComp();
  const removeAppleButton = screen.getByRole('button', {
    name: /remove apple/i,
  });

  await userEvent.click(removeAppleButton);

  const selectedStocksList = screen.getByRole('list');
  expect(
    within(selectedStocksList).queryByText(/Apple Inc. \(AAPL\)/i),
  ).not.toBeInTheDocument();
});
