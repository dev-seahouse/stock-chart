import { StoryObj, Meta } from '@storybook/react';

import AppHeader from './AppHeader';

export default {
  title: 'components/AppHeader',
  component: AppHeader,
  args: {
    theme: undefined,
    toggleTheme: undefined,
  },
} as Meta<typeof AppHeader>;

type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {
  args: {
    theme: 'light',
  },
};
