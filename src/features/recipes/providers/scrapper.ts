import { nanoid } from 'nanoid'
import { extractJsonLD } from 'features/recipes/providers/generic/jsonld'
import { extractMicrodata } from 'features/recipes/providers/generic/microdata'
import { type Recipe, recipeScheme } from 'features/recipes/types'

export class InvalidRecipeError extends Error {}

export const scrapeRecipe = async (url?: string): Promise<Recipe> => {
	if (url === undefined) throw new Error('Invalid url')

	const recipeUrl = new URL(url)
	const targetUrl = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(recipeUrl.toString())
		: recipeUrl.toString()
	const doc = new DOMParser().parseFromString(await fetch(targetUrl).then(res => res.text()), 'text/html')
	const recipe = await Promise.any([
		extractJsonLD(doc),
		extractMicrodata(doc),
	])

	return recipeScheme.parse({
		id: nanoid(),
		url: recipeUrl.toString(),
		...recipe,
	})
}
