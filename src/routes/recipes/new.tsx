import { createFileRoute } from '@tanstack/react-router'
import { NewRecipe } from 'features/recipes/NewRecipe'

export const Route = createFileRoute('/recipes/new')({
	component: NewRecipe,
})
