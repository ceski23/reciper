import { useTransition } from '@react-spring/web'
import { type PointerEventHandler, useState } from 'react'
import { Ripple, RipplesContainer } from 'lib/components/Ripple'

type Ripple = {
	element: HTMLElement
	top: number
	left: number
	width: number
	height: number
}

export const useRipples = (color: string = 'currentColor') => {
	const [ripples, setRipples] = useState<Array<Ripple>>([])
	const transitions = useTransition(ripples, {
		from: { opacity: .12, scale: 0 },
		enter: { opacity: .12, scale: 1 },
		leave: { opacity: 0, scale: 1 },
	})
	const renderRipples = (
		<RipplesContainer>
			{transitions((style, { height, left, top, width }) => (
				<Ripple
					style={{
						...style,
						height,
						left,
						top,
						width,
						backgroundColor: color,
					}}
				/>
			))}
		</RipplesContainer>
	)
	const handleAddRipple: PointerEventHandler<HTMLSpanElement> = event => {
		const clickedElement = event.currentTarget
		const rect = clickedElement.getBoundingClientRect()
		const x = event.clientX - rect.left > rect.width / 2 ? 0 : rect.width
		const y = event.clientY - rect.top > rect.height / 2 ? 0 : rect.height
		const radius = Math.hypot(x - (event.clientX - rect.left), y - (event.clientY - rect.top))

		setRipples(oldRipples =>
			oldRipples.concat({
				element: clickedElement,
				top: event.clientY - rect.top - radius,
				left: event.clientX - rect.left - radius,
				width: 2 * radius,
				height: 2 * radius,
			})
		)
	}
	const handleRemoveRipple: PointerEventHandler<HTMLSpanElement> = event => {
		const clickedElement = event.currentTarget

		return setRipples(r => r.filter(ripple => ripple.element !== clickedElement))
	}

	const handleRemoveAllRipples = () => {
		if (ripples.length > 0) {
			setRipples([])
		}
	}

	return {
		eventHandlers: {
			onPointerDown: handleAddRipple,
			onPointerUp: handleRemoveRipple,
			onMouseLeave: handleRemoveAllRipples,
		},
		renderRipples,
	}
}
