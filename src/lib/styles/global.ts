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
	boxSizing: 'border-box',
})

globalStyle('body', {
	margin: 0,
	display: 'flex',
	placeItems: 'center',
	minWidth: '320px',
	minHeight: '100vh',
})
