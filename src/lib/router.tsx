import { createRootRoute, createRoute, createRouter, Navigate } from '@tanstack/react-router'
import * as v from 'valibot'
import { Google } from 'features/auth/providers'
import { Home } from 'features/home/Home'
import { NewRecipe } from 'features/recipes/NewRecipe'
import { Recipe } from 'features/recipes/Recipe'
import { Recipes } from 'features/recipes/Recipes'
import { ScrapeRecipe } from 'features/recipes/ScrapeRecipe'
import { Search, searchParamsSchema } from 'features/search/Search'
import { Account } from 'features/settings/Account'
import { Settings } from 'features/settings/Settings'
import { Theme } from 'features/settings/Theme'
import { Units } from 'features/settings/Units'
import { Layout } from 'lib/components/Layout'

const rootRoute = createRootRoute({
	component: Layout,
	notFoundComponent: () => (
		<Navigate
			to="/"
			replace
		/>
	),
})

const overviewRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: Home,
})

const recipesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'recipes',
})

const recipesIndexRoute = createRoute({
	getParentRoute: () => recipesRoute,
	path: '/',
	component: Recipes,
})

const newRecipeRoute = createRoute({
	getParentRoute: () => recipesRoute,
	path: 'new',
	component: NewRecipe,
})

export const scrapeRecipeRoute = createRoute({
	getParentRoute: () => recipesRoute,
	path: 'scrape',
	component: ScrapeRecipe,
	validateSearch: search =>
		v.parse(
			v.object({
				url: v.optional(v.string([v.url()])),
			}),
			search,
		),
})

export const searchRecipeRoute = createRoute({
	getParentRoute: () => recipesRoute,
	path: 'search',
	component: Search,
	validateSearch: search => v.parse(searchParamsSchema, search),
})

export const recipeRoute = createRoute({
	getParentRoute: () => recipesRoute,
	path: '$id',
	component: Recipe,
})

const settingsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'settings',
})

const settingsIndexRoute = createRoute({
	getParentRoute: () => settingsRoute,
	path: '/',
	component: Settings,
})

const settingsAccountRoute = createRoute({
	getParentRoute: () => settingsRoute,
	path: 'account',
	component: Account,
})

const settingsUnitsRoute = createRoute({
	getParentRoute: () => settingsRoute,
	path: 'units',
	component: Units,
})

const settingsThemeRoute = createRoute({
	getParentRoute: () => settingsRoute,
	path: 'theme',
	component: Theme,
})

const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'auth',
})

export const googleAuthRoute = createRoute({
	getParentRoute: () => authRoute,
	path: 'google',
	component: Google,
	validateSearch: search =>
		v.parse(
			v.object({
				state: v.optional(v.string()),
				scope: v.string(),
				error: v.optional(v.string()),
			}),
			search,
		),
})

const routeTree = rootRoute.addChildren([
	overviewRoute,
	recipesRoute.addChildren([
		recipesIndexRoute,
		newRecipeRoute,
		scrapeRecipeRoute,
		recipeRoute,
		searchRecipeRoute,
	]),
	settingsRoute.addChildren([
		settingsIndexRoute,
		settingsAccountRoute,
		settingsUnitsRoute,
		settingsThemeRoute,
	]),
	authRoute.addChildren([
		googleAuthRoute,
	]),
])

export const router = createRouter({
	routeTree,
	defaultViewTransition: true,
})

declare module '@tanstack/react-router' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		router: typeof router
	}
}
