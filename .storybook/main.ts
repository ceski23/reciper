import { StorybookConfig } from '@storybook/react-vite';

const mainConfig: StorybookConfig = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  core: {},
  features: {
    storyStoreV7: true
  },
};

export default mainConfig;

export const framework = "@storybook/react";