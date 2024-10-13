import { Button } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { Link, type ToOptions } from '@tanstack/react-router'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef } from 'react'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { Icon } from 'lib/components2/Icon'
import { Typography } from 'lib/components2/Typography'
import { useRipples } from 'lib/hooks/useRipples'
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
}, ref) => {
	const { eventHandlers, renderRipples } = useRipples()

	return (
		<ChipBase
			withLeadingIcon={icon !== undefined}
			withCloseIcon={onClose !== undefined}
			ref={ref}
			// @ts-expect-error TS is shouting but it works
			as={props.to !== undefined ? Link : undefined}
			{...mergeProps(props, eventHandlers)}
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
				// eslint-disable-next-line jsx-a11y/prefer-tag-over-role
				<CloseButton
					role="button"
					title="Close"
					onClick={event => {
						event.stopPropagation()
						onClose()
					}}
				>
					<Icon
						name="close"
						size={18}
					/>
				</CloseButton>
			)}
			{renderRipples}
		</ChipBase>
	)
})

export const ChipBase = styled(Button, {
	base: {
		backgroundColor: theme.colors.surfaceContainerLow,
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
		position: 'relative',
	},
	variants: {
		variant: {
			outlined: {
				color: theme.colors.onSurfaceVariant,
				border: `1px solid ${theme.colors.outlineVariant}`,
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
					backgroundColor: theme.colors.surfaceContainerLow,
					opacity: 0.38,
					cursor: 'unset',
				},
				selectors: {
					'&[aria-checked="true"]': {
						backgroundColor: theme.colors.secondaryContainer,
						color: theme.colors.onSecondaryContainer,
						borderColor: theme.colors.secondaryContainer,
					},
					'&[aria-checked="true"]:hover': {
						boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
						borderColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
					},
					'&[aria-checked="true"]:focus-visible': {
						boxShadow: 'none',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
						borderColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[aria-checked="true"]:active': {
						boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
						borderColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[aria-checked="true"]:disabled': {
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
					'&[aria-checked="true"]': {
						backgroundColor: theme.colors.secondaryContainer,
						color: theme.colors.onSecondaryContainer,
						boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
					},
					'&[aria-checked="true"]:hover': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
					},
					'&[aria-checked="true"]:focus-visible': {
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[aria-checked="true"]:active': {
						boxShadow: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
						backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
					},
					'&[aria-checked="true"]:disabled': {
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

export const Label = styled(Typography.LabelLarge, {
	base: {
		color: theme.colors.onSurface,
	},
})

export const ChipIcon = styled(Icon, {
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

export const CloseButton = styled('span', {
	base: {
		width: 18,
		height: 18,
	},
})
