import { Meta } from '@storybook/react';
import SelectedStocksList from './SelectedStocksList';
import { StocksSelectOption } from './StocksAsyncSelect';
import { fn } from '@storybook/test';

export default {
  title: 'Components/SelectedStocksList',
  component: SelectedStocksList,
} as Meta<typeof SelectedStocksList>;

const selectedStocks: StocksSelectOption[] = [
  { value: 'AAPL', label: 'Apple Inc.' },
  { value: 'GOOGL', label: 'Alphabet Inc.' },
  { value: 'MSFT', label: 'Microsoft Corporation' },
];

const handleDeselectStock = fn;

export const WithSelectedStocks = () => (
  <SelectedStocksList
    selectedStocks={selectedStocks}
    handleDeselectStock={handleDeselectStock}
  />
);

export const NoSelectedStocks = () => (
  <SelectedStocksList
    selectedStocks={[]}
    handleDeselectStock={handleDeselectStock}
  />
);
