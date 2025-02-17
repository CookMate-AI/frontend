import { Meta, StoryObj } from '@storybook/react';
import Gnb from '.';

const meta: Meta<typeof Gnb> = {
  title: 'Common/Gnb',
  component: Gnb,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Gnb>;

export const Default: Story = {
  args: {},
};