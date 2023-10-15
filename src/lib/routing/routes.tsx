import { Layout } from 'lib/components'
import { RouteObject } from 'react-router-dom'
import { PATHS } from './paths'

export const routes: Array<RouteObject> = [{
	element: <Layout />,
	children: [
		{
			index: true,
			element: <p>Home</p>,
		},
		{
			path: PATHS.RECIPES.path,
			element: <p>Recipes</p>,
		},
		{
			path: PATHS.SETTINGS.path,
			element: <p>Settings</p>,
		},
	],
}]
