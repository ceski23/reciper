/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable max-len */
import styled from '@emotion/styled/macro';
import IntlMessageFormat from 'intl-messageformat';
import { VFC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PersistedState } from 'redux-persist';

import { Button } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { UserAvatar } from 'components/common/UserAvatar';
import { RadioGroup } from 'components/settings/RadioGroup';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppDispatch, useAppSelector } from 'hooks/store';

import { TaskListInfo } from 'services/accounts/AccountProvider';
import { AccountProviders, chooseAccountProvider } from 'services/accounts/providers';

import { getStoredRecipes, RecipesState, updateRecipesFromBackup } from 'store/recipes';
import {
  logoutUser, selectAccountInfo, selectShoppingList, selectUserInfo, setShoppingList,
} from 'store/user';

import { media } from 'utils/styles/mediaQueries';

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

const SyncButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  ${media.down('small')} {
    flex-direction: column;
  }
`;

const LoginButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const recipeText = new IntlMessageFormat(`
  {quantity, plural,
    one {# przepis}
    few {# przepisy}
    many {# przepisów}
    other {# przepisu}
  }
`, 'pl-PL');

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
  const [availableLists, setAvailableLists] = useState<TaskListInfo[]>([]);
  const shoppingList = useAppSelector(selectShoppingList);
  const user = useAppSelector(selectUserInfo);
  const accountProvider = useAccountProvider();

  useEffect(() => {
    if (!accountProvider) setAvailableLists([]);
    else {
      accountProvider.getTaskLists()
        .then((lists) => setAvailableLists(lists))
        .catch((err) => toast.error(err.toString()));
    }
  }, [accountProvider]);

  const handleSelectList = (listId: string) => {
    const list = availableLists.find((l) => l.id === listId);

    if (list && shoppingList?.id === list.id) dispatch(setShoppingList(undefined));
    else dispatch(setShoppingList(list));
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const handleBackupRecipes = async () => {
    const storedRecipes = await getStoredRecipes() as (RecipesState & PersistedState) | undefined;

    if (storedRecipes === undefined) toast.error('Brak przepisów do zapisania');
    else if (accountProvider) {
      try {
        const backupPromise = accountProvider.backupRecipes(storedRecipes);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        toast.promise(backupPromise, {
          loading: 'Zapisywanie przepisów...',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          success: `Zapisano ${recipeText.format({ quantity: Object.keys(storedRecipes.list).length })}`,
          error: 'Wystąpił problem podczas zapisywania przepisów',
        });

        await backupPromise;
      } catch (error) {
        toast.error('Wystąpił problem podczas zapisywania przepisów');
      }
    }
  };

  const handleRestoreRecipes = async () => {
    if (accountProvider) {
      try {
        const restorePromise = accountProvider.restoreRecipes();

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        toast.promise(restorePromise, {
          loading: 'Przywracanie przepisów...',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          success: (data) => `Przywrócono ${recipeText.format({ quantity: Object.keys(data.list).length })}`,
          error: 'Wystąpił problem podczas przywracania przepisów',
        });

        const persistedRecipes = await restorePromise;
        dispatch(updateRecipesFromBackup(persistedRecipes));
      } catch (error) {
        toast.error('Wystąpił problem podczas przywracania przepisów');
      }
    }
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

      {availableLists.length > 0 && (
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
      )}

      <SettingsContainer>
        <h3>Synchronizacja przepisów</h3>

        <SyncButtonsContainer>
          <Button onClick={handleBackupRecipes} disabled={!accountInfo}>Zapisz przepisy w chmurze</Button>
          <Button onClick={handleRestoreRecipes} disabled={!accountInfo}>Przywróć przepisy</Button>
        </SyncButtonsContainer>
      </SettingsContainer>

    </FluidContainer>
  );
};
