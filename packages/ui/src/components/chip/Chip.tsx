import { FunctionComponent, type ComponentType, type SVGProps } from 'react'
import { chipStyle, iconStyle, labelStyle } from './style.css'
import mergeProps from 'merge-props'
import { RippleContainer, useRipple } from '#hooks/ripple'
import { Button } from '@base-ui/react/button'

type ChipProps = Extract<Button.Props, { nativeButton?: true }> & {
	variant?: 'outlined' | 'elevated'
	label: string
	leadingIcon?: ComponentType<SVGProps<SVGSVGElement>>
	trailingIcon?: ComponentType<SVGProps<SVGSVGElement>>
	pressed?: boolean
}

export const Chip: FunctionComponent<ChipProps> = ({
	variant,
	label,
	leadingIcon: LeadingIcon,
	trailingIcon: TrailingIcon,
	disabled = false,
	pressed = false,
	...props
}) => {
	const ripple = useRipple()

	return (
		<Button
			disabled={disabled}
			{...mergeProps(props, {
				className: chipStyle({
					variant,
					pressed,
					withLeadingIcon: !!LeadingIcon,
					withTrailingIcon: !!TrailingIcon,
				}),
				onPointerDown: disabled ? undefined : ripple.pressPointer,
				onPointerUp: disabled ? undefined : ripple.releasePointer,
				onPointerLeave: disabled ? undefined : ripple.releasePointer,
				onKeyDown: disabled ? undefined : ripple.pressKeyboard,
				onKeyUp: disabled ? undefined : ripple.releaseKeyboard,
			})}
		>
			<RippleContainer containerRef={ripple.containerRef} />
			{LeadingIcon && <LeadingIcon className={iconStyle({ leading: true, pressed })} />}
			<span className={labelStyle}>{label}</span>
			{TrailingIcon && <TrailingIcon className={iconStyle({ pressed })} />}
		</Button>
	)
}
