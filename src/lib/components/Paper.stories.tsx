import { StoryObj, Meta } from '@storybook/react';

import Paper from './Paper';

export default {
  title: 'lib/components/Paper',
  component: Paper,
} as Meta<typeof Paper>;

type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: {},
};
