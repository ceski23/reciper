import styled from '@emotion/styled';
import { VFC } from 'react';

import { Button } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { UserAvatar } from 'components/common/UserAvatar';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppDispatch, useAppSelector } from 'hooks/store';

import { ACCOUNT_PROVIDERS } from 'services/accounts/providers';

import { syncRecipes } from 'store/recipes';
import { selectRecipesAutoSync, setAutoRecipesSync } from 'store/settings';
import {
  logoutUser, selectAccountInfo, selectUserInfo,
} from 'store/user';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const UserName = styled.p`
  margin-right: auto;
`;

const LoginButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const availableProviders = ACCOUNT_PROVIDERS.map((provider) => ({
  name: provider.providerName,
  icon: provider.icon,
  login: provider.startLogin,
}));

export const AccountSubPage: VFC = () => {
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(selectAccountInfo);
  const user = useAppSelector(selectUserInfo);
  const accountProvider = useAccountProvider();
  const syncEnabled = useAppSelector(selectRecipesAutoSync);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const handleAutoSyncChange = (enabled: boolean) => {
    dispatch(setAutoRecipesSync(enabled));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (enabled) dispatch(syncRecipes());
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Konto" />

      <SettingsContainer>
        {accountInfo ? (
          <>
            <h3>Zalogowany jako</h3>
            <AccountInfo>
              <UserAvatar src={user?.image} />
              <UserName>
                {user?.firstName}
                {' '}
                {user?.lastName}
              </UserName>
              <Button onClick={handleLogoutClick}>
                Wyloguj
              </Button>
            </AccountInfo>
          </>
        ) : (
          <LoginButtonsContainer>
            {availableProviders.map(({ icon, name, login }) => (
              <Button icon={icon} key={name} onClick={login}>
                {`Zaloguj do konta ${name}`}
              </Button>
            ))}
          </LoginButtonsContainer>
        )}
      </SettingsContainer>

      {accountProvider && (
        <CheckboxSetting
          title="Synchronizacja przepisów"
          hint="Automatycznie synchronizuj przepisy"
          name="autoSyncRecipes"
          checked={syncEnabled}
          onChange={handleAutoSyncChange}
        />
      )}

    </FluidContainer>
  );
};
