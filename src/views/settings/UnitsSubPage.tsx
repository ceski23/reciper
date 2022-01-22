/* eslint-disable max-len */
import styled from '@emotion/styled/macro';
import { VFC } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';
import {
  selectConversionPrecision,
  selectUnitsConversions, selectUseUnitsConversion, setConversionPrecision, setUnitConversion, setUseUnitsConversion,
} from 'features/settings';
import { UNITS } from 'services/units';
import unitsConverter from 'utils/unitsConverter';
import { InputSetting } from 'components/settings/InputSetting';
import { ScreenHeader } from 'components/Screen/ScreenHeader';
import { FluidContainer } from 'components/Container';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const UnitsSubPage: VFC = () => {
  const dispatch = useAppDispatch();
  const useUnitsConversion = useAppSelector(selectUseUnitsConversion);
  const unitsConversion = useAppSelector(selectUnitsConversions);
  const conversionPrecision = useAppSelector(selectConversionPrecision);

  const handleUseUnitsConversionChange = (value: boolean) => {
    dispatch(setUseUnitsConversion(value));
  };

  const handleUnitConversionChange = (unit: string, conversion?: string) => {
    dispatch(setUnitConversion({ unit, conversion }));
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
          type="number"
          hint="Ilość cyfr po przecinku po konwersji jednostek"
          value={conversionPrecision.toString()}
          onChange={handlePrecisionChange}
        />
      )}

      <SettingsContainer>
        {useUnitsConversion && <h3 style={{ margin: 0, marginBottom: 10 }}>Konwersje jednostek</h3>}
        {useUnitsConversion && UNITS.map((unit) => (
          <div key={unit.normalizedName} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <p style={{ flex: 1 }}>{unit.formatter.format({ quantity: 1 })}</p>
            <select
              style={{ minWidth: 150 }}
              onChange={(e) => handleUnitConversionChange(unit.normalizedName, e.currentTarget.value || undefined)}
              value={unitsConversion[unit.normalizedName]}
            >
              <option value="">Brak</option>

              {unitsConverter().from(unit.normalizedName).possibilities().map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
        ))}
      </SettingsContainer>
    </FluidContainer>
  );
};
