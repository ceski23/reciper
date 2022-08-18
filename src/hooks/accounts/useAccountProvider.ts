import { useMemo } from 'react';

import { useAppSelector } from 'hooks/store';

import { getAccountProvider } from 'services/accounts/providers';

import { selectAccountInfo } from 'store/user';

export const useAccountProvider = () => {
  const accountInfo = useAppSelector(selectAccountInfo);

  const accountProvider = useMemo(() => {
    if (!accountInfo) return undefined;

    const AccountProvider = getAccountProvider(accountInfo.providerName);
    if (!AccountProvider) return undefined;

    const provider = new AccountProvider(accountInfo.accessToken);
    return provider;
  }, [accountInfo]);

  return accountProvider;
};
