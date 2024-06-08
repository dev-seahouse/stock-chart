import { StoryObj, Meta } from '@storybook/react';
import { Calendar } from './Calendar';

export default {
  title: 'lib/components/Calendar',
  component: Calendar,
  args: {},
} as Meta<typeof Calendar>;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};
