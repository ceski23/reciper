import { useEffect } from 'react';
import { selectAccountInfo, setAccessToken, setUserInfo } from 'features/user';
import toast from 'react-hot-toast';
import { AuthError } from 'services/account/providers';
import { AuthToast } from 'components/AuthToast';
import { GoogleAccountProvider } from 'services/account/providers/google';
import { useAppDispatch, useAppSelector } from './store';
import { useAccountProvider } from './useAccountProvider';

export const useCheckUserAccount = () => {
  const accountProvider = useAccountProvider();
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(selectAccountInfo);

  useEffect(() => {
    accountProvider?.getUserInfo()
      .then((user) => {
        dispatch(setUserInfo(user));
      })
      .catch(async (err) => {
        if (err instanceof AuthError) {
          if (accountInfo?.refreshToken) {
            const accessToken = await GoogleAccountProvider.refreshAccessToken(accountInfo.refreshToken);
            dispatch(setAccessToken(accessToken));
          }
          else toast(<AuthToast/>);
        } else {
          toast.error((err as Error).message);
        }
      });
  }, [accountInfo, accountProvider, dispatch]);
};
