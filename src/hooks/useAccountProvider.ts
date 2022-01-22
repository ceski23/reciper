import { selectAccountInfo } from 'features/user';
import { useMemo } from 'react';
import { chooseAccountProvider } from 'services/account/providers';
import { useAppSelector } from './store';

export const useAccountProvider = () => {
  const accountInfo = useAppSelector(selectAccountInfo);

  const accountProvider = useMemo(() => {
    if (!accountInfo?.accessToken) return undefined;
    const providerType = chooseAccountProvider(accountInfo.type);
    // eslint-disable-next-line new-cap
    return new providerType(accountInfo.accessToken);
  }, [accountInfo]);

  return accountProvider;
};
