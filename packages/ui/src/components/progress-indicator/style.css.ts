import { theme } from '#theme'
import { keyframes } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

// Animation duration constants based on Material 3 specs
const LINEAR_ANIMATION_DURATION = 1750 // Total duration for one linear cycle in ms

// First bar animation - moves left to right
const indeterminateFirstBarAnimation = keyframes({
	'0%': {
		left: '-50%',
	},
	'100%': {
		left: '100%',
	},
})

// Second bar animation - starts after first, same movement
const indeterminateSecondBarAnimation = keyframes({
	'0%': {
		left: '-50%',
	},
	'100%': {
		left: '100%',
	},
})

export const rootStyle = recipe({
	base: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		isolation: 'isolate',
		overflow: 'hidden',
		position: 'relative',
	},
})

export const trackStyle = recipe({
	base: {
		display: 'flex',
		backgroundColor: theme.colors.secondaryContainer,
		position: 'relative',
		gridArea: '1 / 1',
		transition: 'width 0.3s ease, left 0.3s ease',
	},
	variants: {
		size: {
			thin: {
				height: 4,
				borderRadius: 2,
			},
			thick: {
				height: 8,
				borderRadius: 4,
			},
		},
		isIndeterminate: {
			false: {
				width: calc(1).subtract('var(--progress)').multiply('100%').subtract('var(--gap)').toString(),
				left: `min(100%, ${calc('var(--progress)').multiply('100%').add('var(--gap)').toString()})`,
			},
			true: {
				width: '100%',
				left: 0,
				overflow: 'clip',
			},
		},
	},
})

export const indicatorStyle = recipe({
	base: {
		backgroundColor: theme.colors.primary,
	},
	variants: {
		size: {
			thin: {
				height: 4,
				borderRadius: 2,
			},
			thick: {
				height: 8,
				borderRadius: 4,
			},
		},
		isIndeterminate: {
			false: {
				display: 'flex',
				transition: 'width 0.3s ease',
				gridArea: '1 / 1',
				position: 'relative',
			},
			true: {
				position: 'absolute',
				top: 0,
				width: '50%',
				height: '100%',
				animation: `${indeterminateFirstBarAnimation} ${LINEAR_ANIMATION_DURATION}ms ease-in-out infinite`,
			},
		},
	},
})

// Second indicator bar for indeterminate state
export const indicatorSecondStyle = recipe({
	base: {
		backgroundColor: theme.colors.primary,
	},
	variants: {
		size: {
			thin: {
				height: 4,
				borderRadius: 2,
			},
			thick: {
				height: 8,
				borderRadius: 4,
			},
		},
		isIndeterminate: {
			false: {
				display: 'none',
			},
			true: {
				position: 'absolute',
				top: 0,
				width: '50%',
				height: '100%',
				animation: `${indeterminateSecondBarAnimation} ${LINEAR_ANIMATION_DURATION}ms ease-in-out infinite`,
				animationDelay: `${(LINEAR_ANIMATION_DURATION * 0.55) / 1000}s`,
			},
		},
	},
})

export const stopStyle = recipe({
	base: {
		backgroundColor: theme.colors.primary,
		position: 'absolute',
	},
	variants: {
		size: {
			thin: {
				width: 4,
				height: 4,
				borderRadius: 26,
				right: 0,
			},
			thick: {
				width: 4,
				height: 4,
				borderRadius: 3,
				top: 2,
				right: 2,
			},
		},
	},
})

export type ProgressIndicatorVariants = RecipeVariants<typeof trackStyle>
