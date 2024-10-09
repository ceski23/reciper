import { createFileRoute } from '@tanstack/react-router'
import { EditRecipe } from 'features/recipes/EditRecipe'

export const Route = createFileRoute('/recipes/$id/edit')({
	component: EditRecipe,
})