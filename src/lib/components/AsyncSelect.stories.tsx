import { StoryObj, Meta } from '@storybook/react';

import AsyncSelect from './AsyncSelect';

export default {
  title: 'lib/components/AsyncSelect',
  component: AsyncSelect,
} as Meta<typeof AsyncSelect>;

type Story = StoryObj<typeof AsyncSelect>;

export interface SelectOption {
  label: string;
  value: string;
}

export const Default: Story = {
  args: {
    defaultOptions: true,
    loadOptions: () =>
      new Promise<SelectOption[]>((resolve) =>
        resolve([
          { label: 'AAPL', value: 'AAPL' },
          {
            label: 'TES',
            value: 'TES',
          },
        ]),
      ),
  },
};
