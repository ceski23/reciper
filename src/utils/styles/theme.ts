import { Theme } from '@emotion/react';
import { hsl, parseToHsl, transparentize } from 'polished';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string,
      background: string,
      backgroundHover: string
      backgroundAlt: string,
      backgroundAltHover: string,
      backgroundInput: string,
      primaryDisabled: string
      primaryHover: string
      primaryHighlight: string
      text: string
      textalt: string
      textLight: string
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

  switch (type) {
    case 'dark':
      return {
        primary: hsl(primary.hue, primary.saturation, 0.4),
        primaryDisabled: hsl(primary.hue, primary.saturation, 0.3),
        primaryHover: hsl(primary.hue, primary.saturation, 0.5),
        primaryHighlight: transparentize(0.9, primaryColor),

        background: hsl(primary.hue, 0, 0.13),
        backgroundHover: hsl(primary.hue, 0.1, 0.15),
        backgroundAlt: hsl(primary.hue, 0.15, 0.17),
        backgroundAltHover: hsl(primary.hue, 0.15, 0.2),
        backgroundInput: hsl(primary.hue, 0.1, 0.16),

        text: hsl(primary.hue, primary.saturation, 0.95),
        textalt: hsl(primary.hue, 0.30, 0.70),
        textLight: hsl(primary.hue, 0.30, 0.20),

        shadow: transparentize(0.8, hsl(primary.hue, 0.10, primary.lightness)),
      };

    case 'light':
    default: {
      return {
        primary: hsl(primary),
        primaryDisabled: hsl(primary.hue, 0.7, 0.7),
        primaryHover: hsl(primary.hue, primary.saturation, primary.lightness - 0.1),
        primaryHighlight: transparentize(0.9, primaryColor),

        background: hsl(primary.hue, 0.20, 0.97),
        backgroundHover: hsl(primary.hue, 0.20, 0.92),
        backgroundAlt: hsl(primary.hue, 0.25, 0.90),
        backgroundAltHover: hsl(primary.hue, 0.25, 0.85),
        backgroundInput: hsl(primary.hue, 1, 1),

        text: hsl(primary.hue, primary.saturation, 0.10),
        textalt: hsl(primary.hue, 0.30, 0.30),
        textLight: hsl(primary.hue, 0.30, 0.95),

        shadow: transparentize(0.7, hsl(primary.hue, 0.10, primary.lightness / 2)),
      };
    }
  }
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

type PropsWithTheme = { theme: Theme };

export const color = (selectedColor: keyof Theme['colors']) => (props: PropsWithTheme) => (
  props.theme.colors[selectedColor]
);
