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
  globalTypes: {
    theme: {
      description: 'Farbschema',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'system', title: 'System', icon: 'browser' },
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'surface' },
    theme: 'system',
  },
  decorators: [
    // Theme-Switch ohne Service, wie in der Demo-App: color-scheme am Root, light-dark() macht den Rest.
    (story, { globals }) => {
      const theme = globals['theme'] as string;
      document.documentElement.style.colorScheme = theme === 'system' ? '' : theme;
      return story();
    },
  ],
};

export default preview;
