import { VFC, useMemo, MouseEventHandler, useState } from 'react';
import styled from '@emotion/styled';
import { ParsedIngredient, parseIngredient } from 'services/ingredients/parser';
import { chooseProvider, getRecipeId, Recipe as RecipeType } from 'services/recipes/providers';
import dayjs from 'dayjs';
import { RecipeStep } from 'components/RecipeStep';
import { RecipeFeature } from 'components/RecipeFeature';
import { ReactComponent as ClockIcon } from 'assets/clock.svg';
import { ReactComponent as FlameIcon } from 'assets/fire.svg';
import { ReactComponent as ServingsIcon } from 'assets/servings.svg';
import { ReactComponent as StarIcon } from 'assets/favourite.svg';
import { ReactComponent as DisketteIcon } from 'assets/diskette.svg';
import { ReactComponent as TrashIcon } from 'assets/trash.svg';
import { ReactComponent as LeftArrowIcon } from 'assets/left-arrow.svg';
import { ReactComponent as ShoppingList } from 'assets/shopping-list.svg';
import { RecipeCover } from 'components/RecipeCover';
import { Button, buttonStyles } from 'components/Button';
import { ThemeProvider, useTheme } from '@emotion/react';
import { generateThemeColors, lightTheme } from 'theme';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { removeRecipe, saveRecipe, selectRecipeIds } from 'features/recipes';
import toast from 'react-hot-toast';
import { IngredientItem } from 'components/IngredientItem';
import { urls } from 'urls';
import { selectShoppingList } from 'features/user';
import { Tag } from 'components/Tag';
import { useAccountProvider } from 'hooks/useAccountProvider';
import { selectDynamicPrimaryColor } from 'features/settings';
import { Link } from 'components/Link';
import { Servings, servingsText } from 'components/recipe/Servings';

interface Props {
  recipe: RecipeType
}

const Title = styled('h1')`
  font-size: 25px;
  margin-bottom: 10px;
`;

const RecipeSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Features = styled.div`
  display: grid;
  justify-content: space-around;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 30px;
  margin-top: 30px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 1.4;
  text-align: justify;
`;

const ProviderIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const ProviderName = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

const Provider = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentWrapper = styled.div`
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
`;

const AddToListButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const BackArrowIcon = styled(LeftArrowIcon)`
  width: 20px;
  height: 20px;
`;

const SaveIcon = styled(DisketteIcon)`
  width: 20px;
  height: 20px;
`;

const UnsaveIcon = styled(TrashIcon)`
  width: 20px;
  height: 20px;
`;

const AnotherContainer = styled.div`
  margin-top: 30px;
`;

const BackButton = styled(Link)`
  ${buttonStyles}

  min-width: unset;
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textalt};
`;

const FavButton = styled(Button)`
  min-width: unset;
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textalt};
`;

const IngredientsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AltText = styled.span`
  color: ${(props) => props.theme.colors.textalt};
  font-size: 14px;
`;

const RecipeLink = styled.a`
  text-decoration: none;
  color: unset;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -10px;
  margin-right: -10px;
  margin-top: 30px;

  & > * {
    text-align: center;
    flex: 1 0 auto;
    margin-bottom: 10px;
    margin-right: 10px;
  }
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Recipe: VFC<Props> = ({ recipe }) => {
  const recipeProvider = useMemo(() => chooseProvider(recipe.url), [recipe.url]);
  const dispatch = useAppDispatch();
  const recipeIds = useAppSelector(selectRecipeIds);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const theme = useTheme();
  const shoppingList = useAppSelector(selectShoppingList);
  const accountProvider = useAccountProvider();
  const dynamicColor = useAppSelector(selectDynamicPrimaryColor);
  const [servings, setServings] = useState(recipe.servings);

  const parsedIngredients = useMemo<ParsedIngredient[]>(() => (
    (recipe?.ingredients ?? [])
      .map(parseIngredient)
      .map(ingredient => {
        if (!servings || !('quantity' in ingredient) || !recipe.servings) return ingredient;
        return {...ingredient, quantity: ingredient.quantity / recipe.servings * servings }
      })
  ), [recipe?.ingredients, recipe.servings, servings]);

  const handleStepClicked = (idx: number) => {
    if (doneSteps.includes(idx)) setDoneSteps(doneSteps.filter((i) => i !== idx));
    else setDoneSteps([...doneSteps, idx]);
  };

  const preparationDuration = useMemo(() => {
    if (!recipe.prepTime) return undefined;
    return dayjs.duration(recipe.prepTime).locale('pl').humanize();
  }, [recipe.prepTime]);

  const colorizedTheme = useMemo(() => {
    if (!recipe.color || !dynamicColor) return undefined;
    return { ...lightTheme, colors: generateThemeColors(recipe.color, theme.type) };
  }, [dynamicColor, recipe.color, theme.type]);

  const handleSaveRecipe: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(saveRecipe(recipe));
    toast.success('Przepis został zapisany');
  };

  const handleRemoveRecipe: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeRecipe(getRecipeId(recipe.url)));
    toast.success('Przepis został usunięty');
  };

  const handleAddToShoppingList = async () => {
    if (accountProvider && shoppingList && parsedIngredients) {
      const promise = accountProvider.addIngredientsToList(
        shoppingList.id,
        parsedIngredients.map((i) => i.original),
        recipe.name,
      );

      toast.promise(promise, {
        loading: 'Dodawanie do listy',
        success: 'Dodano składniki do listy',
        error: 'Wystąpił błąd podczas dodawania składników',
      });
    }
  };

  return (
    <ThemeProvider theme={colorizedTheme ?? theme}>
      {recipe.image && <RecipeCover src={recipe.image as string} />}

      <BackButton to={urls.home}>
        <BackArrowIcon />
      </BackButton>

      {recipeIds.includes(getRecipeId(recipe.url)) ? (
        <FavButton onClick={handleRemoveRecipe} title="Usuń przepis">
          <UnsaveIcon />
        </FavButton>
      ) : (
        <FavButton onClick={handleSaveRecipe} title="Zapisz przepis">
          <SaveIcon />
        </FavButton>
      )}

      <ContentWrapper>
        <Title>{recipe.name}</Title>

        <Provider href={recipe.url} target="_blank">
          {recipeProvider.icon && <ProviderIcon src={recipeProvider.icon} />}
          <ProviderName>{recipeProvider.name || 'Strona przepisu'}</ProviderName>
        </Provider>

        {(recipe.rating || recipe.calories || preparationDuration) && (
          <Features>
            {preparationDuration && <RecipeFeature icon={ClockIcon} text={preparationDuration} />}
            {recipe.calories && <RecipeFeature icon={FlameIcon} text={`${recipe.calories} kcal`} />}
            {recipe.rating && <RecipeFeature icon={StarIcon} text={recipe.rating.toFixed(1)} />}
            {recipe.servings && <RecipeFeature icon={ServingsIcon} text={servingsText.format({ quantity: recipe.servings }).toString()} />}
          </Features>
        )}

        {recipe.description && (
          <Description>{recipe.description}</Description>
        )}

        {recipe.tags.length > 0 && (
          <Tags>
            {recipe.tags.map((tag) => <Tag key={tag} tag={tag} />)}
          </Tags>
        )}

        {servings && <Servings servings={servings} onServingsChange={setServings} />}

        {parsedIngredients && (
          <AnotherContainer>
            <IngredientsHeader>
              <RecipeLink href="#ingredients" id="ingredients">
                <h2>Składniki</h2>
              </RecipeLink>

              <AltText>{recipe.ingredients.length} produktów</AltText>
            </IngredientsHeader>

            <IngredientsContainer>
              {parsedIngredients.map((ingredient) => (
                <IngredientItem ingredient={ingredient} key={ingredient.original} />
              ))}
            </IngredientsContainer>

            {shoppingList && (
              <AddToListButton icon={ShoppingList} onClick={handleAddToShoppingList}>
                {`Dodaj do "${shoppingList.name}"`}
              </AddToListButton>
            )}
          </AnotherContainer>
        )}

        {recipe.instructions && (
          <AnotherContainer>
            <RecipeLink href="#instructions" id="instructions">
              <h2>Przygotowanie</h2>
            </RecipeLink>

            <RecipeSteps>
              {recipe.instructions.map((ins, idx) => (
                <RecipeStep
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  stepNumber={idx + 1}
                  instruction={ins}
                  done={doneSteps.includes(idx)}
                  onClick={() => handleStepClicked(idx)}
                />
              ))}
            </RecipeSteps>
          </AnotherContainer>
        )}
      </ContentWrapper>
    </ThemeProvider>
  );
};
