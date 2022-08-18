/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */

import { GoogleAccountProvider } from 'services/accounts/providers/google';

export const ACCOUNT_PROVIDERS = [
  GoogleAccountProvider,
] as const;

export type AccountProviderName = typeof ACCOUNT_PROVIDERS[number]['providerName'];

export const getAccountProvider = (name: string) => (
  ACCOUNT_PROVIDERS.find((provider) => provider.providerName === name)
);

export class AuthError extends Error {
  name = 'AuthError';

  message = 'Access token expired or invalid';
}
