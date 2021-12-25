import { setAccountProvider } from 'features/user';
import { useAppDispatch } from 'hooks/store';
import { useEffect, VFC } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import { AccountProviders } from 'services/account/providers';
import { GoogleAccountProvider } from 'services/account/providers/google';
import { urls } from 'urls';

export const GoogleAuthScreen: VFC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));

    if ('error' in params) {
      toast.error(params.error);
      navigate(urls.settings.account, { replace: true });
    } else {
      GoogleAccountProvider.completeLogin().then(response => {
        dispatch(setAccountProvider({
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          type: AccountProviders.GOOGLE,
        }));
        navigate(params.state || urls.home, { replace: true });
      });
    }
  }, [location.hash, dispatch, navigate, location.search]);

  return null;
};
