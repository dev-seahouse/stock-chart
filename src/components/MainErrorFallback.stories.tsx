import { StoryObj, Meta } from '@storybook/react';
import MainErrorFallback from './MainErrorFallback';

export default {
  title: 'components/MainErrorFallback',
  component: MainErrorFallback,
} as Meta<typeof MainErrorFallback>;

type Story = StoryObj<typeof MainErrorFallback>;

export const Default: Story = {
  args: {},
};
