import { useCallback, useSyncExternalStore } from 'react'

export const useMediaQuery = (query: string) => {
	const subscribe = useCallback((callback: VoidFunction) => {
		window.matchMedia(query).addEventListener('change', callback)

		return () => {
			window.matchMedia(query).removeEventListener('change', callback)
		}
	}, [query])

	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(query).matches,
		() => true,
	)
}
