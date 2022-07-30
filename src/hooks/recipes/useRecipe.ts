import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useAppSelector } from 'hooks/store';

import { selectRecipes } from 'store/recipes';

export const useRecipe = (recipeId?: string, redirectUrl?: string) => {
  const navigate = useNavigate();
  const recipes = useAppSelector(selectRecipes);
  const recipe = recipeId ? recipes[recipeId] : undefined;

  useEffect(() => {
    if (!recipe) {
      toast.error('Przepis o takim ID nie istnieje!');
      if (redirectUrl) navigate(redirectUrl);
    }
  }, [navigate, recipe, redirectUrl]);

  return recipe;
};
