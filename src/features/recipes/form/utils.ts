import { type RecipeFormValues } from 'features/recipes/form/scheme'
import { type Recipe } from 'features/recipes/types'

export const mapFormValuesToRecipe = (values: RecipeFormValues) => {
	return {
		...values,
		ingredients: values.ingredients.flatMap(group =>
			group.items.map(item => ({
				group: group.group,
				text: item.text,
			}))
		),
		instructions: values.instructions.flatMap(group =>
			group.items.map(item => ({
				group: group.group,
				text: item.text,
			}))
		),
		tags: values.tags.map(tag => tag.text),
	} satisfies Omit<Recipe, 'id' | 'addedDate'>
}
