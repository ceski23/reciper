import { assignInlineVars } from '@macaron-css/core/dist/dynamic'
import { createSchemes } from 'generateColors'
import { useMemo } from 'react'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { settingsStore } from 'lib/stores/settings'
import { theme } from 'lib/styles'

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
