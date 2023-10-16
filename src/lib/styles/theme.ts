import { createThemeContract } from '@macaron-css/core'
import * as schemes from './theme.json'

export const theme = createThemeContract({
	colors: schemes.light,
})
