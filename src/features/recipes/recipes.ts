import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { createStore, get, setMany, values } from 'idb-keyval'
import { type Recipe } from 'features/recipes/samples'

const recipesStore = createStore('reciperRecipes', 'reciperRecipesStore')

export const recipesQuery = () =>
	queryOptions({
		queryKey: ['recipes'],
		queryFn: () => values<Recipe>(recipesStore),
	})

export const recipeQuery = (id: string) =>
	queryOptions({
		queryKey: ['recipes', id],
		queryFn: () => get<Recipe>(id, recipesStore),
	})

export const useAddRecipes = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (recipes: Array<Recipe>) => setMany(recipes.map(recipe => [recipe.id, recipe]), recipesStore),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
	})
}
