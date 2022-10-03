import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from '../src/utils/styles/globalStyles';
import { darkTheme, lightTheme } from '../src/utils/styles/theme';
import { MemoryRouter } from 'react-router';

/**
 * @type {import('@storybook/react').Parameters}
 **/
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'App theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

/**
 * @type {Array<import('@storybook/react').DecoratorFn>}
 **/
export const decorators = [
  (Story, { globals }) => (
    <MemoryRouter>
      <ThemeProvider theme={globals.theme === 'light' ? lightTheme : darkTheme}>
        <Global styles={globalStyles} />
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  )
];