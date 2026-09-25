import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    hierarchy: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'link-color',
        'link-gray',
        'destructive',
      ],
    },
    size: { control: 'select', options: ['md', 'lg', 'xl', '2xl'] },
  },
  args: { children: 'Button CTA', hierarchy: 'primary', size: 'md' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { hierarchy: 'primary' } };
export const Secondary: Story = { args: { hierarchy: 'secondary' } };
export const Tertiary: Story = { args: { hierarchy: 'tertiary' } };
export const LinkColor: Story = { args: { hierarchy: 'link-color' } };
export const LinkGray: Story = { args: { hierarchy: 'link-gray' } };
export const Destructive: Story = { args: { hierarchy: 'destructive' } };

export const LeadingIcon: Story = {
  args: { leadingIcon: <StarIcon /> },
};
export const TrailingIcon: Story = {
  args: { trailingIcon: <StarIcon /> },
};
export const BothIcons: Story = {
  args: { leadingIcon: <StarIcon />, trailingIcon: <StarIcon /> },
};

export const IconOnly: Story = {
  args: { iconOnly: true, leadingIcon: <StarIcon />, 'aria-label': 'Star' },
};

export const Disabled: Story = { args: { disabled: true } };

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <Button
            {...args}
            size={size}
            leadingIcon={<StarIcon />}
            trailingIcon={<StarIcon />}
          >
            Button CTA
          </Button>
          <Button
            {...args}
            size={size}
            iconOnly
            leadingIcon={<StarIcon />}
            aria-label="Star"
          />
        </div>
      ))}
    </div>
  ),
};

export const AllHierarchies: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(
        [
          'primary',
          'secondary',
          'tertiary',
          'link-color',
          'link-gray',
          'destructive',
        ] as const
      ).map((hierarchy) => (
        <div key={hierarchy} style={{ display: 'flex', gap: '0.75rem' }}>
          <Button {...args} hierarchy={hierarchy}>
            Button CTA
          </Button>
          <Button {...args} hierarchy={hierarchy} leadingIcon={<StarIcon />}>
            Button CTA
          </Button>
          <Button {...args} hierarchy={hierarchy} trailingIcon={<StarIcon />}>
            Button CTA
          </Button>
          <Button
            {...args}
            hierarchy={hierarchy}
            leadingIcon={<StarIcon />}
            trailingIcon={<StarIcon />}
          >
            Button CTA
          </Button>
          <Button
            {...args}
            hierarchy={hierarchy}
            iconOnly
            leadingIcon={<StarIcon />}
            aria-label="Star"
          />
        </div>
      ))}
    </div>
  ),
};
