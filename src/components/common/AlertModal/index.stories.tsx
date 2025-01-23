import { Meta, StoryObj } from '@storybook/react';
import AlertModal from '.';

const meta: Meta<typeof AlertModal> = {
  title: 'Common/AlertModal',
  component: AlertModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
  args: {},
};
