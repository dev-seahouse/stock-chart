import { StoryObj, Meta } from '@storybook/react';

import Loading from './Loading';

export default {
  title: 'lib/components/Loading',
  component: Loading,
  args: {},
} as Meta<typeof Loading>;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};
