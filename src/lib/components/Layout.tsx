import { createTheme, createVar } from '@macaron-css/core'
import { setElementVars } from '@macaron-css/core/dist/dynamic'
import { styled } from '@macaron-css/react'
import { type FunctionComponent, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { useDisableAnimations } from 'lib/hooks/useDisableAnimations'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { useMeasureHeight } from 'lib/hooks/useMeasureHeight'
import { useScreenNavigationAnimations } from 'lib/hooks/useScreenNavigationAnimations'
import { PATHS } from 'lib/routing/paths'
import { uiStore } from 'lib/stores/ui'
import { theme } from 'lib/styles'
import * as schemes from 'lib/styles/theme.json'
import { AppUpdatePrompt } from './AppUpdatePrompt'
import { NavigationBar } from './navigation/NavigationBar'
import { SnackbarContainer } from './SnackbarContainer'

export const lightThemeClass = createTheme(theme, {
	colors: schemes.light,
})

export const darkThemeClass = createTheme(theme, {
	colors: schemes.dark,
})

export const navigationMenuHeight = createVar('navigation-menu-height')
export const headerHeight = createVar('header-height')

export const Layout: FunctionComponent = () => {
	useScreenNavigationAnimations()
	useDisableAnimations()

	const isDarkMode = useIsDarkMode()
	const { t } = useTranslation()
	const navbarRef = useMeasureHeight<HTMLDivElement>(height => {
		setElementVars(document.body, {
			[navigationMenuHeight]: `${height ?? 0}px`,
		})
	})
	const headerRef = useMeasureHeight<HTMLElement>(height => {
		setElementVars(document.body, {
			[headerHeight]: `${height ?? 0}px`,
		})
	})

	useLayoutEffect(() => {
		document.body.classList.toggle(lightThemeClass, !isDarkMode)
		document.body.classList.toggle(darkThemeClass, isDarkMode)
	}, [isDarkMode])

	return (
		<LayoutBase>
			<MainContent ref={uiStore.actions.setMainContent}>
				<Outlet />
			</MainContent>
			<ContentOverlayContainer>
				<SnackbarContainer />
				<div ref={uiStore.actions.setOverlayContainer} />
			</ContentOverlayContainer>
			<Header
				ref={node => {
					uiStore.actions.setHeader(node)
					headerRef.current = node
				}}
			/>
			<NavigationBar
				ref={navbarRef}
				segments={[
					{ icon: 'home', to: PATHS.HOME.buildPath({}), label: t('paths.home') },
					{ icon: 'recipes', to: PATHS.RECIPES.buildPath({}), label: t('paths.recipes') },
					{ icon: 'settings', to: PATHS.SETTINGS.buildPath({}), label: t('paths.settings') },
				]}
			/>
			<AppUpdatePrompt />
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
		height: '100dvh',
		width: '100vw',
		backgroundColor: theme.colors.background,
	},
})

const MainContent = styled('main', {
	base: {
		flex: 1,
		width: '100%',
		overflow: 'auto',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		paddingTop: headerHeight,
		paddingBottom: navigationMenuHeight,
		scrollPaddingTop: `calc(${headerHeight} + 16px)`,
		scrollPaddingBottom: `calc(${navigationMenuHeight} + 16px)`,
	},
})

const Header = styled('header', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'fixed',
		top: 0,
	},
})

const ContentOverlayContainer = styled('div', {
	base: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		pointerEvents: 'none',
		bottom: navigationMenuHeight,
	},
})
