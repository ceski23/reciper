import { RouteObject } from 'react-router';

import { urls } from 'routing/urls';

import { ColorDebug } from 'views/ColorDebug';
import { HomeScreen } from 'views/common/HomeScreen';
import { SearchScreen } from 'views/common/SearchScreen';
import { TagsScreen } from 'views/common/TagsScreen';
import { EditRecipeScreen } from 'views/recipes/EditRecipeScreen';
import { FindRecipeScreen } from 'views/recipes/FindRecipeScreen';
import { NewManualRecipeScreen } from 'views/recipes/NewManualRecipeScreen';
import { NewRecipeScreen } from 'views/recipes/NewRecipeScreen';
import { RecipeScreen } from 'views/recipes/RecipeScreen';
import { RecipesScreen } from 'views/recipes/RecipesScreen';
import { RedirectSharedRecipe } from 'views/recipes/RedirectSharedRecipe';
import { AboutPage } from 'views/settings/AboutPage';
import { AccountSubPage } from 'views/settings/AccountSubPage';
import { AppearanceSubPage } from 'views/settings/AppearanceSubPage';
import { SettingsScreen } from 'views/settings/SettingsScreen';
import { UnitsSubPage } from 'views/settings/UnitsSubPage';

const devRoutes = process.env.NODE_ENV === 'development' ? [
  { path: '/colors', element: <ColorDebug /> },
] : [];

const routes: RouteObject[] = [
  ...devRoutes,
  { path: urls.home, element: <HomeScreen /> },
  { path: String(urls.recipes), element: <RecipesScreen /> },
  { path: urls.recipes.recipeById, element: <RecipeScreen /> },
  { path: urls.recipes.recipeByUrl, element: <FindRecipeScreen /> },
  { path: String(urls.recipes.new), element: <NewRecipeScreen /> },
  { path: urls.sharedRecipe, element: <RedirectSharedRecipe /> },
  { path: urls.recipes.new.manual, element: <NewManualRecipeScreen /> },
  { path: urls.recipes.edit, element: <EditRecipeScreen /> },
  { path: String(urls.tags), element: <TagsScreen /> },
  { path: urls.tags.tag, element: <TagsScreen /> },
  { path: urls.search, element: <SearchScreen /> },
  { path: String(urls.settings), element: <SettingsScreen /> },
  { path: urls.settings.appearance, element: <AppearanceSubPage /> },
  { path: urls.settings.account, element: <AccountSubPage /> },
  { path: urls.settings.units, element: <UnitsSubPage /> },
  { path: urls.settings.about, element: <AboutPage /> },
];

export default routes;
