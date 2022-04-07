import dayjs from 'dayjs';
import { reverse } from 'named-urls';
import { nanoid } from 'nanoid';
import { VFC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { RecipeForm, RecipeFormFields } from 'components/recipes/forms/RecipeForm';

import { useAppDispatch } from 'hooks/store';

import { urls } from 'routing/urls';

import { isValidRecipe } from 'services/recipes';

import { saveRecipe } from 'store/recipes';

import { processRecipeFormData } from 'utils/recipes';

export const NewManualRecipeScreen: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    const recipe = processRecipeFormData(data);
    recipe.id = nanoid();

    if (isValidRecipe(recipe)) {
      dispatch(saveRecipe(recipe));

      navigate(reverse(urls.recipes.recipeById, {
        recipeId: recipe.id,
      }));
    } else throw Error('Invalid recipe');
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Nowy przepis" />
      <RecipeForm onSubmit={handleSubmit} />
    </FluidContainer>
  );
};
