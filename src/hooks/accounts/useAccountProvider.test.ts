import { renderHookWithProviders } from 'test/utils';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';

describe('useAccountProvider', () => {
  it('should not return account provider', () => {
    const { result } = renderHookWithProviders(() => useAccountProvider());
    expect(result.current).not.toBeDefined();
  });

  it('should return valid account provider', () => {
    const { result } = renderHookWithProviders(() => useAccountProvider(), {
      preloadedState: {
        user: {
          _persist: {
            rehydrated: true,
            version: -1,
          },
          accountInfo: {
            accessToken: 'test',
            providerName: 'Google',
          },
        },
      },
    });

    expect(result.current).toBeDefined();
  });
});
