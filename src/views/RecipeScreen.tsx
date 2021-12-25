import { VFC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chooseProvider, getRecipeId, Recipe as RecipeType, scrapeRecipe } from 'services/recipes/providers';
import { selectRecipes } from 'features/recipes';
import { useAppSelector } from 'hooks/store';
import toast from 'react-hot-toast';
import { urls } from 'urls';
import styled from '@emotion/styled';
import { LinkButton } from 'components/LinkButton';
import { Recipe } from './Recipe';
import { ScreenContainer } from './ScreenContainer';
import { useWakeLock } from 'react-screen-wake-lock';

const LoadingOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  margin: 0;
  font-size: 22px;
`;

const CancelButton = styled(LinkButton)`
  margin-top: 20px;
`;

export const RecipeScreen: VFC = () => {
  const navigate = useNavigate();
  const recipes = useAppSelector(selectRecipes);
  const params = useParams();
  const wakelock = useWakeLock();
  const [recipe, setRecipe] = useState<RecipeType | undefined>(
    recipes[getRecipeId(params.recipeUrl as string)],
  );

  useEffect(() => {
    if (wakelock.isSupported) wakelock.request('screen');
    return () => {
      if (wakelock.isSupported) wakelock.release();
    }
  }, [wakelock]);

  useEffect(() => {
    const provider = chooseProvider(params.recipeUrl as string);
    if (!provider.name) {
      toast('Próbujesz wczytać przepis z niewspieranej strony, mogą wystąpić błędy.', {
        icon: '⚠️',
      });
    }
  }, [params.recipeUrl]);

  useEffect(() => {
    if (!recipes[getRecipeId(params.recipeUrl as string)]) {
      scrapeRecipe(params.recipeUrl as string)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .then((recipe) => recipe && setRecipe(recipe))
        .catch((err: Error) => {
          toast.error('Wystąpił błąd podczas wczytywania przepisu');
          console.error(err.message);
          navigate(urls.home);
        });
    }
  }, [recipes, params.recipeUrl, navigate]);

  return (
    <ScreenContainer>
      {!recipe && (
        <LoadingOverlay>
          <LoadingText>Ładowanie przepisu...</LoadingText>
          <CancelButton to={urls.home}>Anuluj</CancelButton>
        </LoadingOverlay>
      )}

      {recipe && <Recipe recipe={recipe} />}
    </ScreenContainer>
  );
};
