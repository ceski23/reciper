import { RouteObject } from 'react-router';
import { GoogleAuthScreen } from 'views/auth/GoogleAuthScreen';
import { AccountSubPage } from 'views/settings/AccountSubPage';
import { AppearanceSubPage } from 'views/settings/AppearanceSubPage';
import { SettingsScreen } from 'views/settings/SettingsScreen';
import { TagsScreen } from 'views/TagsScreen';
import { UnitsSubPage } from 'views/settings/UnitsSubPage';
import { urls } from 'urls';
import { RedirectSharedRecipe } from 'views/RedirectSharedRecipe';
import { RecipesScreen } from 'views/RecipesScreen';
import { RecipeScreen } from 'views/RecipeScreen';
import { HomeScreen } from 'views/HomeScreen';
import { AuthWrapper } from 'components/AuthWrapper';
import { SearchScreen } from 'views/SearchScreen';
import { FindRecipeScreen } from 'views/FindRecipeScreen';

export const routes: RouteObject[] = [
  { path: urls.home, element: <HomeScreen /> },
  { path: String(urls.recipes), element: <RecipesScreen /> },
  { path: urls.recipes.recipeById, element: <RecipeScreen /> },
  { path: urls.recipes.recipeByUrl, element: <FindRecipeScreen /> },
  { path: urls.sharedRecipe, element: <RedirectSharedRecipe /> },
  { path: String(urls.tags), element: <TagsScreen /> },
  { path: urls.tags.tag, element: <TagsScreen /> },
  { path: urls.search, element: <SearchScreen /> },

  { path: String(urls.settings), element: <SettingsScreen /> },
  { path: urls.settings.appearance, element: <AppearanceSubPage /> },
  { path: urls.settings.account, element: <AccountSubPage /> },
  { path: urls.settings.units, element: <UnitsSubPage /> },
];

export const authRoutes: RouteObject[] = [
  { path: urls.authRedirect.google, element: <GoogleAuthScreen /> },
  { path: '*', element: <AuthWrapper /> },
];
