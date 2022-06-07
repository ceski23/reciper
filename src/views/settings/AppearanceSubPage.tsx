import { Theme } from '@emotion/react';
import { VFC } from 'react';

import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';
import { RadioGroup } from 'components/settings/RadioGroup';

import { useAppDispatch, useAppSelector } from 'hooks/store';

import {
  selectCurrentThemeType, selectDynamicPrimaryColor, setDynamicPrimaryColor, setTheme, themeName,
} from 'store/settings';

const themeOptions = (['light', 'dark', 'system'] as Array<Theme['type'] | 'system'>).map((type) => ({
  text: themeName(type),
  value: type,
}));

export const AppearanceSubPage: VFC = () => {
  const dispatch = useAppDispatch();
  const themeType = useAppSelector(selectCurrentThemeType);
  const dynamicColor = useAppSelector(selectDynamicPrimaryColor);

  const handleSelectTheme = (type: Theme['type'] | 'system') => {
    dispatch(setTheme(type));
  };

  const handleChangeDynamicColor = (dynColor: boolean) => {
    dispatch(setDynamicPrimaryColor(dynColor));
  };

  return (
    <FluidContainer>
      <ScreenHeader title="Wygląd" />

      <RadioGroup
        title="Wybierz motyw"
        name="theme"
        value={themeType}
        onSelected={handleSelectTheme}
        options={themeOptions}
      />

      <CheckboxSetting
        title="Dynamiczny kolor główny"
        hint="Używaj koloru głównego bazującego na zdjęciu przepisu"
        name="dynamicPrimaryColor"
        checked={dynamicColor}
        onChange={handleChangeDynamicColor}
      />

    </FluidContainer>
  );
};
