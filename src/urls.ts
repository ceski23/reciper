import { include } from "named-urls";

export const baseUrl = `${window.location.protocol}//${window.location.host}`;

export const urls = {
  home: '/',
  recipe: '/recipe/:recipeUrl/',
  colors: '/colors',
  authRedirect: {
    google: '/auth/google',
  },
  settings: include('/settings', {
    appearance: 'appearance',
    account: 'account',
    units: 'units',
  }),
  tags: '/tags/:tag',
};