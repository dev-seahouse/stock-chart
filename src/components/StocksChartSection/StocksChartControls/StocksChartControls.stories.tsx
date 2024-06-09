import { StoryObj, Meta } from '@storybook/react';

import { fn } from '@storybook/test';
import StocksChartControls from './StocksChartControls';

export default {
  title: 'components/StocksChartControls',
  component: StocksChartControls,
  args: {
    dateRange: { start: new Date(2022, 1, 1), end: new Date(2023, 1, 1) },
    onDateChange: fn,
    priceType: 'high',
    onPriceTypeChange: fn,
  },
} as Meta<typeof StocksChartControls>;

type Story = StoryObj<typeof StocksChartControls>;

export const Default: Story = {
  args: {},
};
