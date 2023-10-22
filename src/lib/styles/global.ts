import '@fontsource-variable/roboto-flex'
import { globalStyle } from '@macaron-css/core'

globalStyle(':root', {
	colorScheme: 'light dark',
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSynthesis: 'none',
	textRendering: 'optimizeLegibility',
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
	textSizeAdjust: '100%',
	WebkitTapHighlightColor: 'transparent',
})

globalStyle('*', {
	boxSizing: 'border-box',
	padding: 0,
	margin: 0,
})
