import type { RouteObject } from 'react-router-dom'
import { Layout } from 'lib/components/Layout'
import { Typography } from 'lib/components/Typography'
import i18n from 'lib/i18n'
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
