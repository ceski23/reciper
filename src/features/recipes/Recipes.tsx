import { styled } from '@macaron-css/react'
import { useIsMutating, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as recipesIndexRoute } from 'routes/recipes/index'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { Notification, useNotifications } from 'features/notifications'
import { AddByUrlDialog } from 'features/recipes/components/AddByUrlDialog'
import { AddRecipeDialog } from 'features/recipes/components/AddRecipeDialog'
import { RecipeListItemSkeleton } from 'features/recipes/components/RecipeListItemSkeleton'
import { recipesQuery, useAddRecipes, useSyncRecipes } from 'features/recipes/recipes'
import { sampleRecipes } from 'features/recipes/samples'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { IconButton } from 'lib/components/IconButton'
import { List } from 'lib/components/list'
import { Menu } from 'lib/components/menu'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { accountStore } from 'lib/stores/account'
import { uiStore } from 'lib/stores/ui'

export const Recipes: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const notifications = useNotifications()
	const recipes = useQuery(recipesQuery())
	const addRecipes = useAddRecipes()
	const [container, setContainer] = useState<HTMLElement | null>(null)
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false)
	const { recipesViewMode, setRecipesViewMode } = uiStore.useStore()
	const navigate = useNavigate()
	const { syncStatus, setSyncStatus, accountProvider } = accountStore.useStore()
	const syncRecipes = useSyncRecipes()
	const isSyncing = useIsMutating({ exact: true, mutationKey: ['syncRecipes'] }) > 0
	const [isMoreOpen, setIsMoreOpen] = useState(false)

	const handleRecipesSync = async () => {
		if (accountProvider === undefined || recipes.data === undefined) {
			return
		}

		syncRecipes.mutate({
			accountProvider,
			recipes: recipes.data,
			syncStatus,
		}, {
			onSuccess: ({ syncStatus }) => setSyncStatus(syncStatus),
		})
	}

	useEffect(() => {
		if (recipes.data?.length === 0) {
			const id = setTimeout(() => {
				notifications.notify(t('recipes.sampleRecipes.text'), {
					id: 'samples',
					duration: Number.POSITIVE_INFINITY,
					action: {
						label: t('recipes.sampleRecipes.add'),
						onClick: () => {
							addRecipes.mutate(sampleRecipes, {
								onSuccess: () => notifications.hide('samples'),
							})
						},
					},
				})
			}, 2000)

			return () => clearTimeout(id)
		}
	}, [recipes.data?.length, addRecipes, t, notifications])

	return (
		<Fragment>
			<TopAppBar
				configuration="small"
				title={t('paths.recipes')}
				progress={isSyncing}
				container={container}
				elevation={isListScrolled ? 'onScroll' : 'flat'}
				onBackClick={() => navigate({ from: recipesIndexRoute.fullPath, to: '../', params: {} })}
				options={[
					(
						<IconButton
							key="view"
							icon={recipesViewMode === 'list' ? 'viewGrid' : 'viewList'}
							title={recipesViewMode === 'list' ? t('recipes.view.grid') : t('recipes.view.list')}
							onClick={() => setRecipesViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
						/>
					),
					(
						<Menu.Root
							key="more"
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
								text={t('recipes.sync.menuItem')}
								icon="sync"
								onClick={handleRecipesSync}
								disabled={accountProvider === undefined || recipes.data === undefined || isSyncing}
							/>
						</Menu.Root>
					),
				]}
			/>
			{recipes.status === 'pending'
				? (
					<div>
						{Array.from({ length: 8 }, (_, index) => <RecipeListItemSkeleton key={index} />)}
					</div>
				)
				: recipes.status === 'error'
				? (
					<Notification
						content={t('recipes.listLoadError')}
						duration={Number.POSITIVE_INFINITY}
					/>
				)
				: recipesViewMode === 'grid'
				? (
					<RecipesGrid>
						{renderProbe}
						{recipes.data.map(recipe => (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
								style={{ width: '100%' }}
							/>
						))}
					</RecipesGrid>
				)
				: (
					<List.Root
						virtual={{ overscan: 10 }}
						ref={setContainer}
						scrollRestorationId="recipesList"
					>
						{renderProbe}
						{recipes.data.map(recipe => (
							<RecipeListItem
								key={recipe.id}
								recipe={recipe}
							/>
						))}
					</List.Root>
				)}
			<ContentOverlayPortal>
				<FabContainer>
					<FloatingActionButton
						icon="plus"
						label={t('recipes.addRecipe.cta')}
						type="button"
						variant="primary"
						size={isListScrolled ? undefined : 'expanded'}
						onClick={() => setIsAddDialogOpen(true)}
					/>
				</FabContainer>
			</ContentOverlayPortal>
			<AddByUrlDialog
				open={isUrlDialogOpen}
				onClose={() => setIsUrlDialogOpen(false)}
			/>
			<AddRecipeDialog
				open={isAddDialogOpen}
				onAddByUrl={() => {
					setIsUrlDialogOpen(true)
					setIsAddDialogOpen(false)
				}}
				onClose={() => setIsAddDialogOpen(false)}
			/>
		</Fragment>
	)
}

const FabContainer = styled('div', {
	base: {
		display: 'flex',
		paddingInline: 16,
		paddingBottom: 16,
		justifyContent: 'flex-end',
		position: 'relative',
		bottom: 'env(keyboard-inset-height, 0)',
	},
})

const RecipesGrid = styled('div', {
	base: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
		gap: 16,
		margin: 16,
		marginTop: 0,
	},
})
