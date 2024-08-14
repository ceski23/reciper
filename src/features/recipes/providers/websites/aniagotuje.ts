import aniagotujeIcon from 'assets/images/providers/ania_gotuje.png'
import { extractMicrodata } from 'features/recipes/providers/generic/microdata'
import type { RecipesProvider } from 'features/recipes/providers/scrapper'
import type { Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'
import { getTextFromNode, isElementNode } from 'lib/utils/dom'
import { getColorFromImage } from 'lib/utils/images'

export const aniagotuje: RecipesProvider = {
	name: 'AniaGotuje.pl',
	icon: aniagotujeIcon,
	matcher: /https:\/\/aniagotuje\.pl\/.*/,
	scrape: async doc => {
		const partialRecipe = await extractMicrodata(doc)
		const color = partialRecipe.image ? await getColorFromImage(partialRecipe.image) : undefined
		const name = doc.querySelector('.article-content [itemprop="name"]')?.textContent?.trim()

		return {
			...partialRecipe,
			color,
			name,
			ingredients: parseIngredients(doc) ?? partialRecipe.ingredients,
			instructions: parseInstructions(doc) ?? partialRecipe.instructions,
			gallery: parseImages(doc),
		}
	},
}

const parseImages = (doc: Document) =>
	Array
		.from(doc.querySelectorAll('[itemprop="recipeInstructions"] img'))
		.map(elem => elem.getAttribute('data-src'))
		.filter(isDefined)

const parseIngredients = (doc: Document) => {
	const root = doc.querySelector('[itemprop="recipeInstructions"] > .ads-slot-article + div')
	const ingredientsHeaders = root?.querySelectorAll<HTMLParagraphElement>('.ing-header')

	// Single recipe
	if (ingredientsHeaders?.length === 0) {
		const recipeIngredients = Array
			.from(root?.querySelectorAll('.recipe-ing-list [itemprop="recipeIngredient"]') ?? [])
			.map(elem => elem.textContent?.trim())
			.filter(isDefined)
			.map(text => ({ text }))

		return recipeIngredients.length > 0 ? recipeIngredients : undefined
	}

	// Recipe with sub-recipes
	const recipeIngredients = Array.from(ingredientsHeaders ?? []).reduce<{
		ingredients: Recipe['ingredients']
		group?: string
	}>(({ ingredients, group }, element) => {
		const nextGroup = element.textContent?.trim() ?? group
		const nextIngredients = Array
			.from(element.nextElementSibling?.querySelectorAll('[itemprop="recipeIngredient"]') ?? [])
			.map(elem => elem.textContent?.trim())
			.filter(isDefined)
			.map(text => ({ text, group: nextGroup }))

		return {
			ingredients: ingredients.concat(nextIngredients),
			group: nextGroup,
		}
	}, {
		ingredients: [],
		group: undefined,
	}).ingredients

	return recipeIngredients.length > 0 ? recipeIngredients : undefined
}

const parseInstructions = (doc: Document) => {
	const instructions: Recipe['instructions'] = []
	let currentElement: Node | Element | null = doc.querySelector('[itemprop="recipeInstructions"] div + :is(h3, h2)')
	let header: string | undefined

	while (currentElement !== null && currentElement !== undefined) {
		if (
			isElementNode(currentElement)
			&& ['H1', 'H2', 'H3', 'H4'].includes(currentElement.tagName)
		) {
			header = currentElement.textContent?.trim()
		} else {
			const text = getTextFromNode(currentElement)

			if (text !== null && text.length > 0) {
				instructions.push({ text, group: header })
			}
		}

		currentElement = currentElement.nextSibling
	}

	return instructions.length > 0 ? instructions : undefined
}
