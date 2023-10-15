import { globalStyle } from '@macaron-css/core'
import '@fontsource-variable/roboto-flex'

globalStyle(':root', {
	colorScheme: 'light dark',
	fontFamily: '"Roboto Flex Variable", sans-serif',
	fontSynthesis: 'none',
	textRendering: 'optimizeLegibility',
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
	textSizeAdjust: '100%',
})

globalStyle('*', {
	boxSizing: 'border-box',
	padding: 0,
	margin: 0,
})
