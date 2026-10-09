import type { Meta, StoryObj } from '@storybook/angular';
import { Button, ButtonSize, ButtonVariant } from './button';

// Die Story kontrolliert neben den Inputs auch Inhalt und disabled-Zustand des nativen Buttons.
interface ButtonArgs {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  disabled: boolean;
}

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'filled',
    size: 'm',
    label: 'Speichern',
    disabled: false,
  },
  argTypes: {
    variant: { control: 'select', options: ['filled', 'tonal', 'outlined', 'text'] },
    size: { control: 'select', options: ['s', 'm', 'l'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  // Eigenes Template, weil der Button Content Projection nutzt und auf <button> aufsetzt.
  render: (args) => ({
    props: args,
    template: `<button ds-button [variant]="variant" [size]="size" [disabled]="disabled">{{ label }}</button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Filled: Story = {};

export const Tonal: Story = {
  args: { variant: 'tonal' },
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const Text: Story = {
  args: { variant: 'text' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: var(--md-sys-spacing-3); align-items: center">
        <button ds-button [variant]="variant" size="s">Small</button>
        <button ds-button [variant]="variant" size="m">Medium</button>
        <button ds-button [variant]="variant" size="l">Large</button>
      </div>`,
  }),
};

export const AlleVarianten: Story = {
  name: 'Alle Varianten',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--md-sys-spacing-3); align-items: center">
        <button ds-button>Filled</button>
        <button ds-button variant="tonal">Tonal</button>
        <button ds-button variant="outlined">Outlined</button>
        <button ds-button variant="text">Text</button>
        <button ds-button disabled>Disabled</button>
        <a ds-button variant="outlined" href="#">Link</a>
      </div>`,
  }),
};
