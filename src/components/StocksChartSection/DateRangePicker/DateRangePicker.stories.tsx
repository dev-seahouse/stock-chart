import { StoryObj, Meta } from '@storybook/react';

import DateRangePicker from './DateRangePicker.tsx';
import { fn } from '@storybook/test';

export default {
  title: 'components/DateRangePicker',
  component: DateRangePicker,
  args: {
    dateRange: { start: new Date(), end: new Date() },
    onDateChange: fn,
  },
} as Meta<typeof DateRangePicker>;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: {},
};
