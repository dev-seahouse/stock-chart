import { StoryObj, Meta } from '@storybook/react';

import Heading from './Heading';

export default {
  title: 'lib/components/Heading',
  component: Heading,
  args: {
    children: 'hbello',
  },
} as Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {},
};
