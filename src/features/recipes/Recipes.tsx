import { keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { AddByUrlDialog } from 'features/recipes/components/AddByUrlDialog'
import { AddRecipeDialog } from 'features/recipes/components/AddRecipeDialog'
import { recipesQuery, useAddRecipes } from 'features/recipes/recipes'
import { sampleRecipes } from 'features/recipes/samples'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { IconButton } from 'lib/components/IconButton'
import { VirtualList } from 'lib/components/list/VirtualList'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useDialogState } from 'lib/hooks/useDialogState'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useNotifications } from 'lib/hooks/useNotifications'

export const Recipes: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { notify } = useNotifications()
	const recipes = useQuery(recipesQuery())
	const addRecipes = useAddRecipes()
	const [container, setContainer] = useState<HTMLElement | null>(null)
	const { AnimateDialog: AnimateAddDialog, state: [, setIsAddDialogOpen] } = useDialogState(false)
	const { AnimateDialog: AnimateUrlDialog, state: [, setIsUrlDialogOpen] } = useDialogState(false)
	const [view, setView] = useState<'list' | 'grid'>('list')

	useEffect(() => {
		if (recipes.data?.length === 0) {
			const id = setTimeout(() => {
				notify(t('recipes.sampleRecipes.text'), {
					id: 'samples',
					duration: Infinity,
					action: {
						label: t('recipes.sampleRecipes.add'),
						onClick: () => addRecipes.mutate(sampleRecipes),
					},
				})
			}, 2000)

			return () => clearTimeout(id)
		}
	}, [recipes.data?.length])

	useEffect(() => {
		if (isLoading) {
			const id = setTimeout(() => {
				setIsLoading(false)
				notify(t('recipes.sync.error'), {
					action: {
						label: t('recipes.sync.ok'),
					},
				})
			}, 3000)

			return () => clearTimeout(id)
		}
	}, [isLoading, notify])

	return (
		<Fragment>
			<TopAppBar
				configuration="small"
				title={t('paths.recipes')}
				progress={isLoading}
				container={container}
				elevation={isListScrolled ? 'onScroll' : 'flat'}
				options={[
					(
						<IconButton
							key="view"
							icon={view === 'list' ? 'viewGrid' : 'viewList'}
							title={view === 'list' ? t('recipes.view.grid') : t('recipes.view.list')}
							onClick={() => setView(prev => prev === 'grid' ? 'list' : 'grid')}
						/>
					),
					(
						<IconButton
							key="sync"
							icon="sync"
							title={t('recipes.sync.menuItem')}
							onClick={() => setIsLoading(true)}
							isSelected={isLoading}
							style={{
								animation: isLoading ? `${spinAnimation} 1s infinite` : undefined,
							}}
						/>
					),
				]}
			/>
			{view === 'grid'
				? (
					<RecipesGrid>
						{renderProbe}
						{recipes.data?.map(recipe => (
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
					>
						{renderProbe}
						{recipes.data?.map(recipe => (
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
			<AnimateUrlDialog>
				<AddByUrlDialog onClose={() => setIsUrlDialogOpen(false)} />
			</AnimateUrlDialog>
			<AnimateAddDialog>
				<AddRecipeDialog
					onAddByUrl={() => {
						setIsUrlDialogOpen(true)
						setIsAddDialogOpen(false)
					}}
					onClose={() => setIsAddDialogOpen(false)}
				/>
			</AnimateAddDialog>
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
	},
})
