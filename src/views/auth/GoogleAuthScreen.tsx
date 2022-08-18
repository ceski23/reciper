import { useEffect, useState, VFC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Button } from 'components/common/Button';
import { ErrorInfo } from 'components/common/ErrorInfo';
import { LinkButton } from 'components/common/LinkButton';

import { useAppDispatch } from 'hooks/store';

import { urls } from 'routing/urls';

import { GoogleAccountProvider } from 'services/accounts/providers/google';

import { setAccountProvider } from 'store/user';

export const GoogleAuthScreen: VFC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>();

  // useEffect(() => {
  //   const params = Object.fromEntries(new URLSearchParams(location.search));

  //   if ('error' in params) {
  //     toast.error(params.error);
  //     navigate(urls.settings.account, { replace: true });
  //   } else {
  //     GoogleAccountProvider.completeLogin().then((response) => {
  //       dispatch(setAccountProvider({
  //         accessToken: response.access_token,
  //         refreshToken: response.refresh_token,
  //         type: AccountProviders.GOOGLE,
  //       }));
  //       navigate(params.state || urls.home, { replace: true });
  //     }).catch(() => {
  //       console.log('Error while authenticating');
  //     });
  //   }
  // }, [location.hash, dispatch, navigate, location.search]);

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.hash.substring(1)));

    if ('error' in params) {
      setError(params.error);
    } else {
      dispatch(setAccountProvider({
        accessToken: params.access_token,
        providerName: 'Google',
      }));

      navigate(params.state ?? urls.home, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return error ? (
    <ErrorInfo
      error={`Wystąpił błąd: ${error}`}
      actions={(
        <>
          <Button onClick={() => GoogleAccountProvider.startLogin()}>
            Spróbuj ponownie
          </Button>
          <LinkButton to={urls.home()}>Powrót</LinkButton>
        </>
      )}
    />
  ) : null;
};
