import { createFileRoute } from '@tanstack/react-router'
import { Recipe } from 'features/recipes/Recipe'

export const Route = createFileRoute('/recipes/$id')({
	component: Recipe,
})
