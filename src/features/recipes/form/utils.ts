import { group } from 'radash'
import { type RecipeFormValues } from 'features/recipes/form/scheme'
import { type Recipe } from 'features/recipes/types'

export const mapFormValuesToRecipe = (values: RecipeFormValues) => ({
	...values,
	ingredients: values.ingredients.flatMap(({ items, group }) =>
		items.map(item => ({
			...item,
			group,
		}))
	),
	instructions: values.instructions.flatMap(({ items, group }) =>
		items.map(item => ({
			...item,
			group,
		}))
	),
	tags: values.tags.map(tag => tag.text),
} satisfies Omit<Recipe, 'id' | 'addedDate'>)

export const mapRecipeToFormValues = (recipe: Recipe) => ({
	...recipe,
	ingredients: Object.entries(group(recipe.ingredients, item => item.group ?? '')).map(([group, items]) => ({
		group: group || undefined,
		items: items?.map(({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			group,
			...item
		}) => item) ?? [],
	})),
	instructions: Object.entries(group(recipe.instructions, item => item.group ?? '')).map(([group, items]) => ({
		group: group || undefined,
		items: items?.map(({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			group,
			...item
		}) => item) ?? [],
	})),
	tags: recipe.tags.map(tag => ({ text: tag })),
} satisfies RecipeFormValues)
