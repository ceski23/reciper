import kwestiasmakuIcon from 'assets/images/providers/kwestia_smaku.png'
import { extractMicrodata } from 'features/recipes/providers/generic/microdata'
import type { RecipesProvider } from 'features/recipes/providers/scrapper'
import type { Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'
import { getTextFromNode } from 'lib/utils/dom'
import { getColorFromImage } from 'lib/utils/images'
import { parseValidNumber } from 'lib/utils/numbers'

export const kwestiasmaku: RecipesProvider = {
	name: 'Kwestia Smaku',
	icon: kwestiasmakuIcon,
	matcher: /https:\/\/www\.kwestiasmaku\.com\/.*/,
	scrape: async doc => {
		const partialRecipe = await extractMicrodata(doc)
		const color = partialRecipe?.image ? await getColorFromImage(partialRecipe.image).catch(() => undefined) : undefined
		const description = doc.querySelector('.field-name-field-uwagi-wstepne')?.textContent?.trim()

		const tags = Array
			.from(doc.querySelectorAll('#node-przepis-full-group-kategorie a'))
			.map(elem => elem.textContent?.toLowerCase())
			.filter(isDefined)

		const servingsElement = doc.querySelector('.field-name-field-ilosc-porcji')
		const servings = parseValidNumber(servingsElement?.textContent)

		return {
			...partialRecipe,
			ingredients: parseIngredients(doc),
			instructions: parseInstructions(doc),
			color,
			description,
			tags,
			servings,
			gallery: parseImages(doc),
		}
	},
}

const parseIngredients = (doc: Document): Recipe['ingredients'] => {
	const ingredientsRoot = doc.querySelector('.field-name-field-skladniki')
	if (!ingredientsRoot) return []

	// Multiple ingredients groups
	if (ingredientsRoot.querySelector('.wyroznione')) {
		return Array.from(ingredientsRoot.children).reduce<{
			ingredients: Recipe['ingredients']
			group?: string
		}>(({ ingredients, group }, element) => {
			const nextGroup = (element.tagName === 'DIV' ? element.textContent?.trim() : undefined) ?? group
			const nextIngredients = Array
				.from(element.querySelectorAll('li'))
				.map(elem => getTextFromNode(elem).trim())
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
	}

	// Signle ingredients group
	const recipeIngredients = Array
		.from(ingredientsRoot.querySelectorAll('ul > li'))
		.map(elem => elem.textContent?.trim())
		.filter(isDefined)
		.map(text => ({ text }))

	return recipeIngredients
}

const parseInstructions = (doc: Document): Recipe['instructions'] => {
	const instructionsRoot = doc.querySelector('.field-name-field-przygotowanie')
	if (!instructionsRoot) return []

	// Multiple instruction groups
	if (instructionsRoot.querySelector('.wyroznione')) {
		return Array.from(instructionsRoot.children).reduce<{
			instructions: Recipe['instructions']
			group?: string
		}>(({ instructions, group }, element) => {
			const nextGroup = (element.tagName === 'DIV' ? element.textContent?.trim() : undefined) ?? group
			const nextInstructions = Array
				.from(element.querySelectorAll('li'))
				.map(elem => getTextFromNode(elem).trim())
				.filter(isDefined)
				.map(text => ({ text, group: nextGroup }))

			return {
				instructions: instructions.concat(nextInstructions),
				group: nextGroup,
			}
		}, {
			instructions: [],
			group: undefined,
		}).instructions
	}

	// Signle instructions group
	return Array
		.from(instructionsRoot.querySelectorAll('ul > li'))
		.map(elem => getTextFromNode(elem).trim())
		.filter(isDefined)
		.map(text => ({ text }))
}

const parseImages = (doc: Document) =>
	Array
		.from(doc.querySelectorAll('.view-zdjecia img'))
		.map(elem => elem.getAttribute('src'))
		.filter(isDefined)
