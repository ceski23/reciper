import { VFC } from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as BackArrowIcon } from 'assets/common/left-arrow.svg';

import { ErrorInfo } from 'components/common/ErrorInfo';
import { LinkButton } from 'components/common/LinkButton';
import { Recipe } from 'components/recipes/Recipe';

import { useWakelock } from 'hooks/recipes/useWakelock';
import { useAppSelector } from 'hooks/store';

import { urls } from 'routing/urls';

import { selectRecipes } from 'store/recipes';

export const RecipeScreen: VFC = () => {
  const recipes = useAppSelector(selectRecipes);
  const params = useParams();
  const recipe = params.recipeId ? recipes[params.recipeId] : undefined;

  // Don't fade the screen when recipe screen is mounted
  useWakelock();

  return (
    <>
      {params.recipeId && !(params.recipeId in recipes) && (
        <ErrorInfo
          error="Nie znaleziono takiego przepisu"
          actions={(
            <LinkButton
              size="small"
              to={urls.recipes()}
              icon={BackArrowIcon}
            >
              Powrót do listy przepisów
            </LinkButton>
          )}
        />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </>
  );
};
