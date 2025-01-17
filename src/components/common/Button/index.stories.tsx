import { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary', 'disabled'] },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'disabled',
  },
};
