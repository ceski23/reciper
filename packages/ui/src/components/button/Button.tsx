import { FunctionComponent, type ComponentType, type SVGProps } from 'react'
import { buttonStyle, iconStyle, type ButtonVariants } from './style.css'
import mergeProps from 'merge-props'
import { RippleContainer, useRipple } from '#hooks/ripple'
import { Button as ButtonBase } from '@base-ui/react/button'

type ButtonProps = Extract<ButtonBase.Props, { nativeButton?: true }> &
	ButtonVariants & {
		leftIcon?: ComponentType<SVGProps<SVGSVGElement>>
	}

/**
 * A customizable button component with ripple effect and icon support.
 */
export const Button: FunctionComponent<ButtonProps> = ({
	variant = 'filled',
	size = 'small',
	shape = 'round',
	disabled = false,
	leftIcon: LeftIcon,
	children,
	...props
}) => {
	const ripple = useRipple()

	return (
		<ButtonBase
			disabled={disabled}
			focusableWhenDisabled
			{...mergeProps(props, {
				className: buttonStyle({ variant, size, shape }),
				onPointerDown: disabled ? undefined : ripple.pressPointer,
				onPointerUp: disabled ? undefined : ripple.releasePointer,
				onPointerLeave: disabled ? undefined : ripple.releasePointer,
				onKeyDown: disabled ? undefined : ripple.pressKeyboard,
				onKeyUp: disabled ? undefined : ripple.releaseKeyboard,
			})}
		>
			<RippleContainer containerRef={ripple.containerRef} />
			{LeftIcon && <LeftIcon className={iconStyle({ size })} />}
			{children}
		</ButtonBase>
	)
}
