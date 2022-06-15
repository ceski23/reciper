import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { VFC } from 'react';

import { ReactComponent as GroceryIcon } from 'assets/recipes/grocery.svg';

import { useAppSelector } from 'hooks/store';

import ingredientsDatabase from 'services/ingredients/database';
import { ParsedIngredient } from 'services/ingredients/models';
import { units } from 'services/units';
import { convertIngredient } from 'services/units/utils';

import { selectConversionPrecision, selectUnitsConversions, selectUseUnitsConversion } from 'store/settings';

import { color } from 'utils/styles/theme';
import { fluidTypography } from 'utils/styles/typography';

interface Props {
  ingredient: ParsedIngredient;
  onClick?: () => void;
}

const iconStyles = ({ theme }: { theme: Theme }) => css`
  border-radius: 10px;
  background-color: ${theme.colors.backgroundAlt};
  width: 50px;
  height: 50px;
  border: none;
  margin-right: 20px;
  flex-shrink: 0;
  padding: 10px;
`;

const Icon = styled.img`
  ${iconStyles}

  object-fit: contain;
`;

const FallbackIcon = styled(GroceryIcon)`
  ${iconStyles}

  fill: ${color('text')};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.p`
  flex-grow: 1;
  margin: 0;
  ${({ theme }) => fluidTypography(
    theme.breakpoints.small,
    theme.breakpoints.xlarge,
    16,
    20,
  )}
`;

const formatQuantity = (quantity: number, precision?: number) => {
  if (precision === undefined) return quantity;
  return Number(quantity.toFixed(precision));
};

export const IngredientItem: VFC<Props> = ({ ingredient, onClick }) => {
  const conversions = useAppSelector(selectUnitsConversions);
  const conversionEnabled = useAppSelector(selectUseUnitsConversion);
  const convertionPrecision = useAppSelector(selectConversionPrecision);

  const precision = conversionEnabled ? convertionPrecision : undefined;

  const convertedIngredient = conversionEnabled ? convertIngredient(
    ingredient,
    ('type' in ingredient && ingredient.type) ? conversions[ingredient.type] : undefined,
  ) : ingredient;

  const quantity = ('parsed' in convertedIngredient)
    ? formatQuantity(convertedIngredient.quantity, precision)
    : undefined;

  const unitText = ('unit' in convertedIngredient)
    ? units[convertedIngredient.unit].formatter.format({
      quantity: formatQuantity(convertedIngredient.quantity, precision),
    })
    : undefined;

  return (
    <Wrapper onClick={onClick}>
      {('type' in ingredient && ingredient.type) ? (
        <Icon src={ingredientsDatabase[ingredient.type].image} />
      ) : (
        <FallbackIcon />
      )}

      <Text>
        {('parsed' in ingredient) ? (
          <>
            {ingredient.parsed.begin}{' '}
            <strong>{quantity} {unitText}</strong>
            {' '}{ingredient.parsed.end}
          </>
        ) : ingredient.original}
      </Text>
    </Wrapper>
  );
};
