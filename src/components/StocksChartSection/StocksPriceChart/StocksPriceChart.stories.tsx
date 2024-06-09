import { StoryObj, Meta } from '@storybook/react';

import StockPriceChart from './StocksPriceChart';

export default {
  title: 'components/StocksPriceChart',
  component: StockPriceChart,
  argTypes: {
    priceType: {
      control: 'radio',
      options: ['high', 'low', 'open', 'close'],
      defaultValue: 'open',
    },
  },
  args: {
    selectedTickers: ['apple'],
    dateRange: {
      start: '2023-01-01',
      end: '2024-06-22',
    },
  },
} as Meta<typeof StockPriceChart>;

type Story = StoryObj<typeof StockPriceChart>;

// type Apple in the dropdown to see search result
export const Default: Story = {
  args: {
    priceType: 'open',
  },
};
