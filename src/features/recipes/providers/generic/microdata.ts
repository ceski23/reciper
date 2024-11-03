import { decodeHTML5Strict } from 'entities'
import { parse, toSeconds } from 'iso8601-duration'
import type { Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'
import { getTextFromNode } from 'lib/utils/dom'
import { getColorFromImage } from 'lib/utils/images'
import { parseValidNumber } from 'lib/utils/numbers'

const getMetaData = (element: Element | null) => {
	if (element === null) return undefined
	if (element.tagName === 'META') return element.getAttribute('content') ?? undefined

	return getTextFromNode(element)
}

const getTags = (root: Element) => {
	const tags = getMetaData(root.querySelector('[itemprop="keywords"]'))?.split(',')
	const category = getMetaData(root.querySelector('[itemprop="recipeCategory"]'))?.split(',')

	return [tags, category]
		.filter(isDefined)
		.flatMap(texts => texts.map(text => text.toLocaleLowerCase().trim()))
}

const getInstructions = (element: Element) =>
	Array
		.from(element.querySelectorAll('[itemprop="recipeInstructions"], [itemprop="itemListElement"][itemtype="http://schema.org/HowToStep"]'))
		.map(elem => {
			const text = elem.querySelector('[itemprop=text]')?.textContent?.trim() ?? elem.textContent?.trim()
			const image = Array.from(elem.querySelectorAll('[itemprop="image"]')).filter(elem =>
				// exclude elements with svg loaders fallbacks
				!elem.getAttribute('src')?.includes('data:image/svg')
			).at(0)?.getAttribute('src')
				?? elem.querySelector('[itemprop="image"]')?.getAttribute('data-src') ?? undefined

			return (text
				? ({
					text: decodeHTML5Strict(text),
					image,
				})
				: undefined)
		})
		.filter(isDefined)

const findMainImage = (doc: Document) => {
	const metaElement = doc.querySelector('meta[itemprop="image"]')

	if (metaElement) return metaElement.getAttribute('content') ?? undefined

	const imageElements = Array.from(doc.querySelectorAll('img[itemprop="image"]')).filter(elem =>
		// exclude elements with svg loaders fallbacks
		!elem.getAttribute('src')?.includes('data:image/svg')
	)

	return imageElements.at(0)?.getAttribute('src') ?? undefined
}

export const extractMicrodata = async (doc: Document) => {
	const root = doc.querySelector('[itemscope][itemtype="https://schema.org/Recipe"], [itemscope][itemtype="http://schema.org/Recipe"]')
	if (!root) throw Error('Couldn\'t find recipe')

	const nameElement = root.querySelector('[itemprop="name"]')
	const name = (nameElement?.tagName === 'META') ? nameElement.getAttribute('content') : nameElement?.textContent?.trim()

	const descriptionElement = root.querySelector('[itemprop="description"]')
	const description = descriptionElement ? getMetaData(descriptionElement)?.trim() : undefined

	const image = findMainImage(doc)

	const instructionSections = Array.from(root.querySelectorAll('[itemprop="recipeInstructions"][itemtype="http://schema.org/HowToSection"]'))
	const instructions: Recipe['instructions'] = instructionSections.length > 0
		? instructionSections.flatMap(sectionElement => {
			const sectionTitle = sectionElement.querySelector('[itemprop="name"]')?.getAttribute('content') ?? undefined

			return getInstructions(sectionElement).map(data => ({
				...data,
				group: sectionTitle,
			}))
		})
		: getInstructions(root)

	const prepTimeISO = root.querySelector('[itemprop="prepTime"]')?.getAttribute('content') ?? undefined
	const prepTime = prepTimeISO ? Math.round(toSeconds(parse(prepTimeISO)) / 60) : undefined

	const totalTimeISO = root.querySelector('[itemprop="totalTime"]')?.getAttribute('content') ?? undefined
	const totalTime = totalTimeISO ? Math.round(toSeconds(parse(totalTimeISO)) / 60) : undefined

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

	const tags = Array.from(new Set(getTags(root)))

	const servingsElement = root.querySelector('[itemprop="recipeYield"]')
	const servings = parseValidNumber(getMetaData(servingsElement))

	const color = image ? await getColorFromImage(image.toString()) : undefined

	return {
		name: name ?? undefined,
		ingredients,
		description,
		image,
		prepTime: prepTime ?? totalTime,
		instructions,
		rating,
		calories,
		tags,
		servings,
		color,
	} satisfies Partial<Recipe>
}
