import { nanoid } from 'nanoid'
import { type RecipesProvider } from '../../scrapper'

export const scrapeRecipe = async (provider: RecipesProvider, content: string) => {
	const document = new DOMParser().parseFromString(content, 'text/html')

	return provider.scrape(document)
}

export const createRecipe = (partialRecipe: Awaited<ReturnType<typeof scrapeRecipe>> | undefined) => ({
	...partialRecipe,
	id: nanoid(),
	addedDate: new Date().getTime(),
})
