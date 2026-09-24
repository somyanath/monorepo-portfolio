import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'error', 'warning', 'success', 'brand'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  args: { children: 'Label', variant: 'neutral', size: 'medium' },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: 'neutral' } };
export const Error: Story = { args: { variant: 'error' } };
export const Warning: Story = { args: { variant: 'warning' } };
export const Success: Story = { args: { variant: 'success' } };
export const Brand: Story = { args: { variant: 'brand' } };
