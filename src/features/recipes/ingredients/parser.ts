import { type KnownIngredient, type ParsedIngredient } from 'features/recipes/ingredients'
import { type IngredientName, KNOWN_INGREDIENTS } from 'features/recipes/ingredients/ingredients'

const quantityPattern = /\d+(?:[\.,\/]\d+|\si\s\d+\/\d+)?/

const normalizeQuantity = (quantity: string): number => {
	// 1 i 1/3 -> 1.33
	if (quantity.includes(' i ')) {
		const [before, after] = quantity.split(' i ')

		return normalizeQuantity(before) + normalizeQuantity(after)
	}

	// 3/4 -> 0.75
	if (quantity.includes('/')) {
		const [dividend, divider] = quantity.split('/')

		return Number.parseInt(dividend, 10) / Number.parseInt(divider, 10)
	}

	return Number.parseFloat(
		quantity.length >= 5 && quantity.includes(',')
			? quantity.replace(',', '')
			: quantity.replace(',', '.'),
	)
}

const replaceWeirdCharacters = (ingredient: string) =>
	Object
		.entries({
			'½': '1/2',
			'¼': '1/4',
		})
		.reduce((text, [a, b]) => text.replace(a, b), ingredient)

const extractQuantity = (ingredient: string) => {
	const match = quantityPattern.exec(ingredient)
	if (!match) return undefined

	return {
		quantity: normalizeQuantity(match[0]),
		index: match.index,
		length: match[0].length,
		original: match.input,
	}
}

const parseIngredientType = (text: string) => {
	const ingredients = Object.entries(KNOWN_INGREDIENTS) as Array<[IngredientName, KnownIngredient]>

	return ingredients.find(([, ingredient]) => ingredient.pattern.test(text))?.[0]
}

export const parseIngredient = (ingredient: string): ParsedIngredient => {
	const data = extractQuantity(replaceWeirdCharacters(ingredient))
	const ingredientType = parseIngredientType(ingredient)

	// Ingredient without quantity eg. sól, pieprz
	if (!data) {
		return {
			original: ingredient,
			...(ingredientType && { type: ingredientType }),
		}
	}

	// Ingredient with quantity eg. sok z 1/4 limonki
	return {
		original: data.original,
		parsed: {
			begin: data.original.substring(0, data.index).trim(),
			end: data.original.substring(data.index + data.length).trim(),
		},
		quantity: data.quantity,
		...(ingredientType && { type: ingredientType }),
	}
}
