import { FunctionComponent, useId, useState, type ComponentType, type SVGProps } from 'react'
import mergeProps from 'merge-props'
import { RippleContainer, useRipple } from '#hooks/ripple'
import { Button as ButtonBase } from '@base-ui/react/button'
import { containerStyle, iconStyle, type ContainerVariants } from './style.css'
import { useLongPress } from '@uidotdev/usehooks'
import { Tooltip } from '../tooltip'

type IconButtonProps = Omit<Extract<ButtonBase.Props, { nativeButton?: true }>, 'children' | 'style'> &
	ContainerVariants & {
		label: string
		icon?: ComponentType<SVGProps<SVGSVGElement>>
	}

/**
 * A customizable icon button component with ripple effect.
 */
export const IconButton: FunctionComponent<IconButtonProps> = ({
	disabled = false,
	icon: Icon,
	shape = 'round',
	size = 'small',
	style = 'filled',
	width = 'default',
	label,
	...props
}) => {
	const ripple = useRipple()
	const triggerId = useId()
	const [tooltipHandle] = useState(() => Tooltip.createHandle())
	const longPressHandlers = useLongPress(() => tooltipHandle.open(triggerId))

	return (
		<Tooltip
			handle={tooltipHandle}
			content={label}
			triggerId={triggerId}
		>
			<ButtonBase
				disabled={disabled}
				focusableWhenDisabled
				{...mergeProps(props, longPressHandlers, {
					className: containerStyle({ shape, size, style, width }),
					onPointerDown: disabled ? undefined : ripple.pressPointer,
					onPointerUp: disabled ? undefined : ripple.releasePointer,
					onPointerLeave: disabled ? undefined : ripple.releasePointer,
					onKeyDown: disabled ? undefined : ripple.pressKeyboard,
					onKeyUp: disabled ? undefined : ripple.releaseKeyboard,
				})}
			>
				<RippleContainer containerRef={ripple.containerRef} />
				{Icon && <Icon className={iconStyle({ size })} />}
			</ButtonBase>
		</Tooltip>
	)
}
