import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { createStore, del, get, setMany, values } from 'idb-keyval'
import { type Recipe } from 'features/recipes/samples'

const recipesStore = createStore('reciperRecipes', 'reciperRecipesStore')

export const recipesQuery = () =>
	queryOptions({
		queryKey: ['recipes'],
		retry: false,
		queryFn: () => values<Recipe>(recipesStore),
	})

export const recipeQuery = (id: string) =>
	queryOptions({
		queryKey: ['recipes', id],
		retry: false,
		queryFn: () =>
			get<Recipe>(id, recipesStore).then(recipe => {
				if (recipe === undefined) throw new Error('No recipe found')
				return recipe
			}),
	})

export const useAddRecipes = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (recipes: Array<Recipe>) => setMany(recipes.map(recipe => [recipe.id, recipe]), recipesStore),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
	})
}

export const useDeleteRecipe = () =>
	useMutation({
		mutationFn: (id: string) => del(id, recipesStore),
	})
