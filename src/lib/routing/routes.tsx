import type { RouteObject } from 'react-router-dom'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { Layout } from 'lib/components/Layout'
import { TopAppBar } from 'lib/components/TopAppBar'
import i18n from 'lib/i18n'
import { PATHS } from './paths'

export const routes: Array<RouteObject> = [{
	element: <Layout />,
	children: [
		{
			index: true,
			element: (
				<HeaderPortal>
					<TopAppBar title={i18n.t('paths.home')} />
				</HeaderPortal>
			),
		},
		{
			path: PATHS.RECIPES.path,
			element: (
				<HeaderPortal>
					<TopAppBar title={i18n.t('paths.recipes')} />
				</HeaderPortal>
			),
		},
		{
			path: PATHS.SETTINGS.path,
			element: (
				<HeaderPortal>
					<TopAppBar title={i18n.t('paths.settings')} />
				</HeaderPortal>
			),
		},
	],
}]
