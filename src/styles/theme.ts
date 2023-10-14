import { createTheme } from '@macaron-css/core'
import * as schemes from './theme.json'

export const [lightThemeClass, theme] = createTheme({
	colors: schemes.light,
})

export const darkThemeClass = createTheme(theme, {
	colors: schemes.dark,
})
