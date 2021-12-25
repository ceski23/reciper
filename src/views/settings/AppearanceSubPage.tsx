import styled from '@emotion/styled';
import React, { VFC } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { ReactComponent as BackIcon } from 'assets/left-arrow.svg';
import {
  selectCurrentThemeType, selectDynamicPrimaryColor, setDynamicPrimaryColor, setTheme, themeName,
} from 'features/settings';
import { Theme } from '@emotion/react';
import { RadioGroup } from 'components/settings/RadioGroup';
import { urls } from 'urls';
import { Link } from 'components/Link';
import { CheckboxSetting } from 'components/settings/CheckboxSetting';
import { ScreenContainer } from '../ScreenContainer';

const ScreenHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BackLink = styled(Link)`
  width: 30px;
  height: 30px;
  color: ${(props) => props.theme.colors.textalt};
  margin-right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

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
    <ScreenContainer>
      <ScreenHeader>
        <BackLink to={urls.settings.toString()}>
          <BackIcon />
        </BackLink>

        <h1>Wygląd</h1>
      </ScreenHeader>

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

    </ScreenContainer>
  );
};
