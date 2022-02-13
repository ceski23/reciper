import { VFC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chooseProvider, scrapeRecipe } from 'services/recipes/providers';
import { Recipe as RecipeType } from 'services/recipes';
import toast from 'react-hot-toast';
import { urls } from 'urls';
import styled from '@emotion/styled/macro';
import { LinkButton } from 'components/LinkButton';
import { Recipe } from 'components/Recipe';
import { useWakelock } from 'hooks/useWakelock';

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
      const provider = chooseProvider(params.recipeUrl);

      if (!provider.name) {
        toast('Próbujesz wczytać przepis z niewspieranej strony, mogą wystąpić błędy.', {
          icon: '⚠️',
        });
      }
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
