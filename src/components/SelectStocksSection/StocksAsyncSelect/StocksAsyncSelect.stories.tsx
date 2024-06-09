import { StoryObj, Meta } from '@storybook/react';

import StocksAsyncSelect from './StocksAsyncSelect.tsx';

export default {
  title: 'components/StocksAsyncSelect',
  component: StocksAsyncSelect,
  args: {
    onChange: (value) => console.log(value),
  },
} as Meta<typeof StocksAsyncSelect>;

type Story = StoryObj<typeof StocksAsyncSelect>;

/** Type in Apple to search result */
export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { isDisabled: true },
};
