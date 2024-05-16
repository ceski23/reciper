import { decodeHTML5Strict } from 'entities'
import { parse, toSeconds } from 'iso8601-duration'
import type { HowToStep, ImageObject, Recipe as SchemaRecipe } from 'schema-dts'
import { isArrayOf, isDefined, isString } from 'lib/utils'
import { getColorFromImage } from 'lib/utils/images'

function isHowToStepArray(instructions: SchemaRecipe['recipeInstructions']): instructions is Array<HowToStep> {
	return Array.isArray(instructions) && instructions[0]['@type'] === 'HowToStep'
}

const isImageObject = (val: unknown): val is ImageObject => (
	!!val && typeof val === 'object' && ('@type' in val) && val['@type'] === 'ImageObject'
)

const parseInstructions = (instructions: SchemaRecipe['recipeInstructions']): Array<string> | undefined => {
	if (Array.isArray(instructions) && instructions.length === 1) instructions = instructions[0]

	if (Array.isArray(instructions) && instructions.length === 1) instructions = instructions[0]

	if (!instructions) return []

	if (typeof instructions === 'string') return [instructions]

	if ('@type' in instructions && instructions['@type'] === 'HowToSection') {
		const steps = instructions.steps ?? instructions.itemListElement
		if (!steps) return []
		if (typeof steps === 'string') return [steps]

		if ('@type' in steps || '@id' in steps) return undefined

		return steps.map(i => {
			if (typeof i === 'string') return i
			if ('@type' in i && i['@type'] === 'HowToStep') return i.description?.toString() || i.text?.toString()
			return undefined
		}).filter(isDefined)
	}

	if (isHowToStepArray(instructions)) {
		return instructions.map(i => {
			if ('@type' in i && i['@type'] === 'HowToStep') return i.description?.toString() || i.text?.toString()
			return undefined
		}).filter(isDefined)
	}

	if (Array.isArray(instructions) && typeof instructions[0] === 'string') return instructions

	return []
}

const parseJsons = (elems: NodeListOf<Element>) => {
	const jsons = []

	for (const elem of elems) {
		if (elem.textContent) {
			const parsed = JSON.parse(elem.textContent)

			if ('@graph' in parsed && Array.isArray(parsed['@graph'])) {
				jsons.push(...parsed['@graph'].filter(x => x['@type'] === 'Recipe'))
			} else if (parsed['@type'] === 'Recipe') {
				jsons.push(parsed)
			} else if (Array.isArray(parsed)) {
				jsons.push(...parsed.filter(x => x['@type'] === 'Recipe'))
			}
		}
	}

	return jsons
}

const getRating = (data: SchemaRecipe['aggregateRating']) => {
	if (!(data && '@type' in data && data['@type'] === 'AggregateRating')) return undefined
	if (!data.ratingValue) return undefined

	return Number.parseFloat(data.ratingValue?.toString())
}

const parseTags = (schemaRecipe: SchemaRecipe) => {
	const tags: Array<string> = []

	const category = schemaRecipe.recipeCategory?.toString()
	if (category) tags.push(category.toLocaleLowerCase())

	const cuisine = schemaRecipe.recipeCuisine?.toString()
	if (cuisine) tags.push(cuisine.toLocaleLowerCase())

	const keywords = schemaRecipe.keywords?.toString()
	if (keywords) {
		tags.push(
			...keywords.split(',').map(text => text.toLocaleLowerCase().trim()),
		)
	}

	return Array.from(new Set(tags))
}

const parseGallery = (schemaRecipe: SchemaRecipe): Array<string> | undefined => {
	const images = schemaRecipe.image
	if (!images) return undefined

	if (Array.isArray(images)) {
		// Array of strings
		if (isArrayOf(images, isString)) return images

		// Array of ImageObject
		if (isArrayOf(images, isImageObject)) {
			return images
				.map(img => String(img.url ?? ''))
				.filter(isDefined)
		}
	} else {
		// String
		if (isString(images)) return [images]

		// ImageObject
		if (isImageObject(images)) return images.url ? [images.url.toString()] : undefined
	}

	return undefined
}

export const extractJsonLD = async (doc: Document) => {
	const elems = doc.querySelectorAll('[type="application/ld+json"]')
	const data = parseJsons(elems)[0]

	if (!data) {
		throw Error('No JSON-LD data available')
	}

	const schemaRecipe = data as SchemaRecipe

	const { name } = schemaRecipe
	// if (!name) throw Error('Couldn\'t find recipe name');

	const { description } = schemaRecipe
	let { image } = schemaRecipe
	if (image !== undefined) {
		if (Array.isArray(image)) image = image[0]
		if (typeof image === 'string') image = image.toString()
		// @ts-expect-error TODO: better narrow types
		else if (!!image && '@type' in image) image = image.url
	}

	const ingredientsData = schemaRecipe.recipeIngredient
	// if (!ingredientsData) throw Error('Couldn\'t find ingredients');
	const ingredientsArray = Array.from(ingredientsData as Array<string> ?? [])
	const ingredients = ingredientsArray?.map(i => ({ text: i }))

	// FIXME: Better instructions parsing
	const instructions = parseInstructions(schemaRecipe.recipeInstructions)
		?.map(i => ({ text: decodeHTML5Strict(i.trim()) }))
	// if (!instructions) throw Error('Couldn\'t find or parse instructions');

	let prepTimeISO = schemaRecipe.totalTime ?? schemaRecipe.prepTime
	// FIXME: Better duration recognition
	if (prepTimeISO !== undefined && typeof prepTimeISO !== 'string') prepTimeISO = undefined
	const prepTime = prepTimeISO ? Math.round(toSeconds(parse(prepTimeISO)) / 60) : undefined

	let servings = schemaRecipe.recipeYield
		? Number.parseInt(schemaRecipe.recipeYield.toString(), 10)
		: undefined
	if (Number.isNaN(servings)) servings = undefined

	const caloriesText = (schemaRecipe.nutrition && '@type' in schemaRecipe.nutrition)
		// @ts-expect-error TODO: better narrow types
		? schemaRecipe.nutrition.calories?.toString().replace('kcal', '').trim()
		: undefined
	let calories = caloriesText ? Number.parseInt(caloriesText, 10) : undefined
	if (Number.isNaN(calories)) calories = undefined

	const color = image ? await getColorFromImage(image.toString()) : undefined

	return {
		name: name ? name.toString() : undefined,
		description: description ? decodeHTML5Strict(description.toString()) : undefined,
		image: image?.toString(),
		ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
		instructions,
		prepTime,
		tags: parseTags(schemaRecipe),
		servings,
		calories,
		color,
		rating: getRating(schemaRecipe.aggregateRating),
		gallery: parseGallery(schemaRecipe),
	}
}
