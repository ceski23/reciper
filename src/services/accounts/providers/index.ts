/* eslint-disable import/no-cycle */
/* eslint-disable max-classes-per-file */

import { GoogleAccountProvider } from 'services/accounts/providers/google';

export enum AccountProviders {
  GOOGLE = 'google',
}

export const chooseAccountProvider = (type: AccountProviders) => {
  switch (type) {
    case AccountProviders.GOOGLE:
      return GoogleAccountProvider;

    default:
      throw Error('Unknown account provider');
  }
};

export class AuthError extends Error {
  name = 'AuthError';

  message = 'Access token expired or invalid';
}
