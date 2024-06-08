import { StoryObj, Meta } from '@storybook/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/Popover.tsx';
import { Button } from '@/lib/components/Button.tsx';

export default {
  title: 'lib/components/Popover',
  component: Popover,
  args: {},
} as Meta<typeof Popover>;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  ),
};
