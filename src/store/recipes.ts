/* eslint-disable no-param-reassign */
import {
  createAsyncThunk, createSelector, createSlice, isAnyOf, PayloadAction,
} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
  persistReducer, getStoredState, PersistConfig, REHYDRATE, createMigrate,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  AppDispatch, AppStartListening, RootState,
} from 'store';

import { chooseAccountProvider } from 'services/accounts/providers';
import { KnownIngredient } from 'services/ingredients/models';
import { Recipe } from 'services/recipes';
import {
  pancakes, kurczak, pierniczki, ramen,
} from 'services/recipes/samples';
import RecipeSearch from 'services/search';
import { synchronizeRecipes } from 'services/synchronization';

export interface RecipesState {
  list: Record<string, Recipe>;
  status: Record<string, {
    localHash: string,
    remoteHash: string
  }>;
}

const initialState: RecipesState = {
  list: {
    [pancakes.id]: pancakes,
    [ramen.id]: ramen,
    [kurczak.id]: kurczak,
    [pierniczki.id]: pierniczki,
  },
  status: {},
};

type RecipesStateV2 = RecipesState;

type RecipesStateV1 = Omit<RecipesStateV2, 'status'>;

type RecipesStateV0 = Omit<RecipesStateV1, 'list'> & {
  list: Record<string, Omit<Recipe, 'ingredients' | 'instructions'> & {
    ingredients: string[]
    instructions: string[]
    prepTime: string
  }>;
};

type MigrationState = RecipesStateV0 | RecipesStateV1;

export const migrate = createMigrate<MigrationState>({
  1: (state: RecipesStateV0): RecipesStateV1 => ({
    list: Object.fromEntries(Object.entries(state.list).map(([id, recipe]) => (
      [id, {
        ...recipe,
        ingredients: recipe.ingredients.map((i) => ({ text: i })),
        instructions: recipe.instructions.map((i) => ({ text: i })),
        prepTime: recipe.prepTime ? dayjs.duration(recipe.prepTime).asMinutes() : undefined,
      }]
    ))),
  }),
  2: (state: RecipesStateV1): RecipesStateV2 => ({
    ...state,
    status: {},
  }),
});

export const RECIPES_STATE_VERSION = 2;

const persistConfig: PersistConfig<RecipesState> = {
  key: 'recipes',
  storage,
  version: RECIPES_STATE_VERSION,
  migrate,
  debug: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateRecipesFromBackup = (data: any) => ({
  type: REHYDRATE,
  key: persistConfig.key,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  payload: data,
});

export const syncRecipes = createAsyncThunk<void, void, {
  dispatch: AppDispatch,
  state: RootState
}>(
  'recipes/sync',
  async (_, { dispatch, getState }) => {
    const syncEnabled = getState().settings.autoRecipesSync;
    if (!syncEnabled) return;

    // eslint-disable-next-line prefer-destructuring
    const accountInfo = getState().user.accountInfo;
    if (!accountInfo) return;

    const providerType = chooseAccountProvider(accountInfo.type);
    // eslint-disable-next-line new-cap
    const accountProvider = new providerType(accountInfo.accessToken);

    const remoteData = await accountProvider.restoreRecipes();
    const localData = getState().recipes;

    const newData = await synchronizeRecipes(remoteData, localData);

    dispatch(updateRecipesFromBackup(newData));
    await accountProvider.backupRecipes(newData);
  },
);

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    save: (state, { payload }: PayloadAction<Recipe>) => {
      state.list[payload.id] = payload;
    },
    addMultiple: (state, { payload }: PayloadAction<Recipe[]>) => {
      payload.forEach((recipe) => {
        state.list[recipe.id] = recipe;
      });
    },
    removeById: (state, { payload }: PayloadAction<string>) => {
      delete state.list[payload];
    },
    removeByUrl: (state, { payload }: PayloadAction<string>) => {
      const id = Object.values(state.list).find((recipe) => recipe.url === payload)?.id;
      if (id) delete state.list[id];
    },
    removeAll: (state) => {
      state.list = {};
    },
  },
});

export const addRecipesSyncListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(
      slice.actions.addMultiple,
      slice.actions.removeAll,
      slice.actions.removeById,
      slice.actions.removeByUrl,
      slice.actions.save,
    ),
    effect: async (_, { dispatch }) => {
      await dispatch(syncRecipes());
    },
  });
};

export const {
  save: saveRecipe,
  removeById: removeRecipeById,
  removeByUrl: removeRecipeByUrl,
  removeAll: removeAllRecipes,
  addMultiple: addMultipleRecipes,
} = slice.actions;

export const selectRecipesData = (state: RootState) => state.recipes;

export const selectRecipes = (state: RootState) => state.recipes.list;

export const selectRecipeIds = (state: RootState) => Object.keys(state.recipes.list);

export const getStoredRecipes = () => getStoredState(persistConfig);

export const searchRecipes = createSelector(
  [
    selectRecipes,
    (_state, name: string) => name,
    (_state, _name, ingredients: KnownIngredient[]) => ingredients,
    (_state, _name, _ingredients, duration: number) => duration,
  ],
  (recipes, name, ingredients, duration) => {
    const recipesList = Object.values(recipes);
    const recipeSearch = new RecipeSearch(recipesList);

    return recipeSearch.search({
      query: name,
      ingredients,
      duration,
    });
  },
);

export default persistReducer(persistConfig, slice.reducer);

export const selectAllTags = createSelector(selectRecipes, (recipes) => {
  const tags = Object.values(recipes).reduce((prev: string[], curr) => [...prev, ...curr.tags], []);
  return Array.from(new Set(tags));
});
