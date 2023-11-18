import { styled } from '@macaron-css/react'
import mergeProps from 'merge-props'
import { type ComponentProps, forwardRef, useCallback, useState } from 'react'
import { Tooltip } from 'lib/components/Tooltip'
import { useLongPress } from 'lib/hooks/useLongPress'
import { useRipples } from 'lib/hooks/useRipples'
import { styleUtils, theme } from 'lib/styles'
import Icon, { type SvgName } from '~virtual/svg-component'

type IconButtonProps = {
	icon: SvgName
	title: string
}

export const IconButton = forwardRef<HTMLButtonElement, ComponentProps<typeof ButtonBase> & IconButtonProps>(({
	icon,
	type = 'button',
	title,
	...props
}, ref) => {
	const [isTooltipOpen, setIsTooltipOpen] = useState(false)
	const { eventHandlers, renderRipples } = useRipples()
	const handleLongPress = useCallback(() => {
		setIsTooltipOpen(true)
		navigator.vibrate(50)
	}, [])
	const longPressHandlers = useLongPress(handleLongPress, 700)

	return (
		<Tooltip
			content={title}
			sideOffset={4}
			open={isTooltipOpen}
			onOpenChange={setIsTooltipOpen}
		>
			<ButtonBase
				type={type}
				ref={ref}
				aria-label={title}
				{...mergeProps(props, eventHandlers, longPressHandlers)}
			>
				{renderRipples}
				<StyledIcon name={icon} />
			</ButtonBase>
		</Tooltip>
	)
})

const ButtonBase = styled('button', {
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

const StyledIcon = styled(Icon, {
	base: {
		width: 24,
		height: 24,
	},
})
