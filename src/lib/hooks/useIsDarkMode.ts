import { useAtomValue } from 'jotai'
import { settingsAtom } from 'lib/stores/settings'
import { useMediaQuery } from './useMediaQuery'

export const useIsDarkMode = () => {
	const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const isSystemColorScheme = useAtomValue(settingsAtom).theme.colorScheme === undefined
	const isDarkColorScheme = useAtomValue(settingsAtom).theme.colorScheme === 'dark'

	return isSystemColorScheme ? isSystemDarkMode : isDarkColorScheme
}
