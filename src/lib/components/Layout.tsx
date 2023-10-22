import { createTheme, createVar } from '@macaron-css/core'
import { setElementVars } from '@macaron-css/core/dist/dynamic'
import { styled } from '@macaron-css/react'
import { atom, useSetAtom } from 'jotai'
import { type FunctionComponent, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useIsDarkMode } from 'lib/hooks/useIsDarkMode'
import { useMeasureHeight } from 'lib/hooks/useMeasureHeight'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import * as schemes from 'lib/styles/theme.json'
import { headerRefAtom } from './HeaderPortal'
import { MetaThemeColor } from './MetaThemeColor'
import { NavigationBar } from './navigation/NavigationBar'

export const lightThemeClass = createTheme(theme, {
	colors: schemes.light,
})

export const darkThemeClass = createTheme(theme, {
	colors: schemes.dark,
})

export const isMainScrolledAtom = atom(false)
export const navigationMenuHeight = createVar('navigation-menu-height')

export const Layout: FunctionComponent = () => {
	const isDarkMode = useIsDarkMode()
	const { t } = useTranslation()
	const setHeaderRef = useSetAtom(headerRefAtom)
	const setIsMainScrolled = useSetAtom(isMainScrolledAtom)
	const renderProbe = useIsContainerScrolled(setIsMainScrolled)
	const navbarRef = useMeasureHeight<HTMLDivElement>(height => {
		setElementVars(document.body, {
			[navigationMenuHeight]: `${height ?? 0}px`,
		})
	})

	useLayoutEffect(() => {
		document.body.classList.toggle(lightThemeClass, !isDarkMode)
		document.body.classList.toggle(darkThemeClass, isDarkMode)
	}, [isDarkMode])

	return (
		<LayoutBase>
			<MetaThemeColor />
			<Header ref={setHeaderRef} />
			<MainContent>
				{renderProbe}
				<Outlet />
			</MainContent>
			<NavigationBar
				ref={navbarRef}
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
	},
})

const Header = styled('header', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
})
