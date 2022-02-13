import { VFC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { selectRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import toast from 'react-hot-toast';
import { urls } from 'urls';
import { Recipe } from 'components/Recipe';
import { useWakelock } from 'hooks/useWakelock';

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
