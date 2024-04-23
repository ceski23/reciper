import { styled } from '@macaron-css/react'
import * as Toggle from '@radix-ui/react-toggle'
import { Link, type ToOptions } from '@tanstack/react-router'
import { type ComponentProps, forwardRef } from 'react'
import { type SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { styleUtils, theme } from 'lib/styles'

type ChipProps = ToOptions & {
	text: string
	icon?: SvgSpriteIconName
	onClose?: VoidFunction
}

export const Chip = forwardRef<HTMLButtonElement, ComponentProps<typeof ChipBase> & ChipProps>(({
	text,
	icon,
	onClose,
	...props
}, ref) => (
	<ChipBase
		withLeadingIcon={icon !== undefined}
		withCloseIcon={onClose !== undefined}
		ref={ref}
		// @ts-expect-error TS is shouting but it works
		as={props.to !== undefined ? Link : undefined}
		{...props}
	>
		{icon && (
			<ChipIcon
				name={icon}
				variant={props.disabled ? 'disabled' : 'primary'}
			/>
		)}
		<Label>
			{text}
		</Label>
		{onClose && (
			<CloseIcon
				name="close"
				onClick={event => {
					event.stopPropagation()
					onClose()
				}}
			/>
		)}
	</ChipBase>
))

export const ChipBase = styled(Toggle.Root, {
	base: {
		backgroundColor: 'transparent',
		border: 'none',
		paddingInline: 16,
		paddingBlock: 6,
		display: 'flex',
		gap: 8,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
		transition: 'background-color .2s, border .2s, box-shadow .2s',
		cursor: 'pointer',
		borderRadius: 8,
		outline: 'none',
	},
	variants: {
		variant: {
			outlined: {
				color: theme.colors.onSurfaceVariant,
				border: `1px solid ${theme.colors.outline}`,
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.08),
				},
				':focus-visible': {
					borderColor: theme.colors.onSurface,
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.12),
				},
				':active': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.12),
				},
				':disabled': {
					borderColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.5),
					backgroundColor: 'transparent',
					opacity: 0.38,
					cursor: 'unset',
				},
				selectors: {
					'&[data-state="on"]': {
						backgroundColor: theme.colors.secondaryContainer,
						color: theme.colors.onSecondaryContainer,
						borderColor: theme.colors.secondaryContainer,
					},
					'&[data-state="on"]:hover': {
						boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
						borderColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
					},
					'&[data-state="on"]:focus-visible': {
						boxShadow: 'none',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
						borderColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[data-state="on"]:active': {
						boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
						borderColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[data-state="on"]:disabled': {
						boxShadow: 'none',
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.5),
						borderColor: 'transparent',
						color: theme.colors.onSurface,
						opacity: 0.38,
					},
				},
			},
			elevated: {
				backgroundColor: theme.colors.surfaceContainerLow,
				boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
				color: theme.colors.onSurfaceVariant,
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerLow, theme.colors.onSurfaceVariant, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerLow, theme.colors.onSurfaceVariant, 0.12),
				},
				':active': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.surfaceContainerLow, theme.colors.onSurfaceVariant, 0.12),
					boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
				},
				':disabled': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.5),
					opacity: 0.38,
					cursor: 'unset',
				},
				selectors: {
					'&[data-state="on"]': {
						backgroundColor: theme.colors.secondaryContainer,
						color: theme.colors.onSecondaryContainer,
						boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
					},
					'&[data-state="on"]:hover': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
					},
					'&[data-state="on"]:focus-visible': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[data-state="on"]:active': {
						boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[data-state="on"]:disabled': {
						boxShadow: 'none',
						backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.5),
						color: theme.colors.onSurface,
						opacity: 0.38,
					},
				},
			},
		},
		withLeadingIcon: {
			true: {
				paddingLeft: 8,
			},
		},
		withCloseIcon: {
			true: {
				paddingRight: 8,
			},
		},
	},
	defaultVariants: {
		variant: 'outlined',
	},
})

const Label = styled(Typography.LabelLarge, {
	base: {
		color: theme.colors.onSurface,
	},
})

const ChipIcon = styled(Icon, {
	base: {
		width: 18,
		height: 18,
	},
	variants: {
		variant: {
			primary: {
				color: theme.colors.primary,
			},
			disabled: {
				color: theme.colors.onSurface,
			},
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
})

const CloseIcon = styled(Icon, {
	base: {
		width: 18,
		height: 18,
	},
})
