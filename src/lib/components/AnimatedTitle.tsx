import { animated, useScroll } from '@react-spring/web'
import { type CSSProperties, type FunctionComponent, type ReactNode } from 'react'

type AnimatedTitleProps = {
	container: HTMLElement
	shouldAnimate?: boolean
	children?: ReactNode
	reverse?: boolean
	className?: string
	style?: CSSProperties
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const calcOpacity = (y: number, reverse?: boolean) => {
	if (reverse) {
		return clamp((y - 40) / 20, 0, 1)
	}

	return clamp(1 - ((y - 30) / 20), 0, 1)
}

export const AnimatedTitle: FunctionComponent<AnimatedTitleProps> = ({
	container,
	children,
	className,
	reverse,
	shouldAnimate = true,
	style,
}) => {
	const { scrollY } = useScroll({
		container: { current: container },
		default: {
			immediate: true,
		},
	})

	return (
		<animated.h1
			className={className}
			style={{
				...style,
				opacity: shouldAnimate ? scrollY.to(y => calcOpacity(y, reverse)) : undefined,
			}}
		>
			{children}
		</animated.h1>
	)
}
