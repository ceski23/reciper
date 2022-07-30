/* eslint-disable import/no-extraneous-dependencies */
import { ThemeProvider } from '@emotion/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks';
import { createMemoryHistory } from 'history';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { RootState, setupStore } from 'store';

import { lightTheme } from 'utils/styles/theme';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    ...renderOptions
  } : ExtendedRenderOptions = {},
) => {
  const store = setupStore(preloadedState);
  // const persistor = persistStore(store);

  // const loading = new Promise<void>((resolve) => {
  //   persistor.subscribe(() => {
  //     if (persistor.getState().bootstrapped) resolve();
  //   });
  // });

  const Wrapper: FC = ({ children }) => (
    <MemoryRouter>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          {children}
        </ThemeProvider>
      </Provider>
    </MemoryRouter>
  );

  // await loading;

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

type RenderHookCallback<TProps, TResult> = (props: TProps) => TResult;

interface ExtendedRenderHookOptions<TProps> extends RenderHookOptions<TProps> {
  preloadedState?: PreloadedState<RootState>;
  initialRoute?: string;
}

export const renderHookWithProviders = <TProps, TResult>(
  callback: RenderHookCallback<TProps, TResult>,
  {
    preloadedState,
    initialRoute,
    ...options
  }: ExtendedRenderHookOptions<TProps> = {},
) => {
  const store = setupStore(preloadedState);

  const history = createMemoryHistory({
    initialEntries: initialRoute ? [initialRoute] : undefined,
  });

  const Wrapper: FC = ({ children }) => (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          {children}
        </ThemeProvider>
      </Provider>
    </HistoryRouter>
  );

  return {
    store,
    history,
    ...renderHook(callback, { wrapper: Wrapper, ...options }),
  };
};
