import type { Preview } from '@storybook/angular';

// Die Tokens (ui.scss) lädt Storybook über angular.json → storybook.styles, nicht hier.
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        surface: { name: 'surface', value: 'var(--md-sys-color-surface)' },
        'surface-container': {
          name: 'surface container',
          value: 'var(--md-sys-color-surface-container)',
        },
        'inverse-surface': {
          name: 'inverse surface',
          value: 'var(--md-sys-color-inverse-surface)',
        },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'surface' },
  },
  // Übung 4: globalTypes.theme (Toolbar) + Decorator, der color-scheme auf <html> setzt.
};

export default preview;
