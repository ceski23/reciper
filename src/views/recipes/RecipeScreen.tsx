import { VFC, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Recipe } from 'components/recipes/Recipe';

import { useWakelock } from 'hooks/recipes/useWakelock';
import { useAppSelector } from 'hooks/store';

import { urls } from 'routing/urls';

import { selectRecipes } from 'store/recipes';

export const RecipeScreen: VFC = () => {
  const navigate = useNavigate();
  const recipes = useAppSelector(selectRecipes);
  const params = useParams();
  const recipe = params.recipeId ? recipes[params.recipeId] : undefined;

  // Don't fade the screen when recipe screen is mounted
  useWakelock();

  useEffect(() => {
    if (params.recipeId && !(params.recipeId in recipes)) {
      toast.error('Przepis o takim ID nie istnieje!');
      navigate(urls.home);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.recipeId]);

  return recipe ? <Recipe recipe={recipe} /> : null;
};
