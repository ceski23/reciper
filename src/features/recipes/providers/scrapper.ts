import { nanoid } from 'nanoid'
import { extractJsonLD } from 'features/recipes/providers/generic/jsonld'
import { extractMicrodata } from 'features/recipes/providers/generic/microdata'
import { kwestiasmaku } from 'features/recipes/providers/kwestiasmaku'
import { type Recipe, recipeScheme } from 'features/recipes/types'

export type RecipesProvider = {
	name: string
	matcher: RegExp
	icon: string
	scrape: (doc: Document) => Promise<Partial<Recipe>>
}

export class InvalidRecipeError extends Error {}

export const PROVIDERS = [
	kwestiasmaku,
]

export const scrapeRecipe = async (url?: string): Promise<Recipe> => {
	if (url === undefined) throw new Error('Invalid url')

	const recipeUrl = new URL(url)
	const targetUrl = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(recipeUrl.toString())
		: recipeUrl.toString()
	const doc = new DOMParser().parseFromString(await fetch(targetUrl).then(res => res.text()), 'text/html')
	const provider = PROVIDERS.find(provider => provider.matcher.test(String(recipeUrl)))
	const recipe = provider
		? await provider.scrape(doc)
		: await Promise.any([
			extractJsonLD(doc),
			extractMicrodata(doc),
		])

	return recipeScheme.parseAsync({
		id: nanoid(),
		url: recipeUrl.toString(),
		addedDate: new Date().getTime(),
		...recipe,
	})
}
