import { StoryObj, Meta } from '@storybook/react';

import StocksAsyncSelect from './StocksAsyncSelect';

export default {
  title: 'components/StocksAsyncSelect',
  component: StocksAsyncSelect,
  args: {
    onChange: (value) => console.log(value),
  },
} as Meta<typeof StocksAsyncSelect>;

type Story = StoryObj<typeof StocksAsyncSelect>;

export const Default: Story = {
  args: {},
};
