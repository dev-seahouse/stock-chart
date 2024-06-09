import { StoryObj, Meta } from '@storybook/react';

import SelectStocksSection from './SelectStocksSection';
import { fn } from '@storybook/test';

export default {
  title: 'sections/SelectStocksSection',
  component: SelectStocksSection,
  args: {
    setSelectedStocks: fn,
    selectedStocks: [],
    maxSelectableStocks: 5,
  },
} as Meta<typeof SelectStocksSection>;

type Story = StoryObj<typeof SelectStocksSection>;

export const Default: Story = {
  args: {},
};
