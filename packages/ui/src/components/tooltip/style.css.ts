import { theme } from '#theme'
import { typography } from '#typography'
import { recipe } from '@vanilla-extract/recipes'

export const containerStyle = recipe({
	base: [
		typography({ variant: 'bodySmall' }),
		{
			display: 'flex',
			paddingInline: theme.spacing[2],
			paddingBlock: theme.spacing[1],
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: theme.colors.inverseSurface,
			color: theme.colors.inverseOnSurface,
			borderRadius: 4,
			minHeight: 24,
			transformOrigin: 'var(--transform-origin)',
			transition: 'opacity 300ms, transform 150ms',
			willChange: 'opacity, transform',
			selectors: {
				'&:is([data-starting-style], [data-ending-style])': {
					opacity: 0,
				},
				'&:is([data-starting-style], [data-ending-style])[data-side="top"]': {
					transform: 'translateY(-4px)',
				},
				'&:is([data-starting-style], [data-ending-style])[data-side="bottom"]': {
					transform: 'translateY(4px)',
				},
				'&:is([data-starting-style], [data-ending-style])[data-side="left"]': {
					transform: 'translateX(-4px)',
				},
				'&:is([data-starting-style], [data-ending-style])[data-side="right"]': {
					transform: 'translateX(4px)',
				},
				'&[data-instant]': {
					transition: 'none',
				},
			},
		},
	],
})
