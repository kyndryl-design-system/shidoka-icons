/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  staticDirs: ['./static', '../src/svg/'],

  docs: {},
};

export default config;
