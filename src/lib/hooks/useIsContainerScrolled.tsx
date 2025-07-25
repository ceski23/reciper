import { useCallback, useState } from 'react'

export const useIsContainerScrolled = (callback: (isScrolled: boolean) => void) => {
	// eslint-disable-next-line react/hook-use-state
	const [intersectionObserver] = useState(() => new IntersectionObserver(([entry]) => callback(entry.isIntersecting === false)))

	const probeRef = useCallback((node: HTMLSpanElement | null) => {
		if (node) {
			intersectionObserver.observe(node)

			return () => intersectionObserver.disconnect()
		}
	}, [intersectionObserver])

	return (
		<span
			ref={probeRef}
			style={{ display: 'block', height: 1, gridColumn: '1 / -1' }}
		/>
	)
}
