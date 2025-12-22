import { useRef } from 'react'
import * as styles from './style.css'

export const useRipple = () => {
	const containerRef = useRef<HTMLSpanElement>(null)
	const activeRipple = useRef<HTMLSpanElement | null>(null)
	const isKeyHolded = useRef(false)

	const createRipple = (event: React.PointerEvent | React.KeyboardEvent, isKeyboard: boolean) => {
		const container = containerRef.current
		if (!container) return

		const rect = container.getBoundingClientRect()

		let x = rect.width / 2
		let y = rect.height / 2

		if (!isKeyboard && 'clientX' in event) {
			x = event.clientX - rect.left
			y = event.clientY - rect.top
		}

		const radius = Math.max(
			Math.hypot(x, y),
			Math.hypot(rect.width - x, y),
			Math.hypot(x, rect.height - y),
			Math.hypot(rect.width - x, rect.height - y),
		)

		const size = radius * 2

		const ripple = document.createElement('span')
		ripple.className = `${styles.ripple} ${styles.rippleEnter}`
		ripple.style.width = ripple.style.height = `${size}px`
		ripple.style.left = `${x - radius}px`
		ripple.style.top = `${y - radius}px`

		container.appendChild(ripple)

		activeRipple.current = ripple
	}

	const releaseRipple = () => {
		const ripple = activeRipple.current
		if (!ripple) return

		ripple.classList.remove(styles.rippleEnter)
		ripple.classList.add(styles.rippleExit)

		ripple.addEventListener('animationend', () => ripple.remove(), { once: true })

		activeRipple.current = null
	}

	return {
		containerRef,
		pressPointer: (event: React.PointerEvent) => createRipple(event, false),
		releasePointer: releaseRipple,
		pressKeyboard: (event: React.KeyboardEvent) => {
			if ((event.code !== 'Enter' && event.code !== 'Space') || isKeyHolded.current) {
				return
			}

			createRipple(event, true)
			isKeyHolded.current = true
		},
		releaseKeyboard: () => {
			releaseRipple()
			isKeyHolded.current = false
		},
	}
}
