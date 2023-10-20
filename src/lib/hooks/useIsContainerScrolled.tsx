import { useCallback, useState } from 'react'

export const useIsContainerScrolled = (callback: (isScrolled: boolean) => void) => {
	// eslint-disable-next-line react/hook-use-state
	const [intersectionObserver] = useState(() => new IntersectionObserver(([entry]) => callback(entry.isIntersecting === false)))

	const probeRef = useCallback((node: HTMLSpanElement | null) => {
		if (node) {
			return intersectionObserver.observe(node)
		}

		intersectionObserver.disconnect()
	}, [intersectionObserver])

	return <span ref={probeRef} />
}