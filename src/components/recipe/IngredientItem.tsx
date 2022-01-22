import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { convertIngredient, ParsedIngredient } from 'services/ingredients/parser';
import { ReactComponent as GroceryIcon } from 'assets/grocery.svg';
import { css, Theme } from '@emotion/react/macro';
import ingredientsDatabase from 'services/ingredients/database';
import { useAppSelector } from 'hooks/store';
import { selectConversionPrecision, selectUnitsConversions, selectUseUnitsConversion } from 'features/settings';
import { fluidTypography } from 'utils/typography';

interface Props {
  ingredient: ParsedIngredient;
}

const iconStyles = ({ theme }: { theme: Theme }) => css`
  border-radius: 10px;
  background-color: ${theme.colors.backgroundalt};
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

  fill: ${(props) => props.theme.colors.text};
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

export const IngredientItem: VFC<Props> = ({ ingredient }) => {
  const conversions = useAppSelector(selectUnitsConversions);
  const useConversion = useAppSelector(selectUseUnitsConversion);
  const precision = useAppSelector(selectConversionPrecision);

  const convertedIngredient = !useConversion
    ? ingredient
    : convertIngredient(ingredient, ('unit' in ingredient) ? conversions[ingredient.unit.normalizedName] : undefined);

  const quantity = ('parsed' in convertedIngredient)
    ? Number(convertedIngredient.quantity.toFixed(useConversion ? precision : 0))
    : undefined;

  const unitText = ('unit' in convertedIngredient)
    ? convertedIngredient.unit.formatter.format({
      quantity: Number(convertedIngredient.quantity.toFixed(useConversion ? precision : 0)),
    })
    : undefined;

  return (
    <Wrapper>
      {ingredient.type ? (
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
