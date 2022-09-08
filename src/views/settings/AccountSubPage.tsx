/* eslint-disable max-len */
import styled from '@emotion/styled';
import { ChangeEventHandler, VFC } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from 'components/common/Button';
import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { UserAvatar } from 'components/common/UserAvatar';
import { recipeSchema } from 'components/recipes/forms/RecipeForm';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppDispatch, useAppSelector } from 'hooks/store';

import { ACCOUNT_PROVIDERS } from 'services/accounts/providers';

import {
  addMultipleRecipes, selectRecipes, syncRecipes,
} from 'store/recipes';
import { selectRecipesAutoSync, setAutoRecipesSync } from 'store/settings';
import {
  logoutUser, selectAccountInfo, selectUserInfo,
} from 'store/user';

import { nonNullable } from 'utils/guards';
import { color } from 'utils/styles/theme';

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

const Hint = styled.p`
  font-size: 12px;
  line-height: 1.4;
  margin-top: -10px;
  color: ${color('textalt')};
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: fit-content;
  }
`;

const InvisibleFileInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
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
  const recipes = useAppSelector(selectRecipes);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  const handleAutoSyncChange = (enabled: boolean) => {
    dispatch(setAutoRecipesSync(enabled));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (enabled) dispatch(syncRecipes());
  };

  const handleRecipesImport: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!event.currentTarget.files) return;

    const [file] = event.currentTarget.files;
    const text = await file.text();

    const schema = z.record(recipeSchema);
    try {
      const importedRecipes = await schema.parseAsync(JSON.parse(text));
      const recipesList = Object.entries(importedRecipes).map(([id, recipe]) => ({ ...recipe, id }));
      dispatch(addMultipleRecipes(recipesList));

      toast.success('Pomyślnie zaimportowano przepisy');
    } catch (error) {
      toast.error('Wystąpił błąd podczas importowania przepisów');
    }
  };

  const handleRecipesExport = () => {
    const json = JSON.stringify(recipes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const tmpAnchor = document.createElement('a');
    tmpAnchor.href = url;
    tmpAnchor.download = `recipes-${new Date().toISOString()}.json`;
    tmpAnchor.click();

    URL.revokeObjectURL(url);
  };

  const handleUrlsExport = () => {
    const urls = Object.values(recipes).map((recipe) => recipe.url).filter(nonNullable);
    const text = urls.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const tmpAnchor = document.createElement('a');
    tmpAnchor.href = url;
    tmpAnchor.download = `recipes-urls-${new Date().toISOString()}.txt`;
    tmpAnchor.click();

    URL.revokeObjectURL(url);
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

      <div>
        <h3>Import / eksport przepisów</h3>
        <Hint>Za pomocą poniższych opcji możesz importować i eksportować pliki z zapisanymi przepisami.</Hint>

        <ButtonsContainer>
          <Button size="small">
            Importuj przepisy z pliku
            <InvisibleFileInput type="file" accept="application/json" onChange={handleRecipesImport} />
          </Button>

          <Button size="small" onClick={handleRecipesExport}>Eksportuj przepisy do pliku</Button>
          <Button size="small" onClick={handleUrlsExport}>Eksportuj adresy URL do pliku</Button>
        </ButtonsContainer>
      </div>

    </FluidContainer>
  );
};
