import dayjs from 'dayjs';

import { RecipeFormFields } from 'components/recipes/forms/RecipeForm';

export const processRecipeFormData = (recipeFormData: RecipeFormFields) => {
  const recipe = Object.fromEntries(Object
    .entries(recipeFormData)
    .filter((([, value]) => {
      if (typeof value === 'number' && value === 0) return false;
      return true;
    }))
    .map(([key, value]) => {
      if (['ingredients', 'instructions'].includes(key)) {
        const items = value as RecipeFormFields['ingredients'];
        return [key, items.map((i) => i.value)];
      }

      return [key, value];
    }));

  if (recipe.prepTime && typeof recipe.prepTime === 'number') {
    recipe.prepTime = dayjs.duration({ minutes: recipe.prepTime }).toISOString();
  }

  return recipe;
};
