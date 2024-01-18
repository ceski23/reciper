import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { createStore, del, get, set, setMany, values } from 'idb-keyval'
import * as v from 'valibot'
import { type Recipe, recipeScheme } from 'features/recipes/types'

const recipesStore = createStore('reciperRecipes', 'reciperRecipesStore')

const getSingleRecipe = (id: string) =>
	get(id, recipesStore).then(recipe => {
		if (recipe === undefined) throw new Error('No recipe found')
		return v.parse(recipeScheme, recipe)
	})

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
		queryFn: () => getSingleRecipe(id),
	})

export const useAddRecipes = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (recipes: Array<Recipe>) => setMany(recipes.map(recipe => [recipe.id, recipe]), recipesStore),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
	})
}

export const useAddRecipe = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (recipe: Recipe) => set(recipe.id, recipe, recipesStore).then(() => getSingleRecipe(recipe.id)),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
	})
}

export const useDeleteRecipe = () =>
	useMutation({
		mutationFn: (id: string) => del(id, recipesStore),
	})
