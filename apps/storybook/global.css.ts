import { theme } from '@repo/ui/theme'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('body', {
	color: theme.colors.onBackground,
})
