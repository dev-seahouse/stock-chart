import { StoryObj, Meta } from '@storybook/react';
import { Button } from './Button';
import { SmileIcon } from 'lucide-react';

export default {
  title: 'lib/components/Button',
  component: Button,
  argTypes: {
    size: { control: 'radio', options: ['default', 'sm', 'lg', 'icon'] },
    asChild: { control: 'boolean' },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Submit',
  },
};

/** secondary button */
export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: 'destructive',
  },
};

/** for icons, cross button, anything that is clickable but is not button */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: <SmileIcon />,
  },
};
