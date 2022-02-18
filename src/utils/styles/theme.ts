import { Theme } from '@emotion/react/macro';
import { hsl, parseToHsl } from 'polished';

declare module '@emotion/react/macro' {
  export interface Theme {
    colors: {
      primary: string,
      background: string,
      backgroundhover: string
      backgroundalt: string,
      background2: string,
      backgroundInput: string,
      text: string
      textalt: string
      shadow: string
    }
    type: 'dark' | 'light',
    breakpoints: typeof breakpoints,
    containerWidths: typeof containerWidths
  }
}

export const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xlarge: 1200,
};

const containerWidths: Partial<typeof breakpoints> = {
  small: 540,
  medium: 720,
  large: 960,
  xlarge: 1140,
};

export type Breakpoint = keyof Theme['breakpoints'];

export const generateThemeColors = (primaryColor: string, type: Theme['type']): Theme['colors'] => {
  const primary = parseToHsl(primaryColor);

  return (type === 'light') ? {
    primary: hsl(primary),
    backgroundalt: hsl(primary.hue, 0.25, 0.90),
    background: hsl(primary.hue, 0.20, 0.97),
    backgroundhover: hsl(primary.hue, 0.20, 0.92),
    background2: hsl(primary.hue, 0.20, 0.85),
    backgroundInput: hsl(primary.hue, 1, 1),
    text: hsl(primary.hue, primary.saturation, 0.10),
    textalt: hsl(primary.hue, 0.30, 0.30),
    shadow: hsl(primary.hue, 0.10, primary.lightness / 2),
  } : {
    primary: hsl(primary.hue, primary.saturation, 0.3),
    backgroundalt: hsl(primary.hue, 0.15, 0.17),
    background: hsl(primary.hue, 0, 0.13),
    backgroundhover: hsl(primary.hue, 0.1, 0.15),
    background2: hsl(primary.hue, 0.20, 0.1),
    backgroundInput: hsl(primary.hue, 0, 0.2),
    text: hsl(primary.hue, primary.saturation, 0.95),
    textalt: hsl(primary.hue, 0.30, 0.70),
    shadow: hsl(primary.hue, 0.10, primary.lightness / 2),
  };
};

export const lightTheme: Theme = {
  colors: generateThemeColors('#00aaff', 'light'),
  type: 'light',
  breakpoints,
  containerWidths,
};

export const darkTheme: Theme = {
  colors: generateThemeColors('#00aaff', 'dark'),
  type: 'dark',
  breakpoints,
  containerWidths,
};
