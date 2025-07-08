import { group, mapValues } from 'radashi'
import type { RecipeFormValues } from 'features/recipes/form/scheme'
import type { Recipe } from 'features/recipes/types'

type ReplaceUndefinedWithNull<T> = T extends undefined ? null : T
type ToNullProps<T> = {
	[P in keyof T]-?: ReplaceUndefinedWithNull<T[P]>
}

type ReplaceNullWithUndefined<T> = T extends null ? undefined : T
type ToUndefinedProps<T> = {
	[P in keyof T]: ReplaceNullWithUndefined<T[P]>
}

export const mapFormValuesToRecipe = ({
	ingredients,
	instructions,
	tags,
	...rest
}: RecipeFormValues) => ({
	ingredients: ingredients.flatMap(({ items, group }) =>
		items.map(item => ({
			...item,
			group: group ?? undefined,
		}))
	),
	instructions: instructions.flatMap(({ items, group }) =>
		items.map(item => ({
			...item,
			group: group ?? undefined,
		}))
	),
	tags: tags.map(tag => tag.text),
	...mapValues(rest, value => value ?? undefined) as ToUndefinedProps<typeof rest>,
} satisfies Omit<Recipe, 'id' | 'addedDate'>)

export const mapRecipeToFormValues = ({
	ingredients,
	instructions,
	tags,
	...rest
}: Recipe) => ({
	ingredients: Object.entries(group(ingredients, item => item.group ?? '')).map(([group, items]) => ({
		group: group || null,
		items: items?.map(({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			group,
			...item
		}) => item) ?? [],
	})),
	instructions: Object.entries(group(instructions, item => item.group ?? '')).map(([group, items]) => ({
		group: group || null,
		items: items?.map(({
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			group,
			...item
		}) => item) ?? [],
	})),
	tags: tags.map(tag => ({ text: tag })),
	...Object.fromEntries(Object.entries(rest).map(([key, value]) => [key, value ?? null])) as ToNullProps<typeof rest>,
} satisfies RecipeFormValues)
