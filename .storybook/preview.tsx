import React from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import globalStyles from '../src/utils/styles/globalStyles';
import { darkTheme, lightTheme } from '../src/utils/styles/theme';
import { MemoryRouter } from 'react-router';
import type { DecoratorFn } from '@storybook/react'

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

export const decorators: DecoratorFn[] = [
  (Story, { globals }) => (
    <MemoryRouter>
      <ThemeProvider theme={globals.theme === 'light' ? lightTheme : darkTheme}>
        <Global styles={globalStyles} />
        <Story />
      </ThemeProvider>
    </MemoryRouter>
  )
];