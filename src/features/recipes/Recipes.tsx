import { keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route as recipesIndexRoute } from 'routes/recipes/index'
import { useAccountProvider } from 'features/auth/hooks'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { AddByUrlDialog } from 'features/recipes/components/AddByUrlDialog'
import { AddRecipeDialog } from 'features/recipes/components/AddRecipeDialog'
import { RecipeListItemSkeleton } from 'features/recipes/components/RecipeListItemSkeleton'
import { recipesQuery, useAddRecipes, useSetRecipes } from 'features/recipes/recipes'
import { sampleRecipes } from 'features/recipes/samples'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { IconButton } from 'lib/components/IconButton'
import { VirtualList } from 'lib/components/list/VirtualList'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { Snackbar } from 'lib/components/Snackbar'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useNotifications } from 'lib/hooks/useNotifications'
import { accountStore } from 'lib/stores/account'
import { uiStore } from 'lib/stores/ui'
import { synchronizeRecipes } from 'lib/utils/synchronization'

export const Recipes: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { notify } = useNotifications()
	const recipes = useQuery(recipesQuery())
	const addRecipes = useAddRecipes()
	const [container, setContainer] = useState<HTMLElement | null>(null)
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false)
	const { recipesViewMode, setRecipesViewMode } = uiStore.useStore()
	const navigate = useNavigate()
	const accountProvider = useAccountProvider()
	const { syncStatus, setSyncStatus } = accountStore.useStore()
	const setRecipes = useSetRecipes()

	const handleRecipesSync = async () => {
		if (accountProvider === undefined || recipes.data === undefined) {
			return
		}

		setIsLoading(true)

		try {
			const { recipes: syncedRecipes, syncStatus: newSyncStatus } = synchronizeRecipes({
				localRecipes: Object.fromEntries(recipes.data.map(recipe => [recipe.id, recipe])),
				remoteRecipes: await accountProvider.downloadRecipes(),
				syncStatus,
			})
			setSyncStatus(newSyncStatus)
			await accountProvider.uploadRecipes(syncedRecipes)
			await setRecipes.mutateAsync(Object.values(syncedRecipes))
		} catch (error) {
			notify(t('recipes.sync.error'), {
				action: {
					label: t('recipes.sync.ok'),
				},
			})
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (recipes.data?.length === 0) {
			const id = setTimeout(() => {
				notify(t('recipes.sampleRecipes.text'), {
					id: 'samples',
					duration: Number.POSITIVE_INFINITY,
					action: {
						label: t('recipes.sampleRecipes.add'),
						onClick: () => addRecipes.mutate(sampleRecipes),
					},
				})
			}, 2000)

			return () => clearTimeout(id)
		}
	}, [recipes.data?.length, addRecipes, notify, t])

	return (
		<Fragment>
			<TopAppBar
				configuration="small"
				title={t('paths.recipes')}
				progress={isLoading}
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
						<IconButton
							key="sync"
							icon="sync"
							title={t('recipes.sync.menuItem')}
							onClick={handleRecipesSync}
							isSelected={isLoading}
							disabled={accountProvider === undefined || recipes.data === undefined || isLoading}
							style={{
								animation: isLoading ? `${spinAnimation} 1s infinite` : undefined,
							}}
						/>
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
					<Snackbar
						text={t('recipes.listLoadError')}
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
					<VirtualList
						virtualProps={{ overscan: 10 }}
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
					</VirtualList>
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

const spinAnimation = keyframes({
	from: {
		rotate: '0deg',
	},
	to: {
		rotate: '-360deg',
	},
})

const FabContainer = styled('div', {
	base: {
		display: 'flex',
		paddingInline: 16,
		paddingBottom: 16,
		justifyContent: 'flex-end',
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
