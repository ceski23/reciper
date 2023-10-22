import { useAtomValue } from 'jotai'
import { type FunctionComponent } from 'react'
import { Helmet } from 'react-helmet-async'
import { useIsDarkMode } from 'lib/hooks'
import * as schemes from 'lib/styles/theme.json'
import { isMainScrolledAtom } from './Layout'

export const MetaThemeColor: FunctionComponent = () => {
	const isMainScrolled = useAtomValue(isMainScrolledAtom)
	const isDarkMode = useIsDarkMode()
	const colors = isDarkMode ? schemes.dark : schemes.light
	const themeColor = isMainScrolled ? colors.surfaceContainer : colors.surface

	return (
		<Helmet>
			<meta
				name="theme-color"
				content={themeColor}
			/>
		</Helmet>
	)
}
