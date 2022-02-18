import { useMemo } from 'react';

import { useAppSelector } from 'hooks/store';

import { chooseAccountProvider } from 'services/accounts/providers';

import { selectAccountInfo } from 'store/user';

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
