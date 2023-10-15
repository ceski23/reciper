import { styled } from '@macaron-css/react'
import { Icon, NavigationBar } from 'lib/components'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { PATHS } from 'lib/routing'
import { darkThemeClass, lightThemeClass, theme } from 'lib/styles'
import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout: FunctionComponent = () => {
	const isDarkMode = useIsDarkMode()

	return (
		<LayoutBase className={isDarkMode ? darkThemeClass : lightThemeClass}>
			<header />
			<MainContent>
				<Outlet />
			</MainContent>
			<NavigationBar
				segments={[
					{ icon: Icon.Home, to: PATHS.HOME.buildPath({}), label: 'Home', badge: '3' },
					{ icon: Icon.Home, to: PATHS.RECIPES.buildPath({}), label: 'Recipes' },
					{ icon: Icon.Home, to: PATHS.SETTINGS.buildPath({}), label: 'Settings' },
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
