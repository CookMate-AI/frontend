import { Meta, StoryObj } from '@storybook/react';
import RecipeModal from '.';

const meta: Meta<typeof RecipeModal> = {
  title: 'Common/RecipeModal',
  component: RecipeModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RecipeModal>;

export const Default: Story = {
  args: {},
};