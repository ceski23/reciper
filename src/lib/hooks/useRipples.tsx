import { useTransition } from '@react-spring/web'
import { type KeyboardEvent, type PointerEventHandler, useRef, useState } from 'react'
import { Ripple, RipplesContainer } from 'lib/components/Ripple'

type RippleData<TElement> = {
	element: TElement
	top: number
	left: number
	width: number
	height: number
}

export const useRipples = <TElement extends HTMLElement>(color = 'currentColor') => {
	const isKeyHolded = useRef(false)
	const [ripples, setRipples] = useState<Array<RippleData<TElement>>>([])
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
	const addRipple = (element: TElement, clickedX: number, clickedY: number) => {
		const rect = element.getBoundingClientRect()
		const x = clickedX - rect.left > rect.width / 2 ? 0 : rect.width
		const y = clickedY - rect.top > rect.height / 2 ? 0 : rect.height
		const radius = Math.hypot(x - (clickedX - rect.left), y - (clickedY - rect.top))

		setRipples(oldRipples =>
			oldRipples.concat({
				element,
				top: clickedY - rect.top - radius,
				left: clickedX - rect.left - radius,
				width: 2 * radius,
				height: 2 * radius,
			})
		)
	}
	const removeAllRipples = () => {
		if (ripples.length > 0) {
			setRipples([])
		}
	}
	const removeRipple = (element: TElement) => setRipples(r => r.filter(ripple => ripple.element !== element))

	const handleAddRipple: PointerEventHandler<TElement> = event => addRipple(event.currentTarget, event.clientX, event.clientY)
	const handleRemoveRipple: PointerEventHandler<TElement> = event => removeRipple(event.currentTarget)

	return {
		eventHandlers: {
			onPointerDown: handleAddRipple,
			onPointerUp: handleRemoveRipple,
			onMouseLeave: removeAllRipples,
			onTouchEnd: removeAllRipples,
			onKeyDown: (event: KeyboardEvent<TElement>) => {
				if ((event.code !== 'Enter' && event.code !== 'Space') || isKeyHolded.current) {
					return
				}

				const rect = event.currentTarget.getBoundingClientRect()

				addRipple(event.currentTarget, rect.x + (rect.width / 2), rect.y + (rect.height / 2))
				isKeyHolded.current = true
			},
			onKeyUp: () => {
				removeAllRipples()
				isKeyHolded.current = false
			},
		},
		renderRipples,
	}
}
