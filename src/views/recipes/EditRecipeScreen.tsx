import { VFC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { RecipeForm, RecipeFormFields } from 'components/recipes/forms/RecipeForm';

import { useRecipe } from 'hooks/recipes/useRecipe';
import { useAppDispatch } from 'hooks/store';

import { urls } from 'routing/urls';

import { isValidRecipe } from 'services/recipes';

import { saveRecipe } from 'store/recipes';

export const EditRecipeScreen: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const recipe = useRecipe(params.recipeId, urls.home());

  const handleSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    const editedRecipe = {
      ...data,
      id: recipe?.id,
      color: recipe?.color,
    };

    if (isValidRecipe(editedRecipe)) {
      dispatch(saveRecipe(editedRecipe));

      navigate(urls.recipes.byId({
        recipeId: editedRecipe.id,
      }));
    } else throw Error('Invalid recipe');
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Edytuj przepis" id="edit-recipe" />
      {recipe && (
        <RecipeForm defaultValues={recipe} onSubmit={handleSubmit} aria-labelledby="edit-recipe" />
      )}
    </FluidContainer>
  );
};

export default EditRecipeScreen;
