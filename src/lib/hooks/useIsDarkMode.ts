import { mq } from '@styles/utils'
import { useMediaQuery } from '@uidotdev/usehooks'
import { settingsStore } from 'lib/stores/settings'

export const useIsDarkMode = () => {
	const isSystemDarkMode = useMediaQuery(mq.darkMode)
	const { theme } = settingsStore.useStore()
	const isSystemColorScheme = theme.colorScheme === undefined
	const isDarkColorScheme = theme.colorScheme === 'dark'

	return isSystemColorScheme ? isSystemDarkMode : isDarkColorScheme
}
