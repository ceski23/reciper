import { recipe, type RecipeVariants } from '@vanilla-extract/recipes'
import { styleUtils } from '#utils'
import { theme } from '#theme'
import { typography } from '#typography'

export const chipStyle = recipe({
	base: {
		position: 'relative',
		overflow: 'clip',
		cursor: 'pointer',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing[2],
		height: styleUtils.pxToRem(32),
		paddingLeft: theme.spacing[4],
		paddingRight: theme.spacing[4],
		borderRadius: styleUtils.pxToRem(8),
		transition: 'background-color .2s, box-shadow .2s, border-color .2s',
		WebkitTapHighlightColor: 'transparent',
		textDecoration: 'none',
		':focus-visible': {
			outlineOffset: theme.spacing[1],
			outlineColor: theme.colors.outline,
		},
	},
	variants: {
		variant: {
			outlined: {
				color: theme.colors.onSurfaceVariant,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.colors.outlineVariant}`,
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surface,
							theme.colors.onSurfaceVariant,
							0.08,
						),
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surface,
							theme.colors.onSurfaceVariant,
							0.1,
						),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surface,
							theme.colors.onSurfaceVariant,
							0.1,
						),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						borderColor: styleUtils.transparentize(theme.colors.onSurface, 0.1),
						cursor: 'not-allowed',
					},
				},
			},
			elevated: {
				color: theme.colors.onSurface,
				backgroundColor: theme.colors.surfaceContainerLow,
				boxShadow: theme.elevation[1],
				border: 'none',
				selectors: {
					'&:hover:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surfaceContainerLow,
							theme.colors.onSurfaceVariant,
							0.08,
						),
					},
					'&:active:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surfaceContainerLow,
							theme.colors.onSurfaceVariant,
							0.1,
						),
						boxShadow: theme.elevation[2],
					},
					'&:focus-visible:not([data-disabled])': {
						backgroundColor: styleUtils.blendWithColor(
							theme.colors.surfaceContainerLow,
							theme.colors.onSurfaceVariant,
							0.1,
						),
					},
					'&[data-disabled]': {
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.1),
						boxShadow: theme.elevation[0],
						cursor: 'not-allowed',
					},
				},
			},
		},
		pressed: {
			true: {},
		},
		withLeadingIcon: {
			true: {
				paddingLeft: theme.spacing[2],
			},
		},
		withTrailingIcon: {
			true: {
				paddingRight: theme.spacing[2],
			},
		},
	},
	defaultVariants: {
		variant: 'outlined',
	},
	compoundVariants: [
		{
			variants: { variant: 'outlined', pressed: true },
			style: {
				backgroundColor: theme.colors.secondaryContainer,
				color: theme.colors.onSecondaryContainer,
				border: 'none',
				selectors: {
					'&:hover:not([data-disabled])': {
						boxShadow: theme.elevation[1],
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
							0.1,
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
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.1),
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					},
				},
			},
		},
		{
			variants: { variant: 'elevated', pressed: true },
			style: {
				backgroundColor: theme.colors.secondaryContainer,
				color: theme.colors.onSecondaryContainer,
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
							0.1,
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
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.12),
						boxShadow: theme.elevation[0],
						color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					},
				},
			},
		},
	],
})

export const labelStyle = typography({ variant: 'labelLarge' })

export const iconStyle = recipe({
	base: {
		width: styleUtils.pxToRem(18),
		height: styleUtils.pxToRem(18),
		flexShrink: 0,
	},
	variants: {
		pressed: {
			true: {},
		},
		leading: {
			true: {
				color: theme.colors.primary,
				selectors: {
					'[data-disabled] &': {
						color: 'currentColor',
					},
				},
			},
		},
	},
	compoundVariants: [
		{
			variants: { leading: true, pressed: true },
			style: {
				color: 'currentColor',
			},
		},
	],
})

export type ChipVariants = RecipeVariants<typeof chipStyle>
