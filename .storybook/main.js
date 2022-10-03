const tsconfigPaths = require('vite-tsconfig-paths').default;
const svgr = require('vite-plugin-svgr').default;

/**
 * @type {import('@storybook/builder-vite').StorybookViteConfig}
 **/
const mainConfig = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite"
  },
  features: {
    storyStoreV7: true
  },
  viteFinal: (config, options) => {
    config.plugins = [
      tsconfigPaths({}),
      svgr({
        svgrOptions: {},
      }),
      ...config.plugins
    ];
    return config;
  }
}

module.exports = mainConfig;