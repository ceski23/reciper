import { theme } from '#theme'
import { styleUtils } from '#utils'
import { calc } from '@vanilla-extract/css-utils'
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'

export const containerStyle = recipe({
	base: {
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
		style: {
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
			standard: {
				color: theme.colors.onSurfaceVariant,
				backgroundColor: 'transparent',
				border: 'none',
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
		},
		shape: {
			round: {
				borderRadius: calc.multiply('infinity', '1px'),
			},
			square: {},
		},
		size: {
			extraSmall: {
				height: theme.spacing[8],
			},
			small: {
				height: theme.spacing[10],
			},
			medium: {
				height: theme.spacing[14],
			},
			large: {
				height: theme.spacing[24],
			},
			extraLarge: {
				height: theme.spacing[34],
			},
		},
		width: {
			narrow: {},
			default: {},
			wide: {},
		},
	},
	compoundVariants: [
		// Square shape border radius adjustments
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
		// Width adjustments
		{
			variants: { width: 'default', size: 'extraSmall' },
			style: {
				width: theme.spacing[8],
			},
		},
		{
			variants: { width: 'default', size: 'small' },
			style: {
				width: theme.spacing[10],
			},
		},
		{
			variants: { width: 'default', size: 'medium' },
			style: {
				width: theme.spacing[14],
			},
		},
		{
			variants: { width: 'default', size: 'large' },
			style: {
				width: theme.spacing[24],
			},
		},
		{
			variants: { width: 'default', size: 'extraLarge' },
			style: {
				width: theme.spacing[34],
			},
		},
		{
			variants: { width: 'narrow', size: 'extraSmall' },
			style: {
				width: theme.spacing[7],
			},
		},
		{
			variants: { width: 'narrow', size: 'small' },
			style: {
				width: theme.spacing[8],
			},
		},
		{
			variants: { width: 'narrow', size: 'medium' },
			style: {
				width: theme.spacing[12],
			},
		},
		{
			variants: { width: 'narrow', size: 'large' },
			style: {
				width: theme.spacing[16],
			},
		},
		{
			variants: { width: 'narrow', size: 'extraLarge' },
			style: {
				width: theme.spacing[26],
			},
		},
		{
			variants: { width: 'wide', size: 'extraSmall' },
			style: {
				width: theme.spacing[10],
			},
		},
		{
			variants: { width: 'wide', size: 'small' },
			style: {
				width: theme.spacing[13],
			},
		},
		{
			variants: { width: 'wide', size: 'medium' },
			style: {
				width: theme.spacing[18],
			},
		},
		{
			variants: { width: 'wide', size: 'large' },
			style: {
				width: theme.spacing[32],
			},
		},
		{
			variants: { width: 'wide', size: 'extraLarge' },
			style: {
				width: theme.spacing[46],
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

export type ContainerVariants = RecipeVariants<typeof containerStyle>
