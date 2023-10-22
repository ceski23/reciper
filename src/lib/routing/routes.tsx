import type { RouteObject } from 'react-router-dom'
import { Home } from 'features/home/Home'
import { Recipes } from 'features/recipes/Recipes'
import { Account } from 'features/settings/Account'
import { Settings } from 'features/settings/Settings'
import { Theme } from 'features/settings/Theme'
import { Units } from 'features/settings/Units'
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
			children: [
				{
					index: true,
					element: <Settings />,
				},
				{
					path: PATHS.SETTINGS.THEME.path,
					element: <Theme />,
				},
				{
					path: PATHS.SETTINGS.ACCOUNT.path,
					element: <Account />,
				},
				{
					path: PATHS.SETTINGS.UNITS.path,
					element: <Units />,
				},
			],
		},
	],
}]
