import { animated, useScroll } from '@react-spring/web'
import { type CSSProperties, type ReactNode, type Ref } from 'react'

type AnimatedTitleProps = {
	container: HTMLElement
	shouldAnimate?: boolean
	children?: ReactNode
	reverse?: boolean
	className?: string
	style?: CSSProperties
	ref?: Ref<HTMLHeadingElement>
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const calcOpacity = (y: number, reverse?: boolean) => {
	if (reverse) {
		return clamp((y - 40) / 20, 0, 1)
	}

	return clamp(1 - ((y - 30) / 20), 0, 1)
}

const calcY = (y: number, reverse?: boolean) => {
	if (reverse) {
		return clamp(1 - (y - 40) + 20, 0, 20)
	}

	return 0
}

export const AnimatedTitle = ({
	container,
	children,
	className,
	reverse,
	shouldAnimate = true,
	style,
	ref,
}: AnimatedTitleProps) => {
	const { scrollY } = useScroll({
		container: { current: container },
		default: {
			immediate: true,
		},
	})

	return (
		<animated.h1
			ref={ref}
			className={className}
			style={{
				...style,
				opacity: shouldAnimate ? scrollY.to(y => calcOpacity(y, reverse)) : undefined,
				y: shouldAnimate ? scrollY.to(y => calcY(y, reverse)) : undefined,
			}}
		>
			{children}
		</animated.h1>
	)
}
