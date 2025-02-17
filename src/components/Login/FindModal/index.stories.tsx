import { Meta, StoryObj } from '@storybook/react';
import FindModal from '.';

const meta: Meta<typeof FindModal> = {
  title: 'Common/FindModal',
  component: FindModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FindModal>;

export const Default: Story = {
  args: {},
};
