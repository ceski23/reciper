import { useCallback, useEffect, useRef, useState } from 'react'

export const useLongPress = (callback: VoidFunction, threshold = 300) => {
	const [isPressed, setIsPressed] = useState(false)
	const timerId = useRef<number>()

	useEffect(() => {
		if (isPressed) {
			timerId.current = setTimeout(callback, threshold)

			return () => {
				clearTimeout(timerId.current)
				timerId.current = undefined
			}
		}

		clearTimeout(timerId.current)
		timerId.current = undefined
	}, [threshold, callback, isPressed])

	const start = useCallback(() => {
		setIsPressed(true)
	}, [])
	const stop = useCallback(() => {
		setIsPressed(false)
	}, [])

	return {
		onTouchStart: start,
		onTouchEnd: stop,
	}
}
