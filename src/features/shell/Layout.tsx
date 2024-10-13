import { createTheme, createVar } from '@macaron-css/core'
import { setElementVars } from '@macaron-css/core/dist/dynamic'
import { styled } from '@macaron-css/react'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { type FunctionComponent, lazy, Suspense, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NotificationsViewport } from 'features/notifications'
import { NavigationBar } from 'lib/components/navigation/NavigationBar'
import { Snackbar } from 'lib/components/Snackbar'
import { useAutoSyncRecipes } from 'lib/hooks/useAutoSyncRecipes'
import { useDisableAnimations } from 'lib/hooks/useDisableAnimations'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { useResizeObserver } from 'lib/hooks/useResizeObserver'
import { useScreenNavigationAnimations } from 'lib/hooks/useScreenNavigationAnimations'
import { uiStore } from 'lib/stores/ui'
import { theme } from 'lib/styles'
import * as schemes from 'lib/styles/theme.json'
import { AppUpdatePrompt } from './AppUpdatePrompt'

const TanStackRouterDevtools = import.meta.env.PROD
	? () => null
	: lazy(() => import('@tanstack/router-devtools').then(res => ({ default: res.TanStackRouterDevtools })))

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
	useAutoSyncRecipes()

	const isDarkMode = useIsDarkMode()
	const { t } = useTranslation()
	const navbarRef = useResizeObserver<HTMLDivElement>(({ height }) => {
		setElementVars(document.documentElement, {
			[navigationMenuHeight]: `${height ?? 0}px`,
		})
	})
	const headerRef = useResizeObserver<HTMLElement>(({ height }) => {
		setElementVars(document.documentElement, {
			[headerHeight]: `${height ?? 0}px`,
		})
	})

	useLayoutEffect(() => {
		document.documentElement.classList.toggle(lightThemeClass, !isDarkMode)
		document.documentElement.classList.toggle(darkThemeClass, isDarkMode)
	}, [isDarkMode])

	return (
		<LayoutBase>
			<MainContent ref={uiStore.actions.setMainContent}>
				<Outlet />
			</MainContent>
			<ContentOverlayContainer>
				<NotificationsViewport notificationComponent={Snackbar} />
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
					{ icon: 'home', to: '/', label: t('paths.home') },
					{ icon: 'recipes', to: '/recipes', label: t('paths.recipes') },
					{ icon: 'settings', to: '/settings', label: t('paths.settings') },
				]}
			/>
			<AppUpdatePrompt />
			<Suspense>
				<TanStackRouterDevtools />
			</Suspense>
			<ScrollRestoration />
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
