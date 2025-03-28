import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'
import { useTranslation } from 'react-i18next'
import { Notification } from 'features/notifications'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { Recipe } from 'features/recipes/Recipe'
import { recipeQuery } from 'features/recipes/recipes'

const ErrorComponent = () => {
	const { t } = useTranslation()

	return (
		<Fragment>
			<Notification
				content={t('recipes.loadError')}
				id="recipeError"
			/>
			<Navigate to="/recipes" />
		</Fragment>
	)
}

export const Route = createFileRoute('/recipes/_masterDetail/$id')({
	component: Recipe,
	loader: async ({ params: { id }, context }) => {
		const recipe = await context.queryClient.ensureQueryData(recipeQuery(id))

		context.title = recipe.name
	},
	pendingComponent: () => <RecipeContentSkeleton />,
	errorComponent: ErrorComponent,
})
