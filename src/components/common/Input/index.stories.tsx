import { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};