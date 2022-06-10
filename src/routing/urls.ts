import { createRouting, segment, arg } from 'ts-routes';

export const baseUrl = `${window.location.protocol}//${window.location.host}`;

export const urls = createRouting({
  home: segment`/`,
  colors: segment`/colors`,
  sharedRecipe: segment`/sharedRecipe`,
  search: segment`/search`,
  authRedirect: {
    ...segment`/auth`,
    children: {
      google: segment`/google`,
    },
  },
  tags: {
    ...segment`/tags`,
    children: {
      tag: segment`/${arg('tag')}`,
    },
  },
  settings: {
    ...segment`/settings`,
    children: {
      appearance: segment`/appearance`,
      account: segment`/account`,
      units: segment`/units`,
      about: segment`/about`,
    },
  },
  recipes: {
    ...segment`/recipes`,
    children: {
      byUrl: segment`/url/${arg('recipeUrl')}`,
      byId: segment`/id/${arg('recipeId')}`,
      new: {
        ...segment`/new`,
        children: {
          manual: segment`/manual`,
        },
      },
      edit: segment`/edit/${arg('recipeId')}`,
    },
  },
});
