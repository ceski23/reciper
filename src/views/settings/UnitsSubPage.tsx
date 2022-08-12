import styled from '@emotion/styled';
import { ChangeEvent, VFC } from 'react';

import { Entries } from 'types';

import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';
import { InputSetting } from 'components/settings/InputSetting';

import { useAppDispatch, useAppSelector } from 'hooks/store';

import KNOWN_INGREDIENTS, { IngredientName } from 'services/ingredients/database';
import { KnownIngredient } from 'services/ingredients/models';
import { UnitName, units } from 'services/units';

import {
  selectConversionPrecision, selectUnitsConversions, selectUseUnitsConversion,
  setConversionPrecision, setUnitConversion, setUseUnitsConversion,
} from 'store/settings';

import { color } from 'utils/styles/theme';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  justify-content: center;
`;

const StyledSelect = styled.select`
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1px solid ${color('textalt')};
  background-color: ${color('backgroundInput')};
  color: ${color('textalt')};
`;

const IngredientRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const IngredientText = styled.p`
  margin: 0;
  margin-right: auto;
`;

const IngredientIcon = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  margin-right: 10px;
`;

export const UnitsSubPage: VFC = () => {
  const dispatch = useAppDispatch();
  const useUnitsConversion = useAppSelector(selectUseUnitsConversion);
  const unitsConversion = useAppSelector(selectUnitsConversions);
  const conversionPrecision = useAppSelector(selectConversionPrecision);

  const ingredients = Object.entries(KNOWN_INGREDIENTS) as Entries<IngredientName, KnownIngredient>;

  const handleUseUnitsConversionChange = (value: boolean) => {
    dispatch(setUseUnitsConversion(value));
  };

  const handleUnitConversionChange = (ingredient: IngredientName, conversion?: UnitName) => {
    dispatch(setUnitConversion({ ingredient, conversion }));
  };

  const handlePrecisionChange = (precision: string) => {
    dispatch(setConversionPrecision(Number.parseInt(precision, 10)));
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Jednostki" />

      <CheckboxSetting
        title="Konwerter jednostek"
        hint="Konwertuj jednostki w przepisie do takich jakie preferujesz"
        name="dynamicPrimaryColor"
        checked={useUnitsConversion}
        onChange={handleUseUnitsConversionChange}
      />

      {useUnitsConversion && (
        <InputSetting
          title="Precyzja konwersji"
          id="conversion-precision"
          type="number"
          hint="Ilość cyfr po przecinku po konwersji jednostek"
          value={conversionPrecision.toString()}
          onChange={handlePrecisionChange}
        />
      )}

      <SettingsContainer>
        {useUnitsConversion && <h3 style={{ margin: 0, marginBottom: 10 }}>Konwersje jednostek</h3>}

        {useUnitsConversion && ingredients.map(([ingredient, { name, conversions, image }]) => (
          <IngredientRow key={ingredient}>
            <IngredientIcon src={image} alt={name} />
            <IngredientText>{name}</IngredientText>

            <StyledSelect
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const value = e.currentTarget.value as UnitName | '';
                handleUnitConversionChange(ingredient, value === '' ? undefined : value);
              }}
              value={unitsConversion[ingredient]}
            >
              <option value="">--------</option>

              {(Object.keys(conversions) as Array<keyof KnownIngredient['conversions']>).map((unit) => (
                <option key={unit} value={unit}>
                  {units[unit].formatter.format({ quantity: 1 })}
                </option>
              ))}
            </StyledSelect>
          </IngredientRow>
        ))}
      </SettingsContainer>
    </FluidContainer>
  );
};
