import { useQuery } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as recipeRoute } from 'routes/recipes/$id'
import { useNotifications } from 'features/notifications'
import { RecipeContent } from 'features/recipes/components/RecipeContent'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { recipeQuery, useDeleteRecipe } from 'features/recipes/recipes'
import { Button } from 'lib/components2/Button'
import { SimpleDialog } from 'lib/components2/dialog/Dialog'
import { IconButton } from 'lib/components2/IconButton'
import { Menu } from 'lib/components2/menu'
import { TopAppBar } from 'lib/components2/TopAppBar'
import { useDynamicTheme } from 'lib/hooks'
import { useApplyDynamicTheme } from 'lib/hooks/useApplyDynamicTheme'
import { useWakelock } from 'lib/hooks/useWakelock'

export const Recipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const { notify } = useNotifications()
	const { id } = recipeRoute.useParams()
	const { data: recipe, status } = useQuery(recipeQuery(id))
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const deleteRecipeMutation = useDeleteRecipe()
	const history = useRouter().history
	const navigate = useNavigate()

	useApplyDynamicTheme(useDynamicTheme(recipe?.color))
	useWakelock()

	const handleShareRecipe = () => {
		navigator.share({ url: recipe?.url }).catch((error: DOMException | TypeError) => {
			error.name !== 'AbortError' && notify(t('recipes.sharing.error'))
		})
	}

	if (status === 'error') {
		notify(t('recipes.loadError'), { id: 'recipeError' })
		history.back()

		return
	}

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={recipe?.name}
				onBackClick={() => history.back()}
				options={(
					<Menu.Root
						open={isMoreOpen}
						setOpen={setIsMoreOpen}
						trigger={(
							<IconButton
								icon="more"
								title={t('recipes.moreOptions')}
								isSelected={isMoreOpen}
							/>
						)}
					>
						<Menu.Item
							text={t('recipes.edit')}
							icon="pencil"
							onClick={() => navigate({ from: recipeRoute.fullPath, to: 'edit' })}
						/>
						{navigator.share !== undefined && (
							<Menu.Item
								text={t('recipes.sharing.menuItem')}
								icon="share"
								onClick={handleShareRecipe}
								disabled={status !== 'success'}
							/>
						)}
						<Menu.Item
							text={t('recipes.delete.menuItem')}
							icon="delete"
							onClick={() => setIsDeleteDialogOpen(true)}
						/>
					</Menu.Root>
				)}
			/>
			{status === 'success' && (
				<SimpleDialog
					open={isDeleteDialogOpen}
					title={t('recipes.delete.title')}
					description={t('recipes.delete.confirmation', { name: recipe.name })}
					onClose={() => setIsDeleteDialogOpen(false)}
					actions={[
						(
							<Button
								key="cancel"
								variant="text"
								onClick={() => setIsDeleteDialogOpen(false)}
							>
								{t('recipes.delete.cancel')}
							</Button>
						),
						(
							<Button
								key="delete"
								variant="filled"
								onClick={() => {
									deleteRecipeMutation.mutate(recipe.id, {
										onSuccess: () => history.back(),
									})
								}}
							>
								{t('recipes.delete.delete')}
							</Button>
						),
					]}
				/>
			)}
			{status === 'pending' ? <RecipeContentSkeleton /> : <RecipeContent recipe={recipe} />}
		</Fragment>
	)
}
