/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-styling',
      options: {
        scssBuildRule: {
          test: /\.s(c|a)ss$/,
          exclude: [/node_modules/],
          oneOf: [
            {
              resourceQuery: /global/,
              use: [
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                {
                  loader: 'sass-loader?sourceMap',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            },
            {
              use: [
                {
                  loader: 'lit-css-loader',
                  options: {
                    transform: (data, { filePath }) =>
                      Sass.renderSync({ data, file: filePath }).css.toString(),
                  },
                },
                'sass-loader',
              ],
            },
          ],
        },
      },
    },
    {
      name: 'storybook-preset-inline-svg',
      options: {
        svgInlineLoaderOptions: {
          removeSVGTagAttrs: false,
        },
      },
    },
  ],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['./static', '../src/svg/'],
};
export default config;