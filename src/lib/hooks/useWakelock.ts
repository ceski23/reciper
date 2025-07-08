import { useCallback, useEffect, useRef } from 'react'

export const useWakelock = () => {
	const wakeLock = useRef<WakeLockSentinel | null>(null)
	const isSupported = typeof window !== 'undefined' && 'wakeLock' in navigator

	const request = useCallback(async () => {
		try {
			wakeLock.current = await navigator.wakeLock.request('screen')
		} catch (error) {}
	}, [])

	const release = useCallback(async () => {
		try {
			await wakeLock.current?.release()
			wakeLock.current = null
		} catch (error) {}
	}, [])

	useEffect(() => {
		if (!isSupported) return

		request()

		return () => {
			release()
		}
	}, [isSupported, release, request])
}
