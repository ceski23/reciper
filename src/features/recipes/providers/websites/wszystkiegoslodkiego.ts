import wszystkiegoslodkiegoIcon from 'assets/images/providers/wszystkiegoslodkiego.png'
import { extractMicrodata } from 'features/recipes/providers/generic/microdata'
import type { RecipesProvider } from 'features/recipes/providers/scrapper'
import type { Recipe } from 'features/recipes/types'
import { getTextFromNode } from 'lib/utils/dom'

export const wszystkiegoslodkiego: RecipesProvider = {
	name: 'Wszystkiego Słodkiego',
	icon: wszystkiegoslodkiegoIcon,
	matcher: /https:\/\/wszystkiegoslodkiego\.pl\/przepisy\/.*/,
	scrape: async document => {
		const partialRecipe = await extractMicrodata(document)
		const ingredients = getIngredients(document)
		const instructions = partialRecipe.instructions.map(step => ({
			...step,
			group: step.group?.replaceAll(':', ''),
		}))

		return {
			...partialRecipe,
			ingredients,
			instructions,
		}
	},
}

const getIngredients = (document: Document): Recipe['ingredients'] => {
	const ingredients = document.querySelector('.ws-sidebar__section__content-wrapper')

	return Array.from(ingredients?.querySelectorAll('.ingredients-list__heading') ?? []).flatMap(titleElement => {
		const group = titleElement.textContent?.replaceAll(':', '') ?? undefined
		const ingredients = Array.from(titleElement.nextElementSibling?.querySelectorAll('[itemprop="recipeIngredient"]') ?? []).map(elem => ({
			text: getTextFromNode(elem).trim(),
			group,
		}))

		return ingredients
	})
}
