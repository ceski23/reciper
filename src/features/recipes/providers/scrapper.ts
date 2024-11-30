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

const createRecipe = (url: URL, recipe: Record<string, unknown> | undefined, id?: string) => ({
	id: id ?? nanoid(),
	url: url.toString(),
	addedDate: new Date().getTime(),
	...recipe,
})

export const scrapeRecipe = async (url?: string, id?: string): Promise<Recipe> => {
	if (url === undefined) throw new Error('Invalid url')

	const recipeUrl = new URL(url)
	const targetUrl = import.meta.env.VITE_CORS_PROXY !== undefined
		? import.meta.env.VITE_CORS_PROXY + encodeURIComponent(recipeUrl.toString())
		: recipeUrl.toString()
	const doc = new DOMParser().parseFromString(await fetch(targetUrl).then(res => res.text()), 'text/html')
	const provider = Object.values(providers).find(provider => provider.matcher.test(String(recipeUrl)))

	if (provider !== undefined) {
		return v.parseAsync(recipeScheme, createRecipe(recipeUrl, await provider.scrape(doc)))
	}

	const recipeData = (await Promise.allSettled([
		extractJsonLD(doc),
		extractMicrodata(doc),
	]))
		.filter(item => item.status === 'fulfilled')
		.find(item => item.value !== undefined)?.value

	return v.parseAsync(recipeScheme, createRecipe(recipeUrl, recipeData, id))
}
