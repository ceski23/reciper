import { NavigationRail, type NavigationRailSegmentProps } from '@components/navigation/NavigationRail'
import { useIsMobile } from '@hooks/useIsMobile'
import { createTheme, createVar, fallbackVar } from '@macaron-css/core'
import { setElementVars } from '@macaron-css/core/dynamic'
import { styled } from '@macaron-css/react'
import { mq } from '@styles/utils'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { type FunctionComponent, lazy, Suspense, useCallback, useLayoutEffect } from 'react'
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

const ReactQueryDevtools = import.meta.env.PROD
	? () => null
	: lazy(() => import('@tanstack/react-query-devtools').then(res => ({ default: res.ReactQueryDevtools })))

const lightThemeClass = createTheme(theme, {
	colors: schemes.light,
})

const darkThemeClass = createTheme(theme, {
	colors: schemes.dark,
})

const navigationMenuHeight = createVar('navigation-menu-height')
const headerHeight = createVar('header-height')

export const Layout: FunctionComponent = () => {
	useScreenNavigationAnimations()
	useDisableAnimations()
	useAutoSyncRecipes()

	const isDarkMode = useIsDarkMode()
	const isMobile = useIsMobile()
	const { t } = useTranslation()
	const navbarRef = useResizeObserver<HTMLDivElement>(size => {
		setElementVars(document.documentElement, {
			[navigationMenuHeight]: `${size?.height ?? 0}px`,
		})
	})
	const headerRef = useResizeObserver<HTMLElement>(size => {
		setElementVars(document.documentElement, {
			[headerHeight]: `${size?.height ?? 0}px`,
		})
	})
	const navigationDestinations: Array<NavigationRailSegmentProps> = [
		{ icon: 'home', to: '/', label: t('paths.home') },
		{ icon: 'search', to: '/search', label: t('paths.search') },
		{ icon: 'recipes', to: '/recipes', label: t('paths.recipes') },
		{ icon: 'settings', to: '/settings', label: t('paths.settings') },
	]

	const headerCallbackRef = useCallback((node: HTMLElement | null) => {
		uiStore.actions.setHeader(node)
		headerRef(node)
	}, [headerRef])

	useLayoutEffect(() => {
		document.documentElement.classList.toggle(lightThemeClass, !isDarkMode)
		document.documentElement.classList.toggle(darkThemeClass, isDarkMode)
	}, [isDarkMode])

	return (
		<LayoutBase>
			{!isMobile && (
				<NonMobileNavigation segmentsAlignment="middle">
					{navigationDestinations.map(({ icon, to, badge, label }) => (
						<NavigationRail.Segment
							key={label}
							icon={icon}
							to={to}
							badge={badge}
							label={label}
						/>
					))}
				</NonMobileNavigation>
			)}
			<NonMobileLayoutWrapper>
				<MainContent ref={uiStore.actions.setMainContent}>
					<Outlet />
				</MainContent>
				<Header ref={headerCallbackRef} />
			</NonMobileLayoutWrapper>
			<ContentOverlayContainer>
				<NotificationsViewport notificationComponent={Snackbar} />
				<div ref={uiStore.actions.setOverlayContainer} />
			</ContentOverlayContainer>
			{isMobile && (
				<NavigationBar
					ref={navbarRef}
					segments={navigationDestinations}
				/>
			)}
			<AppUpdatePrompt />
			<Suspense>
				<TanStackRouterDevtools />
				<ReactQueryDevtools />
			</Suspense>
			<ScrollRestoration />
		</LayoutBase>
	)
}

const NonMobileNavigation = styled(NavigationRail.Root, {
	base: {
		height: '100%',
	},
})

const NonMobileLayoutWrapper = styled('div', {
	base: {
		display: 'contents',
		'@media': {
			[mq.atLeast('md')]: {
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
				height: '100%',
			},
		},
	},
})

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
		'@media': {
			[mq.atLeast('md')]: {
				flexDirection: 'row',
			},
		},
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
		'@media': {
			[mq.atLeast('md')]: {
				paddingTop: 0,
				paddingBottom: 0,
				paddingInline: 16,
			},
		},
	},
})

const Header = styled('header', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'fixed',
		top: 0,
		'@media': {
			[mq.atLeast('md')]: {
				position: 'relative',
				order: -1,
				marginBottom: -1,
			},
		},
	},
})

const ContentOverlayContainer = styled('div', {
	base: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		pointerEvents: 'none',
		bottom: `max(${fallbackVar(navigationMenuHeight, '0px')}, env(keyboard-inset-height, 0))`,
		transition: 'bottom .2s',
	},
})
