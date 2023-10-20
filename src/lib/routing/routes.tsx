import type { RouteObject } from 'react-router-dom'
import { Home } from 'features/home/Home'
import { Recipes } from 'features/recipes/Recipes'
import { Settings } from 'features/settings/Settings'
import { Layout } from 'lib/components/Layout'
import { PATHS } from './paths'

export const routes: Array<RouteObject> = [{
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
		},
		{
			path: PATHS.RECIPES.path,
			element: <Recipes />,
		},
		{
			path: PATHS.SETTINGS.path,
			element: <Settings />,
		},
	],
}]
