import { getTextFromNode } from '@utils/dom'
import { getColorFromImage } from '@utils/images'
import { parseValidNumber } from '@utils/numbers'
import { decodeHTML5Strict } from 'entities'
import { parse, toSeconds } from 'iso8601-duration'
import { unique } from 'radashi'
import { type Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'

const getDataFromElement = (element: Element | null) => {
	if (element === null) return undefined
	if (element.tagName === 'META' || element.tagName === 'TIME') return element.getAttribute('content') ?? undefined

	return getTextFromNode(element)
}

const cleanDocument = (doc: Document) => {
	const elements = doc.querySelectorAll('[itemtype]')

	for (const element of elements) {
		if (element.getAttribute('itemtype')?.includes('Organization')) {
			element.remove()
		}
	}

	return doc
}

const parseImageElement = (imageElement: Element | null) => {
	const src = imageElement?.getAttribute('src')
	const content = imageElement?.getAttribute('content')

	// exclude elements with svg loaders fallbacks
	if (isDefined(src) && src.startsWith('data:image/svg')) {
		return content ?? undefined
	}

	return content ?? src ?? undefined
}

const findMainImage = (doc: Document): string | undefined => {
	const metaElement = doc.querySelector('meta[itemprop="image"]')

	if (metaElement !== null) {
		return metaElement.getAttribute('content') ?? undefined
	}

	const imageElements = Array.from(doc.querySelectorAll('img[itemprop="image"]')).filter(element =>
		// exclude elements with svg loaders fallbacks
		!element.getAttribute('src')?.includes('data:image/svg')
	)

	return imageElements.find(image => image.getAttribute('src') !== null)?.getAttribute('src') ?? undefined
}

const findPrepTime = (doc: Document): number | undefined =>
	Array
		.from(doc.querySelectorAll('[itemprop="prepTime"], [itemprop="totalTime"]'))
		.map(element => {
			const time = getDataFromElement(element)

			return time !== undefined
				? Math.round(toSeconds(parse(time)) / 60)
				: undefined
		})
		.find(isDefined)

const findTags = (doc: Document) => {
	const keywords = getDataFromElement(doc.querySelector('[itemprop="keywords"]'))?.split(',') ?? []
	const category = getDataFromElement(doc.querySelector('[itemprop="recipeCategory"]'))?.split(',') ?? []

	return unique(
		[...keywords, ...category]
			.filter(isDefined)
			.map(text => text.trim().toLocaleLowerCase()),
	)
}

const findIngredients = (doc: Document) =>
	Array
		.from(doc.querySelectorAll('[itemprop="recipeIngredient"]'))
		.map(element => getDataFromElement(element))
		.filter(isDefined)
		.map(text => ({ text }))

const findInstructions = (sectionElement: Element | Document) =>
	Array
		.from(
			sectionElement.querySelectorAll('[itemprop="recipeInstructions"], [itemprop="itemListElement"][itemtype="http://schema.org/HowToStep"]'),
		)
		.map(element => {
			const text = getDataFromElement(element.querySelector('[itemprop=text]')) ?? getDataFromElement(element)
			const image = Array
				.from(element.querySelectorAll('[itemprop="image"]'))
				.map(parseImageElement)
				.find(isDefined)

			return text
				? {
					text: decodeHTML5Strict(text),
					image,
				}
				: undefined
		})
		.filter(isDefined)

const findInstructionsSections = (doc: Document) => {
	const instructionSections = Array.from(doc.querySelectorAll('[itemprop="recipeInstructions"][itemtype="http://schema.org/HowToSection"]'))

	return instructionSections.length > 0
		? instructionSections.flatMap(sectionElement => {
			const group = getDataFromElement(sectionElement.querySelector('[itemprop="name"]'))

			return findInstructions(sectionElement).map(step => ({
				...step,
				group: group?.endsWith(':') ? group.slice(0, -1) : group,
			}))
		})
		: findInstructions(doc)
}

export const extractMicrodata = async (doc: Document): Promise<Partial<Recipe> | undefined> => {
	const cleanedDoc = cleanDocument(doc)
	const rootElement = cleanedDoc.querySelector('[itemscope][itemtype$="Recipe"]')

	if (rootElement === null) {
		return undefined
	}

	const name = getDataFromElement(rootElement.querySelector('[itemprop="name"]'))
	const description = getDataFromElement(rootElement.querySelector('[itemprop="description"]'))
	const image = findMainImage(cleanedDoc)
	const color = image !== undefined ? await getColorFromImage(image) : undefined
	const prepTime = findPrepTime(cleanedDoc)
	const rating = parseValidNumber(getDataFromElement(rootElement.querySelector('[itemprop="ratingValue"]')))
	const servings = parseValidNumber(getDataFromElement(rootElement.querySelector('[itemprop="recipeYield"]')))
	const calories = parseValidNumber(getDataFromElement(rootElement.querySelector('[itemprop="calories"]')))
	const tags = findTags(cleanedDoc)
	const ingredients = findIngredients(cleanedDoc)
	const instructions = findInstructionsSections(cleanedDoc)

	return {
		name,
		description,
		image,
		prepTime,
		rating,
		servings,
		color,
		calories,
		tags,
		ingredients,
		instructions,
	}
}
