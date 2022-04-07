import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

import { useAppSelector } from 'hooks/store';

import { selectRecipes } from 'store/recipes';

export const useRecipe = (recipeId?: string, redirectUrl?: string) => {
  const navigate = useNavigate();
  const recipes = useAppSelector(selectRecipes);
  const params = useParams();
  const recipe = recipeId ? recipes[recipeId] : undefined;

  useEffect(() => {
    if (params.recipeId && !(params.recipeId in recipes)) {
      toast.error('Przepis o takim ID nie istnieje!');
      if (redirectUrl) navigate(redirectUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.recipeId]);

  return recipe;
};
