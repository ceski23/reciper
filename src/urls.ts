import { include } from 'named-urls';

export const baseUrl = `${window.location.protocol}//${window.location.host}`;

export const urls = {
  home: '/',
  recipes: include('/recipes', {
    recipe: ':recipeUrl',
  }),
  sharedRecipe: '/sharedRecipe',
  colors: '/colors',
  authRedirect: {
    google: '/auth/google',
  },
  settings: include('/settings', {
    appearance: 'appearance',
    account: 'account',
    units: 'units',
  }),
  tags: include('/tags', {
    tag: ':tag',
  }),
  search: '/search',
};
