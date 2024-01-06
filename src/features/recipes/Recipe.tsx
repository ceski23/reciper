import { useQuery } from '@tanstack/react-query'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypedParams } from 'react-router-typesafe-routes/dom'
import { RecipeContent } from 'features/recipes/components/RecipeContent'
import { RecipeContentSkeleton } from 'features/recipes/components/RecipeContentSkeleton'
import { recipeQuery, useDeleteRecipe } from 'features/recipes/recipes'
import { Button } from 'lib/components/Button'
import { SimpleDialog } from 'lib/components/Dialog'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { Menu } from 'lib/components/Menu'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDynamicTheme } from 'lib/hooks'
import { useDialogState } from 'lib/hooks/useDialogState'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useNotifications } from 'lib/hooks/useNotifications'
import { useWakelock } from 'lib/hooks/useWakelock'
import { PATHS } from 'lib/routing/paths'

export const Recipe: FunctionComponent = () => {
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { notify } = useNotifications()
	const { id } = useTypedParams(PATHS.RECIPES.RECIPE)
	const { data: recipe, status } = useQuery(recipeQuery(id))
	const style = useDynamicTheme(recipe?.color)
	const { AnimateDialog, state: [, setIsDeleteDialogOpen] } = useDialogState(false)
	const deleteRecipeMutation = useDeleteRecipe()
	const navigate = useNavigate()

	useWakelock()

	const handleShareRecipe = () => {
		navigator.share({ url: recipe?.url }).catch((error: DOMException | TypeError) => {
			error.name !== 'AbortError' && notify('There was an error while sharing recipe, try again')
		})
	}

	if (status === 'error') {
		notify('Couldn\'t load this recipe', { id: 'recipeError' })
		navigate(-1)

		return
	}

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title={recipe?.name}
					elevation={isListScrolled ? 'onScroll' : 'flat'}
					style={style}
					options={(
						<Menu.Root
							open={isMoreOpen}
							onOpenChange={setIsMoreOpen}
						>
							<Menu.Trigger asChild>
								<IconButton
									icon="more"
									title="More"
									isSelected={isMoreOpen}
								/>
							</Menu.Trigger>
							<Menu.Content open={isMoreOpen}>
								<Menu.Item
									text="Edit recipe"
									icon="pencil"
									disabled
								/>
								{navigator.share !== undefined && (
									<Menu.Item
										text="Share recipe"
										icon="share"
										onSelect={handleShareRecipe}
										disabled={status !== 'success'}
									/>
								)}
								<Menu.Item
									text="Delete recipe"
									icon="delete"
									onSelect={() => setIsDeleteDialogOpen(true)}
								/>
							</Menu.Content>
						</Menu.Root>
					)}
				/>
				{status === 'success' && (
					<AnimateDialog>
						<SimpleDialog
							title="Delete recipe"
							description={`Do you really want to delete recipe ${recipe.name}?`}
							onOpenChange={() => setIsDeleteDialogOpen(false)}
							actions={[
								(
									<Button
										key="cancel"
										variant="text"
										onClick={() => setIsDeleteDialogOpen(false)}
									>
										Cancel
									</Button>
								),
								(
									<Button
										key="delete"
										variant="filled"
										onClick={() => {
											deleteRecipeMutation.mutate(recipe.id, {
												onSuccess: () => navigate(-1),
											})
										}}
									>
										Delete
									</Button>
								),
							]}
						/>
					</AnimateDialog>
				)}
			</HeaderPortal>
			{renderProbe}
			{status === 'pending' ? <RecipeContentSkeleton /> : (
				<RecipeContent
					recipe={recipe}
					style={style}
				/>
			)}
		</Fragment>
	)
}
