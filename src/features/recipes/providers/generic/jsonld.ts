import { getColorFromImage } from '@utils/images'
import { parseValidNumber } from '@utils/numbers'
import { decodeHTML5Strict } from 'entities'
import { parse, toSeconds } from 'iso8601-duration'
import {
	type AggregateRating,
	type CreativeWork,
	type DefinedTerm,
	type Duration,
	type Energy,
	type Graph,
	type HowToStep,
	type ImageObject,
	type ItemList,
	type NutritionInformation,
	type PronounceableText,
	type QuantitativeValue,
	type Recipe as RecipeSchemaType,
	type Role,
	type Text,
	type TextObject,
	type Thing,
} from 'schema-dts'
import { type Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'

type SchemaValue<T> = T | Role<T> | ReadonlyArray<T | Role<T>>

type IdReference = {
	'@id': string
}

type Instruction = {
	text: string
	group?: string
	image?: string
}

const getFirstItem = <T>(value: T | Array<T> | undefined): T | undefined => value instanceof Array ? value.at(0) : value

const isGraph = (value: unknown): value is Graph => isDefined(value) && typeof value === 'object' && ('@graph' in value)

const isRecipe = (value: Thing): value is RecipeSchemaType =>
	typeof value === 'object' && '@type' in value
	&& (value['@type'] === 'Recipe' || Array.isArray(value['@type']) && value['@type'].includes('Recipe'))

const parseStringValue = (value: SchemaValue<IdReference | Text | TextObject> | undefined): string | Array<string> | undefined => {
	if (!isDefined(value)) return undefined

	if (typeof value === 'string') return decodeHTML5Strict(value)

	if (value instanceof Array) {
		return value.filter(isDefined).map(item => decodeHTML5Strict(item.toString()))
	}

	return undefined
}

const parseNumberValue = (value: SchemaValue<string | number | PronounceableText> | undefined): number | undefined => {
	if (!isDefined(value)) return undefined

	if (typeof value === 'string') {
		return parseValidNumber(value)
	}

	if (typeof value === 'number') return value

	if (value instanceof Array) {
		return undefined
	}

	return undefined
}

const parseImageValue = (value: SchemaValue<string | ImageObject | IdReference> | undefined): string | Array<string> | undefined => {
	if (!isDefined(value)) return undefined

	return (value instanceof Array ? value : [value])
		.map(image => {
			// String
			if (typeof image === 'string') return image

			// ImageObject
			if ('@type' in image && image['@type'] === 'ImageObject') {
				return getFirstItem(parseStringValue(image.url))
			}

			return undefined
		})
		.filter(isDefined)
}

const parseEnergyValue = (value: SchemaValue<Energy | IdReference> | undefined) => {
	if (!isDefined(value)) return undefined

	if (value instanceof Array) {
		return undefined
	}

	if (typeof value === 'string') {
		return value
	}

	return undefined
}

const parseNutritionValue = (value: SchemaValue<NutritionInformation | IdReference> | undefined) => {
	if (!isDefined(value)) return undefined

	return (value instanceof Array ? value : [value])
		.map(nutrition => {
			if ('@type' in nutrition && nutrition['@type'] === 'NutritionInformation') {
				return {
					calories: parseEnergyValue(nutrition.calories),
					// TODO: parse more nutrition information
				}
			}

			return undefined
		})
		.filter(isDefined)
		.at(0)
}

const parseCalories = (value: string | undefined): number | undefined => value ? parseInt(value.replace('kcal', ''), 10) : undefined

const parseRecipeYieldValue = (value: SchemaValue<IdReference | Text | QuantitativeValue> | undefined): number | Array<number> | undefined => {
	if (!isDefined(value)) return undefined

	return (value instanceof Array ? value : [value])
		.map(yieldValue => {
			if (typeof yieldValue === 'string') {
				return parseValidNumber(yieldValue)
			}

			if ('@type' in yieldValue && yieldValue['@type'] === 'QuantitativeValue') {
				return undefined
			}

			return undefined
		})
		.filter(isDefined)
}

const parseRatingValue = (value: SchemaValue<IdReference | AggregateRating> | undefined): number | undefined => {
	if (!isDefined(value)) return undefined

	return (value instanceof Array ? value : [value])
		.map(rating => {
			if ('@type' in rating && rating['@type'] === 'AggregateRating') {
				return parseNumberValue(rating.ratingValue)
			}

			return undefined
		})
		.filter(isDefined)
		.at(0)
}

const parseDurationValue = (value: SchemaValue<IdReference | Duration> | undefined): number | undefined => {
	if (!isDefined(value) || value === '') return undefined

	if (value instanceof Array) {
		return undefined
	}

	if (typeof value === 'string') {
		return Math.round(toSeconds(parse(value)) / 60)
	}

	if ('@type' in value && value['@type'] === 'Duration') {
		return undefined
	}
}

const gatherTags = (...values: Array<SchemaValue<IdReference | Text | DefinedTerm> | undefined>): Array<string> | undefined =>
	values.flatMap(value => {
		if (!isDefined(value)) return []

		return (value instanceof Array ? value : [value])
			.flatMap(tag => {
				if (typeof tag === 'string') {
					return tag.toLocaleLowerCase().split(',')
				}

				if ('@type' in tag && tag['@type'] === 'DefinedTerm') {
					return getFirstItem(parseStringValue(tag.name))?.toLocaleLowerCase().split(',')
				}

				return undefined
			})
			.filter(isDefined)
			.map(tag => tag.trim())
	})

const parseIngredients = (value: SchemaValue<Text> | undefined): Array<{ text: string }> => {
	const ingredients = parseStringValue(value)

	if (!ingredients) return []

	return (ingredients instanceof Array ? ingredients : [ingredients])
		.map(ingredient => ({ text: ingredient }))
}

const parseHowToStepValue = (value: HowToStep): Instruction | undefined => {
	const text = getFirstItem(parseStringValue(value.text))
	const image = getFirstItem(parseImageValue(value.image))

	if (text === undefined) return undefined

	if (image === undefined) return { text }

	return {
		text,
		image,
	}
}

const parseInstructions = (value: SchemaValue<CreativeWork | ItemList | Text | IdReference> | undefined): Array<Instruction> => {
	return (value instanceof Array ? value : [value])
		.flatMap(item => {
			if (!isDefined(item)) return undefined

			if (typeof item === 'string') return { text: item.trim() }

			if ('@type' in item && item['@type'] === 'HowToStep') {
				return [parseHowToStepValue(item)].filter(isDefined)
			}

			if ('@type' in item && item['@type'] === 'HowToSection') {
				const steps = item.steps ?? item.itemListElement

				if (!steps) return []

				if (typeof steps === 'string') return [{ text: steps.trim() }]

				if (steps instanceof Array) {
					return steps.map(step => {
						if (typeof step === 'string') return { text: step.trim() }

						if ('@type' in step && step['@type'] === 'HowToStep') return parseHowToStepValue(step)

						return undefined
					})
				}
			}

			return undefined
		})
		.filter(isDefined) ?? []
}

const parseRecipeItem = async (item: RecipeSchemaType): Promise<Partial<Recipe>> => {
	const name = getFirstItem(parseStringValue(item.name))
	const description = getFirstItem(parseStringValue(item.description))
	const parsedImageField = parseImageValue(item.image)
	const image = getFirstItem(parsedImageField)
	const gallery = Array.isArray(parsedImageField) ? parsedImageField : (parsedImageField ? [parsedImageField] : undefined)
	const color = image ? await getColorFromImage(image).catch(() => undefined) : undefined
	const nutrition = parseNutritionValue(item.nutrition)
	const calories = parseCalories(nutrition?.calories)
	const recipeYield = parseRecipeYieldValue(item.recipeYield)
	const servings = getFirstItem(recipeYield)
	const rating = parseRatingValue(item.aggregateRating)
	const prepTime = parseDurationValue(item.totalTime ?? item.prepTime ?? item.timeRequired)
	const tags = gatherTags(item.recipeCategory, item.recipeCuisine, item.keywords)
	const ingredients = parseIngredients(item.recipeIngredient)
	const instructions = parseInstructions(item.recipeInstructions)

	return {
		name,
		description,
		image,
		gallery,
		color,
		calories,
		servings,
		rating,
		prepTime,
		tags,
		ingredients,
		instructions,
	}
}

export const extractJsonLD = async (doc: Document): Promise<Partial<Recipe> | undefined> => {
	const elements = doc.querySelectorAll('[type="application/ld+json"]')

	const recipeLeaf = Array.from(elements).flatMap(element => {
		const parsed = JSON.parse(element.textContent ?? '{}') as Graph | Thing | Array<Thing>
		const schemaItems = isGraph(parsed) ? parsed['@graph'] : Array.isArray(parsed) ? parsed : [parsed]

		return schemaItems.filter(isRecipe)
	}).at(0)

	if (recipeLeaf === undefined) {
		return undefined
	}

	return parseRecipeItem(recipeLeaf)
}
