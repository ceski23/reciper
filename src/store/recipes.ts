/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Fuse from 'fuse.js';
import {
  persistReducer, getStoredState, PersistConfig, REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootState } from 'store';

import { IngredientType } from 'services/ingredients/database';
import { Recipe } from 'services/recipes';
import {
  pancakes, kurczak, pierniczki, ramen,
} from 'services/recipes/samples';

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

const filterByIngredients = (recipes: Recipe[], ingredients: IngredientType[]) => (
  recipes.filter((result) => {
    const hasAllRequiredIngredients = ingredients.every((requiredIngredient) => {
      const hasRequiredIngredient = result.ingredients.some((ingredient) => (
        requiredIngredient.pattern.test(ingredient)
      ));

      return hasRequiredIngredient;
    });

    return hasAllRequiredIngredients;
  })
);

const filterByQuery = (recipes: Recipe[], query: string) => {
  const searcher = new Fuse(recipes, {
    keys: [
      { name: 'name', weight: 3 },
      { name: 'tags', weight: 1 },
    ],
    // minMatchCharLength: 3,
  });

  return searcher
    .search(query)
    .map((r) => r.item);
};

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
  ],
  (recipes, name, ingredients) => {
    let recipesList = Object.values(recipes);

    if (name !== '') recipesList = filterByQuery(recipesList, name);
    if (ingredients.length !== 0) recipesList = filterByIngredients(recipesList, ingredients);

    return recipesList;
  },
);

export default persistReducer(persistConfig, slice.reducer);

export const selectAllTags = createSelector(selectRecipes, (recipes) => {
  const tags = Object.values(recipes).reduce((prev: string[], curr) => [...prev, ...curr.tags], []);
  return Array.from(new Set(tags));
});
