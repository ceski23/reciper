/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { Theme } from '@emotion/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootState } from 'store';

import { IngredientName } from 'services/ingredients/database';
import { UnitName } from 'services/units';

interface SettingsState {
  theme: Theme['type'] | 'system';
  dynamicPrimaryColor: boolean;
  useUnitsConversion: boolean;
  unitsConversion: {
    [key in IngredientName]?: UnitName | undefined
  };
  conversionPrecision: number;
  autoRecipesSync: boolean;
  disableAnimations: boolean;
}

export const themeName = (theme: SettingsState['theme']) => {
  switch (theme) {
    case 'dark': return 'Ciemny';
    case 'light': return 'Jasny';
    case 'system': return 'Systemowy';
    default:
      throw Error('Unknown theme');
  }
};

const initialState: SettingsState = {
  theme: 'system',
  dynamicPrimaryColor: true,
  useUnitsConversion: true,
  unitsConversion: {},
  conversionPrecision: 2,
  autoRecipesSync: false,
  disableAnimations: false,
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<SettingsState['theme']>) => {
      state.theme = payload;
    },
    setDynamicPrimaryColor: (state, { payload }: PayloadAction<SettingsState['dynamicPrimaryColor']>) => {
      state.dynamicPrimaryColor = payload;
    },
    setUseUnitsConversion: (state, { payload }: PayloadAction<SettingsState['useUnitsConversion']>) => {
      state.useUnitsConversion = payload;
    },
    setUnitConversion: (state, { payload }: PayloadAction<{ ingredient: IngredientName, conversion?: UnitName }>) => {
      state.unitsConversion[payload.ingredient] = payload.conversion;
    },
    setConversionPrecision: (state, { payload }: PayloadAction<SettingsState['conversionPrecision']>) => {
      state.conversionPrecision = payload;
    },
    setAutoRecipesSync: (state, { payload }: PayloadAction<SettingsState['autoRecipesSync']>) => {
      state.autoRecipesSync = payload;
    },
    setDisableAnimations: (state, { payload }: PayloadAction<SettingsState['disableAnimations']>) => {
      state.disableAnimations = payload;
    },
  },
});

export const {
  setTheme, setDynamicPrimaryColor, setUseUnitsConversion, setUnitConversion, setConversionPrecision,
  setAutoRecipesSync, setDisableAnimations,
} = slice.actions;

export const selectCurrentThemeType = (state: RootState) => state.settings.theme;

export const selectDynamicPrimaryColor = (state: RootState) => state.settings.dynamicPrimaryColor;

export const selectUnitsConversions = (state: RootState) => state.settings.unitsConversion;

export const selectUseUnitsConversion = (state: RootState) => state.settings.useUnitsConversion;

export const selectConversionPrecision = (state: RootState) => state.settings.conversionPrecision;

export const selectRecipesAutoSync = (state: RootState) => state.settings.autoRecipesSync;

export const selectDisableAnimations = (state: RootState) => state.settings.disableAnimations;

export default persistReducer({
  key: 'settings',
  storage,
}, slice.reducer);
