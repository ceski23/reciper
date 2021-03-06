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

export const NewManualRecipeScreen: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    const recipe = {
      ...data,
      id: nanoid(),
    };

    if (isValidRecipe(recipe)) {
      dispatch(saveRecipe(recipe));

      navigate(urls.recipes.byId({
        recipeId: recipe.id,
      }));
    } else throw Error('Invalid recipe');
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Nowy przepis" id="new-recipe" />
      <RecipeForm onSubmit={handleSubmit} aria-labelledby="new-recipe" />
    </FluidContainer>
  );
};

export default NewManualRecipeScreen;
