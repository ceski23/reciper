import { Global, ThemeProvider } from '@emotion/react/macro';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Suspense, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { DefaultToastOptions } from 'react-hot-toast/dist/core/types';
import { useRoutes } from 'react-router';

import { useAppSelector } from 'hooks/store';

import authRoutes from 'routing/authRoutes';

import { selectCurrentThemeType } from 'store/settings';

import globalStyles from 'utils/styles/globalStyles';
import { media, mediaDown } from 'utils/styles/mediaQueries';
import { darkTheme, lightTheme } from 'utils/styles/theme';

const App = () => {
  const authContent = useRoutes(authRoutes);
  const isMobile = useMediaQuery(mediaDown('small'));
  const preffersDark = useMediaQuery(media.colorScheme('dark'));
  const themeType = useAppSelector(selectCurrentThemeType);

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

      <Suspense fallback={<p>Ładowanie...</p>}>
        {authContent}
      </Suspense>

      <Toaster position="bottom-left" toastOptions={toastOptions} />
    </ThemeProvider>
  );
};

export default App;
