import { StoryObj, Meta } from '@storybook/react';

import StocksChartSection from './StocksChartSection';

export default {
  title: 'sections/StocksChartSection',
  component: StocksChartSection,
  args: {
    selectedStocks: [],
    maxSelectableStocks: 3,
  },
} as Meta<typeof StocksChartSection>;

type Story = StoryObj<typeof StocksChartSection>;

export const Default: Story = {
  args: {
    selectedStocks: [{ label: 'Apple', value: 'APPL' }],
    maxSelectableStocks: 3,
  },
};

export const NoStocksSelected: Story = {};
