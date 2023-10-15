import { styled } from '@macaron-css/react'
import { NavigationBar } from 'lib/components'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { PATHS } from 'lib/routing'
import { darkThemeClass, lightThemeClass, theme } from 'lib/styles'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

export const Layout: FunctionComponent = () => {
	const isDarkMode = useIsDarkMode()
	const { t } = useTranslation()

	return (
		<LayoutBase className={isDarkMode ? darkThemeClass : lightThemeClass}>
			<header />
			<MainContent>
				<Outlet />
			</MainContent>
			<NavigationBar
				segments={[
					{ icon: 'home', to: PATHS.HOME.buildPath({}), label: t('paths.home') },
					{ icon: 'recipes', to: PATHS.RECIPES.buildPath({}), label: t('paths.recipes') },
					{ icon: 'settings', to: PATHS.SETTINGS.buildPath({}), label: t('paths.settings') },
				]}
			/>
		</LayoutBase>
	)
}

const LayoutBase = styled('div', {
	base: {
		margin: 0,
		display: 'flex',
		placeItems: 'center',
		flexDirection: 'column',
		minWidth: '320px',
		minHeight: '100vh',
		width: '100vw',
		backgroundColor: theme.colors.background,
	},
})

const MainContent = styled('main', {
	base: {
		flex: 1,
	},
})
