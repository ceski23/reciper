/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import {
  persistReducer, getStoredState, PersistConfig, REHYDRATE, createMigrate,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootState } from 'store';

import { IngredientType } from 'services/ingredients/database';
import { Recipe } from 'services/recipes';
import {
  pancakes, kurczak, pierniczki, ramen,
} from 'services/recipes/samples';
import RecipeSearch from 'services/search';

export interface RecipesState {
  list: Record<string, Recipe>;
}

const initialState: RecipesState = {
  list: {
    [pancakes.id]: pancakes,
    [ramen.id]: ramen,
    [kurczak.id]: kurczak,
    [pierniczki.id]: pierniczki,
  },
};

type RecipesStateV1 = RecipesState;

type RecipesStateV0 = Omit<RecipesStateV1, 'list'> & {
  list: Record<string, Omit<Recipe, 'ingredients' | 'instructions'> & {
    ingredients: string[]
    instructions: string[]
    prepTime: string
  }>;
};

type MigrationState = RecipesStateV0 | RecipesStateV1;

const migrations = {
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
};

const persistConfig: PersistConfig<RecipesState> = {
  key: 'recipes',
  storage,
  version: 1,
  migrate: createMigrate<MigrationState>(migrations),
  debug: true,
};

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    save: (state, { payload }: PayloadAction<Recipe>) => {
      state.list[payload.id] = payload;
    },
    removeById: (state, { payload }: PayloadAction<string>) => {
      delete state.list[payload];
    },
    removeByUrl: (state, { payload }: PayloadAction<string>) => {
      const id = Object.values(state.list).find((recipe) => recipe.url === payload)?.id;
      if (id) delete state.list[id];
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateRecipesFromBackup = (data: any) => ({
  type: REHYDRATE,
  key: persistConfig.key,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  payload: data,
});

export const {
  save: saveRecipe,
  removeById: removeRecipeById,
  removeByUrl: removeRecipeByUrl,
} = slice.actions;

export const selectRecipes = (state: RootState) => state.recipes.list;

export const selectRecipeIds = (state: RootState) => Object.keys(state.recipes.list);

export const getStoredRecipes = () => getStoredState(persistConfig);

export const searchRecipes = createSelector(
  [
    selectRecipes,
    (_state, name: string) => name,
    (_state, _name, ingredients: IngredientType[]) => ingredients,
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
