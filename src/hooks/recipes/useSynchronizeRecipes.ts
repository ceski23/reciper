import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppDispatch } from 'hooks/store';

import { synchronizeRecipes } from 'services/synchronization';

import { selectRecipesData, updateRecipesFromBackup } from 'store/recipes';

export const useSynchronizeRecipes = () => {
  const recipesData = useSelector(selectRecipesData);
  const accountProvider = useAccountProvider();
  const dispatch = useAppDispatch();
  const [syncInProgress, setSyncInProgress] = useState(false);

  const synchronize = async () => {
    if (accountProvider) {
      try {
        setSyncInProgress(true);

        const remoteData = await accountProvider.restoreRecipes();
        const newData = await synchronizeRecipes(remoteData, recipesData);

        dispatch(updateRecipesFromBackup(newData));
        await accountProvider.backupRecipes(newData);
      } finally {
        setSyncInProgress(false);
      }
    }
  };

  return {
    synchronize, syncInProgress,
  };
};
