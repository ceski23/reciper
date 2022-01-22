/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { Theme } from '@emotion/react/macro';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState } from 'store';

interface SettingsState {
  theme: Theme['type'] | 'system';
  dynamicPrimaryColor: boolean;
  useUnitsConversion: boolean;
  unitsConversion: Record<string, string | undefined>;
  conversionPrecision: number;
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
    setUnitConversion: (state, { payload }: PayloadAction<{ unit: string, conversion?: string }>) => {
      state.unitsConversion[payload.unit] = payload.conversion;
    },
    setConversionPrecision: (state, { payload }: PayloadAction<SettingsState['conversionPrecision']>) => {
      state.conversionPrecision = payload;
    },
  },
});

export const {
  setTheme, setDynamicPrimaryColor, setUseUnitsConversion, setUnitConversion, setConversionPrecision,
} = slice.actions;

export const selectCurrentThemeType = (state: RootState) => state.settings.theme;

export const selectDynamicPrimaryColor = (state: RootState) => state.settings.dynamicPrimaryColor;

export const selectUnitsConversions = (state: RootState) => state.settings.unitsConversion;

export const selectUseUnitsConversion = (state: RootState) => state.settings.useUnitsConversion;

export const selectConversionPrecision = (state: RootState) => state.settings.conversionPrecision;

export default persistReducer({
  key: 'settings',
  storage,
}, slice.reducer);
