import { styled } from '@macaron-css/react'
import { animated } from '@react-spring/web'

export const RipplesContainer = styled('div', {
	base: {
		position: 'absolute',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
		left: 0,
		top: 0,
	},
})

export const Ripple = styled(animated.div, {
	base: {
		position: 'absolute',
		borderRadius: '50%',
		backgroundColor: 'currentColor',
		pointerEvents: 'none',
	},
})
