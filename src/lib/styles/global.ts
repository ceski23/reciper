import '@fontsource-variable/roboto-flex'
import { globalStyle } from '@macaron-css/core'
import { theme } from '@styles/theme'

globalStyle(':root', {
	colorScheme: 'light dark',
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSynthesis: 'none',
	textRendering: 'optimizeLegibility',
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
	textSizeAdjust: '100%',
	WebkitTapHighlightColor: 'transparent',
	color: theme.colors.onBackground,
})

globalStyle('*', {
	boxSizing: 'border-box',
	padding: 0,
	margin: 0,
})

globalStyle('::selection', {
	backgroundColor: theme.colors.surfaceVariant,
	color: theme.colors.onSurfaceVariant,
})
