import { Layout, Typography } from 'lib/components'
import i18n from 'lib/i18n'
import { RouteObject } from 'react-router-dom'
import { PATHS } from './paths'

export const routes: Array<RouteObject> = [{
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Typography.HeadlineLarge>{i18n.t('paths.home')}</Typography.HeadlineLarge>,
		},
		{
			path: PATHS.RECIPES.path,
			element: <Typography.HeadlineLarge>{i18n.t('paths.recipes')}</Typography.HeadlineLarge>,
		},
		{
			path: PATHS.SETTINGS.path,
			element: <Typography.HeadlineLarge>{i18n.t('paths.settings')}</Typography.HeadlineLarge>,
		},
	],
}]
