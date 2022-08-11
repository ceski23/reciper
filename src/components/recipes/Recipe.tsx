import { ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import IntlMessageFormat from 'intl-messageformat';
import {
  VFC, useMemo, MouseEventHandler, useState,
} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { ReactComponent as DisketteIcon } from 'assets/common/diskette.svg';
import { ReactComponent as PencilIcon } from 'assets/common/pencil.svg';
import { ReactComponent as TrashIcon } from 'assets/common/trash.svg';
import { ReactComponent as ClockIcon } from 'assets/recipes/clock.svg';
import { ReactComponent as StarIcon } from 'assets/recipes/favourite.svg';
import { ReactComponent as FlameIcon } from 'assets/recipes/fire.svg';
import { ReactComponent as ServingsIcon } from 'assets/recipes/servings.svg';

import { Button } from 'components/common/Button';
import {
  FluidContainer, fluidContainerStyles, fullBleedStyles,
} from 'components/common/Container';
import { Modal } from 'components/common/modal/Modal';
import { IngredientConverterModal } from 'components/recipes/IngredientConverterModal';
import { IngredientsSection } from 'components/recipes/IngredientsSection';
import { InstructionsSection } from 'components/recipes/InstructionsSection';
import { RecipeCover } from 'components/recipes/RecipeCover';
import { RecipeFeature } from 'components/recipes/RecipeFeature';
import { RecipeProvider } from 'components/recipes/RecipeProvider';
import { servingsText } from 'components/recipes/Servings';
import { Tag } from 'components/recipes/Tag';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useModal } from 'hooks/useModal';

import { urls } from 'routing/urls';

import { IngredientWithUnitAndType, ParsedIngredient } from 'services/ingredients/models';
import { Recipe as RecipeType, RecipeIngredient, RecipeInstruction } from 'services/recipes';
import { chooseProvider } from 'services/recipes/providers';

import {
  removeRecipeById, removeRecipeByUrl, saveRecipe, selectRecipes,
} from 'store/recipes';
import { selectDynamicPrimaryColor } from 'store/settings';

import { media } from 'utils/styles/mediaQueries';
import { lightTheme, generateThemeColors, color } from 'utils/styles/theme';
import { fluidTypography } from 'utils/styles/typography';
import { normalizeUrl } from 'utils/url';

export const ingredientsText = new IntlMessageFormat(`
  {quantity, plural,
    one {# produkt}
    few {# produkty}
    many {# produktów}
    other {# produktu}
  }
`, 'pl-PL');

interface Props {
  recipe: RecipeType
}

const Title = styled('h1')`
  margin-bottom: 10px;
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    25,
    45,
  )}
`;

const Features = styled.div`
  display: grid;
  justify-content: space-around;
  grid-auto-flow: column;
  grid-template-columns: repeat(3, 1fr);
`;

const Description = styled.div`
  font-size: clamp(16px, 1.1vw, 26px);
  line-height: 1.4;
  text-align: justify;
`;

const ContentWrapper = styled(FluidContainer)`
  margin: 50px 0;
  color: ${color('text')};
  background-color: ${color('background')};
  row-gap: 50px;

  ${media.down('medium')} {
    margin-top: 0;
  }
`;

const SaveIcon = styled(DisketteIcon)`
  width: 20px;
  height: 20px;
`;

const UnsaveIcon = styled(TrashIcon)`
  width: 20px;
  height: 20px;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  & > * {
    text-align: center;
    flex: 1 0 auto;
  }
`;

const IngredientsSection0 = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 20px;
  margin-bottom: auto;

  ${media.down('large')} {
    position: static;
  }
`;

const SideBySide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;

  ${media.down('large')} {
    display: flex;
    flex-direction: column-reverse;
    gap: 40px;
  }
`;

const RecipeHeaderWrapper = styled(FluidContainer)`
  &&&& {
    ${fullBleedStyles}
  }
`;

const RecipeHeader = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 80px;

  ${media.down('medium')} {
    ${fullBleedStyles}
  }

  ${media.up('large')} {
    flex-direction: row;

    & > * {
      flex: 1;
    }
  }
`;

const RecipeInfo = styled.div`
  ${fluidContainerStyles}
  row-gap: 50px;

  ${media.up('medium')} {
    display: flex;
    flex-direction: column;
  }
`;

export const Recipe: VFC<Props> = ({ recipe }) => {
  const recipeProvider = recipe.url ? chooseProvider(recipe.url) : undefined;
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const dynamicColor = useAppSelector(selectDynamicPrimaryColor);
  const recipes = useAppSelector(selectRecipes);
  const navigate = useNavigate();
  const deleteModal = useModal(false);

  const isRecipeSaved = useMemo(() => {
    if (recipe.url === undefined) return true;
    const recipeUrl = recipe.url;

    return Object
      .values(recipes)
      .some((r) => r.url === normalizeUrl(recipeUrl));
  }, [recipe.url, recipes]);

  const preparationDuration = useMemo(() => {
    if (!recipe.prepTime) return undefined;
    return dayjs.duration({ minutes: recipe.prepTime }).locale('pl').humanize();
  }, [recipe.prepTime]);

  const colorizedTheme = useMemo(() => {
    if (!recipe.color || !dynamicColor) return undefined;
    return { ...lightTheme, colors: generateThemeColors(recipe.color, theme.type) };
  }, [dynamicColor, recipe.color, theme.type]);

  const handleSaveRecipe: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(saveRecipe(recipe));
    navigate(
      urls.recipes.byId({ recipeId: recipe.id }),
      { replace: true },
    );
    toast.success('Przepis został zapisany');
  };

  const handleRemoveRecipe = () => {
    if (recipe.url) dispatch(removeRecipeByUrl(recipe.url));
    else dispatch(removeRecipeById(recipe.id));

    if (recipe.url) {
      navigate(urls.recipes.byUrl({
        recipeUrl: encodeURIComponent(recipe.url),
      }));
    } else navigate(urls.home());

    toast.success('Przepis został usunięty');
  };

  const handleEditRecipe = () => {
    navigate(urls.recipes.edit({ recipeId: recipe.id }));
  };

  const ingredientModal = useModal(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientWithUnitAndType>();

  const handleIngredientClick = (ingredient: ParsedIngredient) => {
    if ('unit' in ingredient && 'type' in ingredient && ingredient.type !== undefined) {
      setSelectedIngredient(ingredient);
      if (ingredient) ingredientModal.open();
    }
  };

  const instructionsGroups = useMemo(() => (
    recipe.instructions.reduce((acc, curr) => {
      const group = curr.group ?? '';
      const instructions = acc[group] ?? [];

      return ({
        ...acc,
        [group]: [...instructions, curr],
      });
    }, {} as Record<string, RecipeInstruction[]>)
  ), [recipe.instructions]);

  const ingredientsGroups = useMemo(() => (
    recipe.ingredients.reduce((acc, curr) => {
      const group = curr.group ?? '';
      const ingredients = acc[group] ?? [];

      return ({
        ...acc,
        [group]: [...ingredients, curr],
      });
    }, {} as Record<string, RecipeIngredient[]>)
  ), [recipe.ingredients]);

  return (
    <ThemeProvider theme={colorizedTheme ?? theme}>
      <ContentWrapper>
        <RecipeHeaderWrapper>
          <RecipeHeader>
            {recipe.image && (
              <RecipeCover src={recipe.image} />
            )}

            <RecipeInfo>
              <div>
                <Title>{recipe.name}</Title>
                {recipe.url && recipeProvider && (
                <RecipeProvider provider={recipeProvider} recipeUrl={recipe.url} />
                )}
              </div>

              {(recipe.rating || recipe.calories || preparationDuration) && (
              <Features>
                {preparationDuration && (
                  <RecipeFeature icon={ClockIcon} text={preparationDuration} />
                )}

                {recipe.calories && <RecipeFeature icon={FlameIcon} text={`${recipe.calories} kcal`} />}
                {recipe.rating && <RecipeFeature icon={StarIcon} text={recipe.rating.toFixed(1)} />}
                {recipe.servings && (
                <RecipeFeature
                  icon={ServingsIcon}
                  text={servingsText.format({ quantity: recipe.servings }).toString()}
                />
                )}
              </Features>
              )}
            </RecipeInfo>
          </RecipeHeader>
        </RecipeHeaderWrapper>

        {recipe.description && (
          <Description>{recipe.description}</Description>
        )}

        {recipe.tags.length > 0 && (
          <Tags>{recipe.tags.map((tag) => <Tag key={tag} tag={tag} />)}</Tags>
        )}

        {isRecipeSaved ? (
          <Button icon={PencilIcon} onClick={handleEditRecipe}>Edytuj przepis</Button>
        ) : (
          <Button icon={SaveIcon} onClick={handleSaveRecipe}>Zapisz przepis</Button>
        )}

        <SideBySide>
          <div>
            {Object.entries(instructionsGroups).map(([group, instructions]) => (
              <InstructionsSection
                key={group}
                instructionsGroup={{ group, instructions }}
              />
            ))}
          </div>

          <IngredientsSection0>
            {Object.entries(ingredientsGroups).map(([group, ingredients]) => (
              <IngredientsSection
                key={group}
                recipeName={recipe.name}
                ingredientsGroup={{ group, ingredients }}
                servings={recipe.servings}
                onIngredientClick={handleIngredientClick}
              />
            ))}
          </IngredientsSection0>

          {selectedIngredient && (
            <IngredientConverterModal
              isOpen={ingredientModal.isOpen}
              onClose={ingredientModal.close}
              closeOnEscape
              showBackdrop
              ingredient={selectedIngredient}
            />
          )}
        </SideBySide>

        <Modal
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.close}
          onAccept={handleRemoveRecipe}
          showBackdrop
          closeOnEscape
        >
          <Modal.Header title="Usuwanie przepisu" />
          <Modal.Body>
            Czy na pewno chcesz usunąć przepis <strong>{recipe.name}</strong>?
          </Modal.Body>
          <Modal.Footer cancelText="Anuluj" acceptText="Usuń" />
        </Modal>

        {isRecipeSaved && (
          <Button icon={UnsaveIcon} size="small" onClick={deleteModal.open}>Usuń przepis</Button>
        )}
      </ContentWrapper>
    </ThemeProvider>
  );
};
