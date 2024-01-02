import { keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { styleUtils, theme } from 'lib/styles'

const shimmer = keyframes({
	to: {
		transform: 'translateX(100%)',
	},
})

export const Skeleton = styled('div', {
	base: {
		borderRadius: 12,
		display: 'block',
		height: '1em',
		position: 'relative',
		overflow: 'hidden',
		backgroundColor: theme.colors.surfaceContainer,
		'::after': {
			content: '',
			position: 'absolute',
			inset: 0,
			transform: 'translateX(-100%)',
			backgroundImage: `linear-gradient(90deg, ${theme.colors.surfaceContainer} 0, ${
				styleUtils.transparentize(theme.colors.surfaceContainerHighest, 0.2)
			} 20%, ${styleUtils.transparentize(theme.colors.surfaceContainerHighest, 0.5)} 60%, ${theme.colors.surfaceContainer})`,
			animation: `${shimmer} 1.5s infinite`,
		},
	},
})
