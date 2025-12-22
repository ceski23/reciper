import { createTheme, createThemeContract } from '@vanilla-extract/css'
import schemes from './theme.json' with { type: 'json' }
import { pxToRem } from './utils/style'

const spacing = {
	0: '0rem',
	0.5: '0.125rem',
	1: '0.25rem',
	1.5: '0.375rem',
	2: '0.5rem',
	2.5: '0.625rem',
	3: '0.75rem',
	4: '1rem',
	4.5: '1.125rem',
	5: '1.25rem',
	5.5: '1.375rem',
	6: '1.5rem',
	7: '1.75rem',
	8: '2rem',
	9: '2.25rem',
	10: '2.5rem',
	11: '2.75rem',
	12: '3rem',
	14: '3.5rem',
	16: '4rem',
	20: '5rem',
	24: '6rem',
	28: '7rem',
	32: '8rem',
	34: '8.5rem',
	36: '9rem',
	40: '10rem',
	44: '11rem',
	48: '12rem',
	52: '13rem',
	56: '14rem',
	60: '15rem',
	64: '16rem',
	72: '18rem',
	80: '20rem',
	96: '24rem',
}

const typography = {
	displayLarge: `400 ${pxToRem(57)}/64px "Roboto Flex Variable", sans-serif`,
	displayMedium: `400 ${pxToRem(45)}/52px "Roboto Flex Variable", sans-serif`,
	displaySmall: `400 ${pxToRem(36)}/44px "Roboto Flex Variable", sans-serif`,
	headlineLarge: `400 ${pxToRem(32)}/40px "Roboto Flex Variable", sans-serif`,
	headlineMedium: `400 ${pxToRem(28)}/36px "Roboto Flex Variable", sans-serif`,
	headlineSmall: `400 ${pxToRem(24)}/32px "Roboto Flex Variable", sans-serif`,
	titleLarge: `400 ${pxToRem(22)}/28px "Roboto Flex Variable", sans-serif`,
	titleMedium: `500 ${pxToRem(16)}/24px "Roboto Flex Variable", sans-serif`,
	titleSmall: `500 ${pxToRem(14)}/20px "Roboto Flex Variable", sans-serif`,
	bodyLarge: `400 ${pxToRem(16)}/24px "Roboto Flex Variable", sans-serif`,
	bodyMedium: `400 ${pxToRem(14)}/20px "Roboto Flex Variable", sans-serif`,
	bodySmall: `400 ${pxToRem(12)}/16px "Roboto Flex Variable", sans-serif`,
	labelLarge: `500 ${pxToRem(14)}/20px "Roboto Flex Variable", sans-serif`,
	labelMedium: `500 ${pxToRem(12)}/16px "Roboto Flex Variable", sans-serif`,
	labelSmall: `500 ${pxToRem(11)}/16px "Roboto Flex Variable", sans-serif`,
}

const elevation = {
	0: 'none',
	1: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
	2: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
	3: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
	4: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)',
	5: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)',
}

export const theme = createThemeContract({
	colors: schemes.light,
	spacing,
	typography,
	elevation,
})

export const defaultLightThemeClass = createTheme(theme, {
	colors: schemes.light,
	spacing,
	typography,
	elevation,
})

export const defaultDarkThemeClass = createTheme(theme, {
	colors: schemes.dark,
	spacing,
	typography,
	elevation,
})
