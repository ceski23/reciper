import React, { useMemo } from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router';
import globalStyles from 'globalStyles';
import { darkTheme, lightTheme } from 'theme';
import { routes } from 'routes';

import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import { DefaultToastOptions } from 'react-hot-toast/dist/core/types';
import { useMediaQuery } from 'beautiful-react-hooks';
import { media, mediaDown } from 'utils/mediaQueries';
import { useCheckUserAccount } from 'hooks/user';
import { useAppSelector } from 'hooks/store';
import { selectCurrentThemeType } from 'features/settings';

const App = () => {
  const content = useRoutes(routes);
  const isMobile = useMediaQuery(mediaDown('small'));
  const preffersDark = useMediaQuery(media.colorScheme('dark'));
  const themeType = useAppSelector(selectCurrentThemeType);
  useCheckUserAccount();

  const theme = useMemo(() => {
    switch (themeType) {
      case 'dark': return darkTheme;
      case 'light': return lightTheme;
      case 'system':
      default: return preffersDark ? darkTheme : lightTheme;
    }
  }, [preffersDark, themeType]);

  const toastOptions: DefaultToastOptions = {
    style: isMobile ? {
      width: '100%',
      maxWidth: 'unset',
    } : {},
  };

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />

      {content}

      <Toaster position="bottom-left" toastOptions={toastOptions} />
    </ThemeProvider>
  );
};

export default App;
