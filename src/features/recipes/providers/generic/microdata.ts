import { parse, toSeconds } from 'iso8601-duration'
import { recipeScheme } from 'features/recipes/types'
import { isDefined } from 'lib/utils'
import { getTextFromNode } from 'lib/utils/dom'

const getMetaData = (element: Element | null) => {
	if (element === null) return undefined
	if (element.tagName === 'META') return element.getAttribute('content')

	return getTextFromNode(element)
}

export const extractMicrodata = async (doc: Document) => {
	const root = doc.querySelector('[itemscope][itemtype="https://schema.org/Recipe"], [itemscope][itemtype="http://schema.org/Recipe"]')
	if (!root) throw Error('Couldn\'t find recipe')

	const nameElement = root.querySelector('[itemprop="name"]')
	const name = (nameElement?.tagName === 'META') ? nameElement.getAttribute('content') : nameElement?.textContent?.trim()

	const descriptionElement = root.querySelector('[itemprop="description"]')
	const description = descriptionElement ? getMetaData(descriptionElement)?.trim() : undefined

	const imageElement = root.querySelector('[itemprop="image"]')
	const image = ((imageElement?.tagName === 'META') ? imageElement.getAttribute('content') : imageElement?.getAttribute('src')) ?? undefined

	const instructionsElements = root.querySelectorAll('[itemprop="recipeInstructions"]')
	const instructions = Array
		.from(instructionsElements)
		.map(elem => (elem.textContent ? ({ text: elem.textContent?.trim() }) : undefined))
		.filter(isDefined)

	const prepTimeISO = root.querySelector('[itemprop="prepTime"]')?.getAttribute('content') ?? undefined
	const prepTime = prepTimeISO ? Math.round(toSeconds(parse(prepTimeISO)) / 60) : undefined

	// Rating
	const ratingElement = root.querySelector('[itemprop="ratingValue"]')
	const rating = (ratingElement?.textContent)
		? Number.parseFloat(ratingElement.textContent)
		: undefined

	// Nutrition
	const caloriesElement = root.querySelector('[itemprop="calories"]')
	const calories = (caloriesElement?.textContent)
		? Number.parseInt(caloriesElement.textContent, 10)
		: undefined

	// TODO: keywords, nutrition, recipeCategory, recipeCuisine

	const ingredientsElements = root.querySelectorAll('[itemprop="recipeIngredient"]')
	const ingredients = Array
		.from(ingredientsElements)
		.map(elem => (elem.textContent ? ({ text: elem.textContent?.trim() }) : undefined))
		.filter(isDefined)

	const tagsElement = root.querySelector('[itemprop="keywords"]')
	const tags = getMetaData(tagsElement)?.split(',').map(text => text.toLocaleLowerCase().trim())

	const servingsElement = root.querySelector('[itemprop="recipeYield"]')
	const servingsText = getMetaData(servingsElement)
	const servings = servingsText ? Number.parseInt(servingsText, 10) : undefined

	return recipeScheme.partial().parseAsync({
		name: name ?? undefined,
		ingredients,
		description,
		image,
		prepTime,
		instructions,
		rating,
		calories,
		tags,
		servings,
	})
}
