import { useLayoutEffect, useRef, useState } from 'react'

export const useMeasureHeight = <TElement extends Element>(callback: (height?: number) => void) => {
	const ref = useRef<TElement>(null)
	// eslint-disable-next-line react/hook-use-state
	const [resizeObserver] = useState(() => new ResizeObserver(([entry]) => callback(entry.contentRect.height)))

	useLayoutEffect(() => {
		if (ref.current) {
			resizeObserver.observe(ref.current)

			return () => resizeObserver.disconnect()
		}
	}, [resizeObserver])

	return ref
}
