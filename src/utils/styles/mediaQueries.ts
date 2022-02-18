import { Breakpoint, breakpoints } from 'utils/styles/theme';

export const mediaUp = (breakpoint: Breakpoint) => `(min-width: ${breakpoints[breakpoint]}px)`;
export const mediaDown = (breakpoint: Breakpoint) => `(max-width: ${breakpoints[breakpoint]}px)`;

type ColorScheme = 'light' | 'dark';
const colorScheme = (type: ColorScheme): string => `(prefers-color-scheme: ${type})`;

export const media = {
  up: (breakpoint: Breakpoint): string => `@media ${mediaUp(breakpoint)}`,
  down: (breakpoint: Breakpoint): string => `@media ${mediaDown(breakpoint)}`,
  colorScheme,
};
