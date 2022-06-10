import React from 'react';
import { Outlet, RouteObject } from 'react-router';

import { urls } from 'routing/urls';

import { ColorDebug } from 'views/ColorDebug';
import { HomeScreen } from 'views/common/HomeScreen';
import { SearchScreen } from 'views/common/SearchScreen';
import { TagsScreen } from 'views/common/TagsScreen';
import { FindRecipeScreen } from 'views/recipes/FindRecipeScreen';
import { NewRecipeScreen } from 'views/recipes/NewRecipeScreen';
import { RecipeScreen } from 'views/recipes/RecipeScreen';
import { RecipesScreen } from 'views/recipes/RecipesScreen';
import { RedirectSharedRecipe } from 'views/recipes/RedirectSharedRecipe';
import { AboutPage } from 'views/settings/AboutPage';
import { AccountSubPage } from 'views/settings/AccountSubPage';
import { AppearanceSubPage } from 'views/settings/AppearanceSubPage';
import { SettingsScreen } from 'views/settings/SettingsScreen';
import { UnitsSubPage } from 'views/settings/UnitsSubPage';

const EditRecipeScreen = React.lazy(() => import('views/recipes/EditRecipeScreen'));
const NewManualRecipeScreen = React.lazy(() => import('views/recipes/NewManualRecipeScreen'));

const devRoutes = import.meta.env.DEV ? [
  { path: '/colors', element: <ColorDebug /> },
] : [];

const routes: RouteObject[] = [
  ...devRoutes,
  {
    path: urls.home.pattern,
    element: <Outlet />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: urls.search.pattern, element: <SearchScreen /> },
      { path: urls.sharedRecipe.pattern, element: <RedirectSharedRecipe /> },
      {
        path: urls.tags.pattern,
        element: <Outlet />,
        children: [
          { index: true, element: <TagsScreen /> },
          { path: urls.tags.tag.pattern, element: <TagsScreen /> },
        ],
      },
      {
        path: urls.settings.pattern,
        element: <Outlet />,
        children: [
          { index: true, element: <SettingsScreen /> },
          { path: urls.settings.appearance.pattern, element: <AppearanceSubPage /> },
          { path: urls.settings.account.pattern, element: <AccountSubPage /> },
          { path: urls.settings.units.pattern, element: <UnitsSubPage /> },
          { path: urls.settings.about.pattern, element: <AboutPage /> },
        ],
      },
      {
        path: urls.recipes.pattern,
        element: <Outlet />,
        children: [
          { index: true, element: <RecipesScreen /> },
          { path: urls.recipes.byId.pattern, element: <RecipeScreen /> },
          { path: urls.recipes.byUrl.pattern, element: <FindRecipeScreen /> },
          { path: urls.recipes.edit.pattern, element: <EditRecipeScreen /> },
          {
            path: urls.recipes.new.pattern,
            element: <Outlet />,
            children: [
              { index: true, element: <NewRecipeScreen /> },
              { path: urls.recipes.new.manual.pattern, element: <NewManualRecipeScreen /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
