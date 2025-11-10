import './global.scss?global';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

/** @type { import('@storybook/web-components-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|fill)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Migration Guide'],
      },
    },
    backgrounds: { disabled: true },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
        auto: 'light dark',
      },
      defaultTheme: 'auto',
      parentSelector: 'head meta[name="color-scheme"]',
      attributeName: 'content',
    }),
  ],

  tags: ['autodocs'],
};

export default preview;
