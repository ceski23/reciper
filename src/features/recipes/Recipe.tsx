import { AnimateDialog } from '@components/dialog/AnimateDialog'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as recipeRoute } from 'routes/recipes/$id'
import { Route as scrapeRoute } from 'routes/recipes/scrape'
import { match } from 'ts-pattern'
import { useNotifications } from 'features/notifications'
import { RecipeContent } from 'features/recipes/components/RecipeContent'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { recipeQuery, useDeleteRecipe } from 'features/recipes/recipes'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/dialog/Dialog'
import { IconButton } from 'lib/components/IconButton'
import { Menu } from 'lib/components/menu'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDynamicTheme } from 'lib/hooks'
import { useApplyDynamicTheme } from 'lib/hooks/useApplyDynamicTheme'
import { useWakelock } from 'lib/hooks/useWakelock'

export const Recipe: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const { notify } = useNotifications()
	const { id } = recipeRoute.useParams()
	const query = useQuery(recipeQuery(id))
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const deleteRecipeMutation = useDeleteRecipe()
	const history = useRouter().history
	const navigate = recipeRoute.useNavigate()

	useApplyDynamicTheme(useDynamicTheme(query.data?.color))
	useWakelock()

	const handleShareRecipe = () => {
		if (query.data === undefined) {
			return
		}

		try {
			if (query.data.url !== undefined) {
				return navigator.share({ url: query.data.url })
			}

			navigator.share({
				title: query.data.name,
				text: [
					query.data.name,
					query.data.description,
					'',
					query.data.ingredients.map(ingredient => `- ${ingredient.text}`).join('\n'),
					'',
					query.data.instructions.map(instruction => `- ${instruction.text}`).join('\n'),
				].join('\n'),
			})
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				notify(t('recipes.sharing.error'))
			}
		}
	}

	if (query.status === 'error') {
		notify(t('recipes.loadError'), { id: 'recipeError' })
		history.back()

		return
	}

	return (
		<Fragment>
			<TopAppBar
				configuration="large"
				title={query.data?.name}
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
							onClick={() => navigate({ to: 'edit' })}
						/>
						{navigator.share !== undefined && (
							<Menu.Item
								text={t('recipes.sharing.menuItem')}
								icon="share"
								onClick={handleShareRecipe}
								disabled={query.status !== 'success'}
							/>
						)}
						<Menu.Item
							text={t('recipes.delete.menuItem')}
							icon="delete"
							onClick={() => setIsDeleteDialogOpen(true)}
						/>
						{query.data?.url !== undefined && (
							<Menu.Item
								text={t('recipes.rescrape.menuItem')}
								icon="sync"
								onClick={() => {
									if (query.data?.url === undefined) {
										return
									}

									return navigate({
										to: scrapeRoute.fullPath,
										search: { url: query.data.url, id: query.data.id },
									})
								}}
							/>
						)}
					</Menu.Root>
				)}
			/>
			{match(query)
				.with({ status: 'pending' }, () => <RecipeContentSkeleton />)
				.with({ status: 'success' }, ({ data }) => (
					<Fragment>
						<AnimateDialog open={isDeleteDialogOpen}>
							<SimpleDialog
								title={t('recipes.delete.title')}
								description={t('recipes.delete.confirmation', { name: data.name })}
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
												deleteRecipeMutation.mutate(data.id, {
													onSuccess: () => history.back(),
												})
											}}
										>
											{t('recipes.delete.delete')}
										</Button>
									),
								]}
							/>
						</AnimateDialog>
						<RecipeContent recipe={data} />
					</Fragment>
				))
				.exhaustive()}
		</Fragment>
	)
}
