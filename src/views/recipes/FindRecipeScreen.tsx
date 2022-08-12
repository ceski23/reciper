import styled from '@emotion/styled';
import { VFC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import usePromise from 'react-use-promise';

import { ReactComponent as BackArrowIcon } from 'assets/common/left-arrow.svg';

import { ErrorInfo } from 'components/common/ErrorInfo';
import { LinkButton } from 'components/common/LinkButton';
import { Recipe } from 'components/recipes/Recipe';

import { useWakelock } from 'hooks/recipes/useWakelock';

import { urls } from 'routing/urls';

import { chooseProvider, scrapeRecipe } from 'services/recipes/providers';

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingText = styled.p`
  margin: 0;
  font-size: 22px;
`;

export const FindRecipeScreen: VFC = () => {
  // Don't fade the screen when recipe screen is mounted
  useWakelock();

  const params = useParams<'recipeUrl'>();

  const [recipe, error, state] = usePromise(() => (
    params.recipeUrl ? scrapeRecipe(params.recipeUrl) : Promise.resolve(undefined)
  ), [params.recipeUrl]);

  const providerName = useMemo(() => (
    params.recipeUrl ? chooseProvider(params.recipeUrl).name : undefined
  ), [params.recipeUrl]);

  return (
    <>
      {state === 'pending' && (
        <LoadingOverlay>
          <LoadingText>Ładowanie przepisu...</LoadingText>
        </LoadingOverlay>
      )}

      {error && (
        <ErrorInfo
          error={`Wystąpił błąd podczas wczytywania przepisu. ${providerName ? '' : 'Strona, z której pochodzi przepis może nie być wspierana'}`}
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
