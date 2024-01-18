import { nanoid } from 'nanoid'
import * as v from 'valibot'
import { extractJsonLD } from 'features/recipes/providers/generic/jsonld'
import { extractMicrodata } from 'features/recipes/providers/generic/microdata'
import { type Recipe, recipeScheme } from 'features/recipes/types'
import * as providers from './websites'

export type RecipesProvider = {
	name: string
	matcher: RegExp
	icon: string
	scrape: (doc: Document) => Promise<Partial<Recipe>>
}

export class InvalidRecipeError extends Error {}

export const scrapeRecipe = async (url?: string): Promise<Recipe> => {
	if (url === undefined) throw new Error('Invalid url')

	const recipeUrl = new URL(url)
	const targetUrl = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(recipeUrl.toString())
		: recipeUrl.toString()
	const doc = new DOMParser().parseFromString(await fetch(targetUrl).then(res => res.text()), 'text/html')
	const provider = Object.values(providers).find(provider => provider.matcher.test(String(recipeUrl)))
	const recipe = provider
		? await provider.scrape(doc)
		: await Promise.any([
			extractJsonLD(doc),
			extractMicrodata(doc),
		])

	return v.parseAsync(recipeScheme, {
		id: nanoid(),
		url: recipeUrl.toString(),
		addedDate: new Date().getTime(),
		...recipe,
	})
}
