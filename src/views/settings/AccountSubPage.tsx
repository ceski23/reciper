/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable max-len */
import styled from '@emotion/styled';
import { VFC } from 'react';

import { Button } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { UserAvatar } from 'components/common/UserAvatar';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppDispatch, useAppSelector } from 'hooks/store';

// import { TaskListInfo } from 'services/accounts/AccountProvider';
import { AccountProviders, chooseAccountProvider } from 'services/accounts/providers';

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

const PROVIDERS = Object.values(AccountProviders).map((type) => {
  const provider = chooseAccountProvider(type);
  return {
    name: provider.providerName,
    icon: provider.icon,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    login: provider.startLogin,
  };
});

export const AccountSubPage: VFC = () => {
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(selectAccountInfo);
  // const [availableLists, setAvailableLists] = useState<TaskListInfo[]>([]);
  // const shoppingList = useAppSelector(selectShoppingList);
  const user = useAppSelector(selectUserInfo);
  const accountProvider = useAccountProvider();
  const syncEnabled = useAppSelector(selectRecipesAutoSync);

  // useEffect(() => {
  //   if (!accountProvider) setAvailableLists([]);
  //   else {
  //     accountProvider.getTaskLists()
  //       .then((lists) => setAvailableLists(lists))
  //       .catch((err) => toast.error(err.toString()));
  //   }
  // }, [accountProvider]);

  // const handleSelectList = (listId: string) => {
  //   const list = availableLists.find((l) => l.id === listId);

  //   if (list && shoppingList?.id === list.id) dispatch(setShoppingList(undefined));
  //   else dispatch(setShoppingList(list));
  // };

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
            {PROVIDERS.map(({ icon, name, login }) => (
              <Button icon={icon} key={name} onClick={login}>
                Zaloguj do konta
                {' '}
                {name}
              </Button>
            ))}
          </LoginButtonsContainer>
        )}
      </SettingsContainer>

      {/* {availableLists.length > 0 && (
        <RadioGroup
          title="Wybierz listę zakupów"
          hint="Po wybraniu listy zakupów będzie możliwe szybkie dodanie wszystkich składników do wybranej listy"
          name="shoppingList"
          value={shoppingList?.id}
          options={availableLists.map((list) => ({
            text: list.name,
            value: list.id,
          }))}
          onSelected={handleSelectList}
        />
      )} */}

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
