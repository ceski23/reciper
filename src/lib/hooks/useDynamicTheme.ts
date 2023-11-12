import { assignInlineVars } from '@macaron-css/core/dist/dynamic'
import { createSchemes } from 'generateColors'
import { useMemo } from 'react'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { theme } from 'lib/styles'

export const useDynamicTheme = (color: string) => {
	const isDarkMode = useIsDarkMode()
	const schemes = useMemo(() => createSchemes(color), [color])

	return assignInlineVars(theme, {
		// @ts-expect-error not precise TS types
		colors: isDarkMode ? schemes.dark : schemes.light,
	})
}
