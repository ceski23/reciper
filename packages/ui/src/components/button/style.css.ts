import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { calc } from '@vanilla-extract/css-utils'
import { styleUtils } from '#utils'
import { theme } from '#theme'
import { typography } from '#typography'

export const buttonStyle = recipe({
	base: {
		letterSpacing: styleUtils.pxToRem(0.1),
		position: 'relative',
		overflow: 'clip',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'background-color .2s,  box-shadow .2s, border-radius .2s',
		WebkitTapHighlightColor: 'transparent',
		':focus-visible': {
			outlineOffset: theme.spacing[1],
			outlineColor: theme.colors.outline,
		},
	},
	variants: {
		variant: {
			elevated: {
				color: theme.colors.primary,
				backgroundColor: theme.colors.surfaceContainerLow,
				boxShadow: theme.elevation[1],
				border: 'none',
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surfaceContainerLow,
							theme.colors.primary,
							0.08,
						),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surfaceContainerLow,
							theme.colors.primary,
							0.08,
						),
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surfaceContainerLow,
							theme.colors.primary,
							0.1,
						),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.1),
						boxShadow: theme.elevation[0],
						cursor: 'not-allowed',
					},
				},
			},
			tonal: {
				color: theme.colors.onSecondaryContainer,
				backgroundColor: theme.colors.secondaryContainer,
				border: 'none',
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.secondaryContainer,
							theme.colors.onSecondaryContainer,
							0.08,
						),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.secondaryContainer,
							theme.colors.onSecondaryContainer,
							0.08,
						),
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.secondaryContainer,
							theme.colors.onSecondaryContainer,
							0.1,
						),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.1),
						cursor: 'not-allowed',
					},
				},
			},
			filled: {
				backgroundColor: theme.colors.primary,
				color: theme.colors.onPrimary,
				border: 'none',
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onPrimary, 0.08),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onPrimary, 0.08),
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onPrimary, 0.1),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.1),
						cursor: 'not-allowed',
					},
				},
			},
			outlined: {
				color: theme.colors.onSurfaceVariant,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.colors.outlineVariant}`,
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.08),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.08),
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.1),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.1),
						cursor: 'not-allowed',
					},
				},
			},
			text: {
				color: theme.colors.primary,
				backgroundColor: 'transparent',
				border: 'none',
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.1),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.1),
						cursor: 'not-allowed',
					},
				},
			},
		},
		size: {
			extraSmall: [
				typography({ variant: 'labelLarge' }),
				{
					height: theme.spacing[8],
					paddingInline: theme.spacing[3],
					gap: theme.spacing[1],
				},
			],
			small: [
				typography({ variant: 'labelLarge' }),
				{
					height: theme.spacing[10],
					paddingInline: theme.spacing[4],
					gap: theme.spacing[2],
				},
			],
			medium: [
				typography({ variant: 'titleMedium' }),
				{
					height: theme.spacing[14],
					paddingInline: theme.spacing[6],
					gap: theme.spacing[2],
				},
			],
			large: [
				typography({ variant: 'headlineSmall' }),
				{
					height: theme.spacing[24],
					paddingInline: theme.spacing[12],
					gap: theme.spacing[3],
				},
			],
			extraLarge: [
				typography({ variant: 'headlineLarge' }),
				{
					height: theme.spacing[34],
					paddingInline: theme.spacing[16],
					gap: theme.spacing[4],
				},
			],
		},
		shape: {
			round: {
				borderRadius: calc.multiply('infinity', '1px'),
			},
			square: {},
		},
	},
	compoundVariants: [
		{
			variants: { shape: 'square', size: 'extraSmall' },
			style: {
				borderRadius: 12,
			},
		},
		{
			variants: { shape: 'square', size: 'small' },
			style: {
				borderRadius: 12,
			},
		},
		{
			variants: { shape: 'square', size: 'medium' },
			style: {
				borderRadius: 16,
			},
		},
		{
			variants: { shape: 'square', size: 'large' },
			style: {
				borderRadius: 28,
			},
		},
		{
			variants: { shape: 'square', size: 'extraLarge' },
			style: {
				borderRadius: 28,
			},
		},
	],
})

export const iconStyle = recipe({
	variants: {
		size: {
			extraSmall: {
				width: 20,
				height: 20,
			},
			small: {
				width: 20,
				height: 20,
			},
			medium: {
				width: 24,
				height: 24,
			},
			large: {
				width: 32,
				height: 32,
			},
			extraLarge: {
				width: 40,
				height: 40,
			},
		},
	},
})

export type ButtonVariants = RecipeVariants<typeof buttonStyle>
