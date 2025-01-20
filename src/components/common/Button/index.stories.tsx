import { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'disabled',
          'outlinePrimary',
          'outlineSecondary',
          'outlineDisabled',
        ],
      },
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

export const OutlinePrimary: Story = {
  args: {
    label: 'Outline Primary Button',
    variant: 'outlinePrimary',
  },
};

export const OutlineSecondary: Story = {
  args: {
    label: 'Outline Secondary Button',
    variant: 'outlineSecondary',
  },
};

export const OutlineDisabled: Story = {
  args: {
    label: 'Outline Disabled Button',
    variant: 'outlineDisabled',
  },
};
