import { assignInlineVars } from '@macaron-css/core/dist/dynamic'
import { createSchemes } from 'generateColors'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { settingsAtom } from 'lib/stores/settings'
import { theme } from 'lib/styles'

export const useDynamicTheme = (color?: string) => {
	const isDarkMode = useIsDarkMode()
	const isDynamicThemeEnabled = useAtomValue(settingsAtom).theme.dynamicColor
	const schemes = useMemo(() => (color && isDynamicThemeEnabled) ? createSchemes(color) : undefined, [color, isDynamicThemeEnabled])

	return schemes
		? assignInlineVars(theme, {
			// @ts-expect-error not precise TS types
			colors: isDarkMode ? schemes.dark : schemes.light,
		})
		: undefined
}
