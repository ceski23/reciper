/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  persistReducer, getStoredState, PersistConfig, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getRecipeId, Recipe } from 'services/recipes/providers';
import { RootState } from 'store';

export interface RecipesState {
  list: Record<string, Recipe>;
}

const initialState: RecipesState = {
  list: {},
};

// const migrations: MigrationManifest = {
//   0: (state: any) => ({
//     ...state, test: 'a',
//   }),
// };

const persistConfig: PersistConfig<RecipesState> = {
  key: 'recipes',
  storage,
  // version: 0,
  // migrate: createMigrate(migrations, { debug: true }),
  debug: true,
};

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    save: (state, { payload }: PayloadAction<Recipe>) => {
      state.list[getRecipeId(payload.url)] = payload;
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      delete state.list[payload];
    },
  },
});

export const updateRecipesFromBackup = (data: any) => ({
  type: REHYDRATE,
  key: persistConfig.key,
  payload: data,
});

export const { save: saveRecipe, remove: removeRecipe } = slice.actions;

export const selectRecipes = (state: RootState) => state.recipes.list;

export const selectRecipeIds = (state: RootState) => Object.keys(state.recipes.list);

export const getStoredRecipes = () => getStoredState(persistConfig);

export default persistReducer(persistConfig, slice.reducer);

export const selectAllTags = createSelector(selectRecipes, (recipes) => {
  const tags = Object.values(recipes).reduce((prev: string[], curr) => [...prev, ...curr.tags], []);
  return Array.from(new Set(tags));
});
