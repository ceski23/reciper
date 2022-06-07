import styled from '@emotion/styled';
import { VFC, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { LinkButton } from 'components/common/LinkButton';
import { Recipe } from 'components/recipes/Recipe';

import { useWakelock } from 'hooks/recipes/useWakelock';

import { urls } from 'routing/urls';

import { Recipe as RecipeType } from 'services/recipes';
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

const CancelButton = styled(LinkButton)`
  margin-top: 20px;
`;

export const FindRecipeScreen: VFC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [recipe, setRecipe] = useState<RecipeType | undefined>();

  // Don't fade the screen when recipe screen is mounted
  useWakelock();

  useEffect(() => {
    if (params.recipeUrl) {
      try {
        const provider = chooseProvider(params.recipeUrl);

        if (!provider.name) {
          toast('Próbujesz wczytać przepis z niewspieranej strony, mogą wystąpić błędy.', {
            icon: '⚠️',
          });
        }
      } catch { /* */ }
    }
  }, [params.recipeUrl]);

  useEffect(() => {
    scrapeRecipe(params.recipeUrl as string)
      .then(setRecipe)
      .catch(() => {
        toast.error('Wystąpił błąd podczas wczytywania przepisu');
        navigate(urls.home);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.recipeUrl]);

  return (
    <>
      {!recipe && (
        <LoadingOverlay>
          <LoadingText>Ładowanie przepisu...</LoadingText>
          <CancelButton to={urls.home}>Anuluj</CancelButton>
        </LoadingOverlay>
      )}

      {recipe && <Recipe recipe={recipe} />}
    </>
  );
};
