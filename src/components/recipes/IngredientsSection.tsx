/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from '@emotion/styled';
import IntlMessageFormat from 'intl-messageformat';
import { FC, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ReactComponent as ShoppingList } from 'assets/recipes/shopping-list.svg';

import { Button } from 'components/common/Button';
import { IngredientItem } from 'components/recipes/IngredientItem';
import { Servings } from 'components/recipes/Servings';

import { useAccountProvider } from 'hooks/accounts/useAccountProvider';
import { useAppSelector } from 'hooks/store';

import { ParsedIngredient } from 'services/ingredients/models';
import { parseIngredient } from 'services/ingredients/parser';
import { RecipeIngredient } from 'services/recipes';

import { selectShoppingList } from 'store/user';

import { color } from 'utils/styles/theme';
import { fluidTypography } from 'utils/styles/typography';

interface IngredientsGroup {
  group?: string;
  ingredients: RecipeIngredient[];
}

interface IngredientsSectionProps {
  ingredientsGroup: IngredientsGroup;
  servings?: number;
  onIngredientClick?: (ingredient: ParsedIngredient) => void;
  recipeName: string;
}

export const ingredientsText = new IntlMessageFormat(`
  {quantity, plural,
    one {# produkt}
    few {# produkty}
    many {# produktów}
    other {# produktu}
  }
`, 'pl-PL');

const adjustIngredientQuantity = (
  ingredient: ParsedIngredient,
  servings?: number,
  initialServings?: number,
) => {
  if (!servings || !('quantity' in ingredient) || !initialServings) return ingredient;
  return {
    ...ingredient,
    quantity: (ingredient.quantity / initialServings) * servings,
  };
};

export const IngredientsSection: FC<IngredientsSectionProps> = ({
  ingredientsGroup, servings: initialServings, onIngredientClick, recipeName,
}) => {
  const [servings, setServings] = useState(initialServings);
  const shoppingList = useAppSelector(selectShoppingList);
  const accountProvider = useAccountProvider();

  const parsedIngredients = useMemo<ParsedIngredient[]>(() => (
    ingredientsGroup.ingredients
      .map((ingredient) => parseIngredient(ingredient.text))
      .map((ingredient) => adjustIngredientQuantity(ingredient, servings, initialServings))
  ), [ingredientsGroup.ingredients, initialServings, servings]);

  const handleAddToShoppingList = () => {
    if (accountProvider && shoppingList && parsedIngredients) {
      const promise = accountProvider.addIngredientsToList(
        shoppingList.id,
        parsedIngredients.map((i) => i.original),
        ingredientsGroup.group ? `${recipeName} - ${ingredientsGroup.group}` : recipeName,
      );

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      toast.promise(promise, {
        loading: 'Dodawanie do listy',
        success: 'Dodano składniki do listy',
        error: 'Wystąpił błąd podczas dodawania składników',
      });
    }
  };

  return (
    <>
      <IngredientsHeader>
        <h2>{ingredientsGroup.group || 'Składniki'}</h2>

        <AltText>
          {ingredientsText.format({ quantity: ingredientsGroup.ingredients.length })}
        </AltText>
      </IngredientsHeader>

      <IngredientsContainer>
        {!!servings && <Servings servings={servings} onServingsChange={setServings} />}

        <IngredientsList>
          {parsedIngredients.map((ingredient) => (
            <IngredientItem
              ingredient={ingredient}
              key={ingredient.original}
              onClick={() => onIngredientClick?.(ingredient)}
            />
          ))}
        </IngredientsList>

        {shoppingList && (
        <AddToListButton icon={ShoppingList} onClick={handleAddToShoppingList}>
          {`Dodaj do "${shoppingList.name}"`}
        </AddToListButton>
        )}
      </IngredientsContainer>
    </>
  );
};

const IngredientsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AltText = styled.span`
  color: ${color('textalt')};
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    14,
    16,
  )}
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddToListButton = styled(Button)`
  width: 100%;
`;
