import { useCallback, useState } from 'react'

export const useResizeObserver = <TElement extends Element>(callback: (contentRect: DOMRectReadOnly | undefined) => void) => {
	// eslint-disable-next-line react/hook-use-state
	const [resizeObserver] = useState(() => new ResizeObserver(([entry]) => callback(entry.contentRect)))

	const callbackRef = useCallback((node: TElement | null) => {
		callback(node?.getBoundingClientRect())
		resizeObserver.disconnect()

		if (node) {
			resizeObserver.observe(node)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resizeObserver])

	return callbackRef
}
