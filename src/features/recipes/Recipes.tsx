import { keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddByUrlDialog } from 'features/recipes/components/AddByUrlDialog'
import { AddRecipeDialog } from 'features/recipes/components/AddRecipeDialog'
import { recipesQuery, useAddRecipes } from 'features/recipes/recipes'
import { sampleRecipes } from 'features/recipes/samples'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { IconButton } from 'lib/components/IconButton'
import { MainContent } from 'lib/components/Layout'
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
		<MainContent>
			<TopAppBar
				key={String(container)}
				configuration="small"
				title={t('paths.recipes')}
				progress={isLoading}
				container={container}
				elevation={isListScrolled ? 'onScroll' : 'flat'}
				options={(
					<IconButton
						icon="sync"
						title={t('recipes.sync.menuItem')}
						onClick={() => setIsLoading(true)}
						isSelected={isLoading}
						style={{
							animation: isLoading ? `${spinAnimation} 1s infinite` : undefined,
						}}
					/>
				)}
			/>
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
		</MainContent>
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
