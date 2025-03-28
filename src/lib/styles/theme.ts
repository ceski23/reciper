import { createThemeContract } from '@macaron-css/core'
import * as schemes from './theme.json'

export const theme = createThemeContract({
	colors: schemes.light,
})

export const breakpoints = {
	xs: 320,
	sm: 544,
	md: 768,
	lg: 1012,
	xl: 1280,
	xxl: 1400,
}

export type Breakpoint = keyof typeof breakpoints
