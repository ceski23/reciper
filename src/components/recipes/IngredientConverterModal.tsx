import styled from '@emotion/styled';
import { ChangeEvent, FC } from 'react';

import { ReactComponent as ConversionIcon } from 'assets/recipes/conversion.svg';

import { Modal, ModalProps } from 'components/common/modal/Modal';
import { Field } from 'components/forms/inputs/Field';

import { useIngredientConversion } from 'hooks/recipes/useIngredientConversion';

import KNOWN_INGREDIENTS from 'services/ingredients/database';
import { IngredientWithUnitAndType } from 'services/ingredients/models';
import { UnitName, units } from 'services/units';

import { color } from 'utils/styles/theme';

const IngredientRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const IngredientImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

const StyledConversionIcon = styled(ConversionIcon)`
  width: 50px;
  height: 50px;
  fill: ${color('textalt')};
  flex-grow: 1;
  flex-shrink: 0;
`;

const ConversionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  border: none;
  background: none;
  font-size: inherit;
  color: inherit;
`;

const ConversionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;

const QuantityField = styled(Field)`
  max-width: 100px;
  min-width: 50px;
  text-align: end;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
`;

const capitalize = (text: string) => (
  `${text[0].toLocaleUpperCase()}${text.substring(1)}`
);

interface IngredientConverterModalProps {
  ingredient: IngredientWithUnitAndType;
}

const stringToNumber = (text: string) => {
  const num = Number.parseFloat(text);
  return Number.isNaN(num) ? 0 : num;
};

export const IngredientConverterModal: FC<IngredientConverterModalProps & ModalProps> = ({
  ingredient, ...props
}) => {
  const availableUnits = Object.keys(KNOWN_INGREDIENTS[ingredient.type].conversions) as UnitName[];
  const ingredientObject = KNOWN_INGREDIENTS[ingredient.type];
  const {
    changeQuantity, changeUnit, conversionData, swapPositions,
  } = useIngredientConversion(ingredient);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.currentTarget.name;
    const quantity = stringToNumber(event.currentTarget.value);

    if (fieldName === 'from') changeQuantity({ from: quantity });
    else if (fieldName === 'to') changeQuantity({ to: quantity });
  };

  const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const fieldName = event.currentTarget.name;
    const unit = event.currentTarget.value as UnitName;

    if (fieldName === 'from') changeUnit({ from: unit });
    else if (fieldName === 'to') changeUnit({ to: unit });
  };

  return (
    <Modal {...props}>
      <Modal.Header title="Kalkulator jednostek" />
      <Modal.Body>
        <IngredientRow>
          <IngredientImage src={ingredientObject.image} alt={ingredientObject.name} />
          <p>{capitalize(ingredientObject.name)}</p>
        </IngredientRow>

        <ConversionContainer>
          <ConversionRow>
            <QuantityField
              id="fromQuantity"
              type="number"
              name="from"
              inputMode="decimal"
              value={conversionData.quantity.from}
              onChange={handleQuantityChange}
              min={0}
            />

            <Select value={conversionData.unit.from} onChange={handleUnitChange} name="from">
              {availableUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {units[unit].formatter.format({ quantity: conversionData.quantity.from })}
                </option>
              ))}
            </Select>
          </ConversionRow>

          <StyledConversionIcon onClick={swapPositions} />

          <ConversionRow>
            <QuantityField
              id="fromQuantity"
              type="number"
              name="to"
              inputMode="decimal"
              value={conversionData.quantity.to}
              onChange={handleQuantityChange}
              min={0}
            />

            <Select value={conversionData.unit.to} onChange={handleUnitChange} name="to">
              {availableUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {units[unit].formatter.format({ quantity: conversionData.quantity.to })}
                </option>
              ))}
            </Select>
          </ConversionRow>
        </ConversionContainer>
      </Modal.Body>
      <Modal.Footer cancelText="Zamknij" />
    </Modal>
  );
};
