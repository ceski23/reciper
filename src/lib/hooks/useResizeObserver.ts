import { useLayoutEffect, useRef, useState } from 'react'

export const useResizeObserver = <TElement extends Element>(callback: (contentRect: DOMRectReadOnly) => void) => {
	const ref = useRef<TElement | null>(null)
	// eslint-disable-next-line react/hook-use-state
	const [resizeObserver] = useState(() => new ResizeObserver(([entry]) => callback(entry.contentRect)))

	useLayoutEffect(() => {
		if (ref.current) {
			resizeObserver.observe(ref.current)

			return () => resizeObserver.disconnect()
		}
	}, [resizeObserver])

	return ref
}
