import { type FunctionComponent } from 'react'
import { Helmet } from 'react-helmet-async'
import { useIsDarkMode } from 'lib/hooks'
import * as schemes from 'lib/styles/theme.json'

type MetaThemeColorProps = {
	isScrolled: boolean
}

export const MetaThemeColor: FunctionComponent<MetaThemeColorProps> = ({ isScrolled }) => {
	const isDarkMode = useIsDarkMode()
	const colors = isDarkMode ? schemes.dark : schemes.light
	const themeColor = isScrolled ? colors.surfaceContainer : colors.surface

	return (
		<Helmet>
			<meta
				name="theme-color"
				content={themeColor}
			/>
		</Helmet>
	)
}
