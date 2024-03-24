import { settingsStore } from 'lib/stores/settings'
import { useMediaQuery } from './useMediaQuery'

export const useIsDarkMode = () => {
	const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const { state: { theme } } = settingsStore.useStore('theme')
	const isSystemColorScheme = theme.colorScheme === undefined
	const isDarkColorScheme = theme.colorScheme === 'dark'

	return isSystemColorScheme ? isSystemDarkMode : isDarkColorScheme
}
