import React from 'react';
import { RouteObject } from 'react-router';
import { ColorsDebug } from 'views/ColorsDebug';
import { GoogleAuthScreen } from 'views/auth/GoogleAuthScreen';
import { AccountSubPage } from 'views/settings/AccountSubPage';
import { AppearanceSubPage } from 'views/settings/AppearanceSubPage';
import { SettingsScreen } from 'views/settings/SettingsScreen';
import { TagsScreen } from 'views/TagsScreen';
import { UnitsSubPage } from 'views/settings/UnitsSubPage';
import { HomeScreen } from './views/HomeScreen';
import { RecipeScreen } from './views/RecipeScreen';
import { urls } from 'urls';

export const routes: RouteObject[] = [
  { path: urls.home, element: <HomeScreen /> },
  { path: urls.recipe, element: <RecipeScreen /> },
  { path: urls.colors, element: <ColorsDebug /> },
  { path: urls.authRedirect.google, element: <GoogleAuthScreen /> },
  { path: urls.tags, element: <TagsScreen /> },

  { path: String(urls.settings), element: <SettingsScreen /> },
  { path: urls.settings.appearance, element: <AppearanceSubPage /> },
  { path: urls.settings.account, element: <AccountSubPage /> },
  { path: urls.settings.units, element: <UnitsSubPage /> },
];
