import dayjs from 'dayjs';
import { reverse } from 'named-urls';
import { useMemo, VFC } from 'react';
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

import { processRecipeFormData } from 'utils/recipes';

export const EditRecipeScreen: VFC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const recipe = useRecipe(params.recipeId, urls.home);

  const recipeDefaultData = useMemo(() => {
    if (!recipe) return undefined;

    const {
      ingredients, instructions, prepTime, ...recipeData
    } = recipe;

    return {
      ...recipeData,
      prepTime: prepTime ? dayjs.duration(prepTime).asMinutes() : undefined,
      ingredients: ingredients.map((i) => ({ value: i })),
      instructions: instructions.map((i) => ({ value: i })),
    };
  }, [recipe]);

  const handleSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    const editedRecipe = processRecipeFormData(data);
    if (recipe?.id) editedRecipe.id = recipe.id;
    if (recipe?.color) editedRecipe.color = recipe.color;

    if (isValidRecipe(editedRecipe)) {
      dispatch(saveRecipe(editedRecipe));

      navigate(reverse(urls.recipes.recipeById, {
        recipeId: editedRecipe.id,
      }));
    } else throw Error('Invalid recipe');
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Edytuj przepis" />
      {recipe && <RecipeForm defaultValues={recipeDefaultData} onSubmit={handleSubmit} />}
    </FluidContainer>
  );
};
