import { theme } from '#theme'
import { createVar, keyframes } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const progressVar = createVar('progress')
export const gapVar = createVar('gap')

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
				width: calc(1).subtract(progressVar).multiply('100%').subtract(gapVar).toString(),
				left: `min(100%, ${calc(progressVar).multiply('100%').add(gapVar).toString()})`,
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

const circularSpinningAnimation = keyframes({
	'0%': {
		transform: 'rotate(0deg)',
	},
	'100%': {
		transform: 'rotate(270deg)',
	},
})

const offset = createVar('strokeDashoffset')
const duration = createVar('animationDuration')
const dashAnimation = keyframes({
	'0%': {
		strokeDashoffset: offset,
	},
	'50%': {
		strokeDashoffset: `calc(${offset} / 4)`,
		transform: 'rotate(135deg)',
	},
	'100%': {
		strokeDashoffset: offset,
		transform: 'rotate(450deg)',
	},
})

export const circularRootStyle = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		transform: 'rotate(-90deg)',
		vars: {
			[offset]: '187px',
			[duration]: '1.4s',
		},
	},
})

export const circularSvgStyle = recipe({
	variants: {
		isIndeterminate: {
			false: {},
			true: {
				animation: `${circularSpinningAnimation} ${duration} linear infinite`,
			},
		},
	},
})

export const circularTrackStyle = recipe({
	base: {
		fill: 'none',
		stroke: theme.colors.secondaryContainer,
	},
	variants: {
		size: {
			thin: {
				strokeWidth: 10,
			},
			thick: {
				strokeWidth: 16,
			},
		},
		isIndeterminate: {
			false: {},
			true: {},
		},
	},
})

export const circularIndicatorStyle = recipe({
	base: {
		fill: 'none',
		stroke: theme.colors.primary,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		transformOrigin: 'center',
		willChange: 'stroke-dashoffset, transform',
	},
	variants: {
		size: {
			thin: {
				strokeWidth: 10,
			},
			thick: {
				strokeWidth: 16,
			},
		},
		isIndeterminate: {
			false: {
				strokeDasharray: 282.7433388230814,
				strokeDashoffset: `calc(282.7433388230814 * (1 - ${progressVar}))`,
				transition: 'stroke-dashoffset 0.3s ease',
			},
			true: {
				strokeDasharray: offset,
				animation: `${dashAnimation} ${duration} ease-in-out infinite`,
			},
		},
	},
})

export type ProgressIndicatorVariants = RecipeVariants<typeof trackStyle>
export type CircularProgressIndicatorVariants = RecipeVariants<typeof circularTrackStyle>
