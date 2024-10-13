import { assignInlineVars } from '@macaron-css/core/dist/dynamic'
import { settingsStore } from '@stores/settings'
import { createSchemes } from 'generateColors'
import { useMemo } from 'react'
import { theme } from 'lib/styles'
import { useIsDarkMode } from './useIsDarkMode'

export const useDynamicTheme = (color?: string) => {
	const isDarkMode = useIsDarkMode()
	const { theme: { dynamicColor } } = settingsStore.useStore()
	const schemes = useMemo(() => (color && dynamicColor) ? createSchemes(color) : undefined, [color, dynamicColor])

	return schemes
		? assignInlineVars(theme, {
			// @ts-expect-error not precise TS types
			colors: isDarkMode ? schemes.dark : schemes.light,
		})
		: undefined
}
