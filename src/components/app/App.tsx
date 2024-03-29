import { Global, ThemeProvider } from '@emotion/react';
import { Globals } from '@react-spring/web';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Suspense, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { DefaultToastOptions } from 'react-hot-toast/dist/core/types';
import { useRoutes } from 'react-router';

import { Loading } from 'components/common/Loading';

import { useAppSelector } from 'hooks/store';

import authRoutes from 'routing/authRoutes';

import { selectCurrentThemeType, selectDisableAnimations } from 'store/settings';

import globalStyles from 'utils/styles/globalStyles';
import { media, mediaDown } from 'utils/styles/mediaQueries';
import { darkTheme, lightTheme } from 'utils/styles/theme';

const App = () => {
  const authContent = useRoutes(authRoutes);
  const isMobile = useMediaQuery(mediaDown('small'));
  const preffersDark = useMediaQuery(media.colorScheme('dark'));
  const themeType = useAppSelector(selectCurrentThemeType);
  const disableAnimations = useAppSelector(selectDisableAnimations);

  useEffect(() => {
    Globals.assign({ skipAnimation: disableAnimations });
  }, [disableAnimations]);

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

      <Suspense fallback={<Loading>Ładowanie...</Loading>}>
        {authContent}
      </Suspense>

      <Toaster position="bottom-left" toastOptions={toastOptions} />
    </ThemeProvider>
  );
};

export default App;
