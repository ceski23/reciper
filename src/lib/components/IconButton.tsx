import * as Ariakit from '@ariakit/react'
import { useRipples } from '@hooks/useRipples'
import { styled } from '@macaron-css/react'
import { useLongPress } from '@uidotdev/usehooks'
import mergeProps from 'merge-props'
import { type ComponentProps, useCallback, useState } from 'react'
import type { SvgSpriteIconName } from 'virtual:svg-sprite'
import { styleUtils, theme } from 'lib/styles'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'

type IconButtonProps = ComponentProps<typeof ButtonBase> & {
	icon: SvgSpriteIconName
	title: string
}

export const IconButton = ({
	icon,
	type = 'button',
	title,
	...props
}: IconButtonProps) => {
	const [isTooltipOpen, setIsTooltipOpen] = useState(false)
	const { eventHandlers, renderRipples } = useRipples()
	const handleLongPress = useCallback(() => {
		setIsTooltipOpen(true)
		navigator.vibrate(1)
	}, [])
	const longPressHandlers = useLongPress(handleLongPress, { threshold: 700 })

	return (
		<Tooltip
			content={title}
			gutter={4}
			open={isTooltipOpen}
			setOpen={setIsTooltipOpen}
		>
			<ButtonBase
				type={type}
				aria-label={title}
				{...mergeProps(props, eventHandlers, longPressHandlers)}
			>
				{renderRipples}
				<Icon
					name={icon}
					size={24}
				/>
			</ButtonBase>
		</Tooltip>
	)
}

const ButtonBase = styled(Ariakit.Button, {
	base: {
		width: 40,
		height: 40,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
		borderRadius: 100,
		padding: 8,
		transition: 'background-color .2s, color .2s',
		position: 'relative',
		overflow: 'hidden',
		cursor: 'pointer',
		':focus-visible': {
			outline: 'none',
		},
	},
	variants: {
		variant: {
			standard: {
				backgroundColor: 'transparent',
				color: theme.colors.onSurfaceVariant,
				border: 'none',
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.12),
				},
				':disabled': {
					opacity: 0.38,
					cursor: 'unset',
				},
			},
			filled: {
				backgroundColor: theme.colors.primary,
				color: theme.colors.onPrimary,
				border: 'none',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onSurfaceVariant, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.primary, theme.colors.onSurfaceVariant, 0.12),
				},
				':disabled': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					cursor: 'unset',
				},
			},
			tonal: {
				backgroundColor: theme.colors.secondaryContainer,
				color: theme.colors.onSecondaryContainer,
				border: 'none',
				':hover': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.blendWithColor(theme.colors.secondaryContainer, theme.colors.onSecondaryContainer, 0.12),
				},
				':disabled': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					cursor: 'unset',
				},
			},
			outlined: {
				color: theme.colors.onSurfaceVariant,
				backgroundColor: 'transparent',
				border: `1px solid ${theme.colors.outline}`,
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.transparentize(theme.colors.onSurfaceVariant, 0.12),
				},
				':disabled': {
					backgroundColor: 'transparent',
					borderColor: styleUtils.transparentize(theme.colors.onSurface, 0.12),
					color: styleUtils.transparentize(theme.colors.onSurface, 0.38),
					cursor: 'unset',
				},
			},
		},
		isSelected: {
			true: {},
		},
	},
	defaultVariants: {
		variant: 'standard',
	},
	compoundVariants: [
		{
			// TODO: Add remaining styles for selected button
			variants: {
				variant: 'standard',
				isSelected: true,
			},
			style: {
				color: theme.colors.primary,
				':hover': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.08),
				},
				':focus-visible': {
					backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
				},
			},
		},
	],
})
