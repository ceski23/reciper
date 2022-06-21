import { AnimatePresence } from 'framer-motion';
import { useEffect, VFC } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useRoutes } from 'react-router';

import { Page } from 'components/common/Page';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppDispatch, useAppSelector } from 'hooks/store';

import routes from 'routing/routes';

import { AuthError, chooseAccountProvider } from 'services/accounts/providers';

import { syncRecipes } from 'store/recipes';
import { selectAccountInfo, setUserInfo } from 'store/user';

export const AuthWrapper: VFC = () => {
  const accountProvider = useAccountProvider();
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(selectAccountInfo);
  const content = useRoutes(routes);
  const location = useLocation();

  const handleExitComplete = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    accountProvider?.getUserInfo()
      .then((user) => {
        dispatch(setUserInfo(user));
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        dispatch(syncRecipes());
      })
      .catch((err) => {
        if (err instanceof AuthError) {
          // if (accountInfo?.refreshToken) {
          //   const accessToken = await GoogleAccountProvider.refreshAccessToken(
          //     accountInfo.refreshToken,
          //   );
          //   dispatch(setAccessToken(accessToken));
          // } else toast(<AuthToast />);
          if (accountInfo?.type) chooseAccountProvider(accountInfo.type).startLogin();
        } else {
          toast.error((err as Error).message);
        }
      });
  }, [accountInfo?.type, accountProvider, dispatch]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <Page key={location.pathname}>
        {content}
      </Page>
    </AnimatePresence>
  );
};

export default AuthWrapper;
