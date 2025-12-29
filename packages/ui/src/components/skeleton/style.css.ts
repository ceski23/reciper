import { keyframes, style } from '@vanilla-extract/css'
import { theme } from '#theme'
import { styleUtils } from '#utils'

const shimmerKeyframes = keyframes({
	'0%': {
		transform: 'translateX(-100%)',
	},
	'100%': {
		transform: 'translateX(100%)',
	},
})

export const skeletonStyle = style({
	position: 'relative',
	overflow: 'hidden',
	height: '1em',
	borderRadius: '12px',
	backgroundColor: theme.colors.surfaceContainer,
	'::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: `linear-gradient(
			90deg,
			${theme.colors.surfaceContainer} 0%,
			${styleUtils.transparentize(theme.colors.surfaceContainerHighest, 0.2)} 20%,
			${styleUtils.transparentize(theme.colors.surfaceContainerHighest, 0.5)} 60%,
			${theme.colors.surfaceContainer} 100%
		)`,
		animation: `${shimmerKeyframes} 1.5s infinite`,
	},
})
