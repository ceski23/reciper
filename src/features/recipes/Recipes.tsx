import { keyframes } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, type FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { recipesQuery, useAddRecipes } from 'features/recipes/recipes'
import { sampleRecipes } from 'features/recipes/samples'
import { ContentOverlayPortal } from 'lib/components/ContentOverlayPortal'
import { FloatingActionButton } from 'lib/components/FloatingActionButton'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { VirtualList } from 'lib/components/list/VirtualList'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { TopAppBar } from 'lib/components/TopAppBar'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useNotifications } from 'lib/hooks/useNotifications'
import { PATHS } from 'lib/routing/paths'

export const Recipes: FunctionComponent = () => {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { notify } = useNotifications()
	const navigate = useNavigate()
	const recipes = useQuery(recipesQuery())
	const addRecipes = useAddRecipes()

	useEffect(() => {
		if (recipes.data?.length === 0) {
			const id = setTimeout(() => {
				notify('You have no recipes saved. Do you want to add some sample recipes?', {
					id: 'samples',
					duration: Infinity,
					action: {
						label: 'Add',
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
				notify('Error while syncing recipes', {
					action: {
						label: 'OK',
					},
				})
			}, 3000)

			return () => clearTimeout(id)
		}
	}, [isLoading, notify])

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="small"
					title={t('paths.recipes')}
					progress={isLoading}
					elevation={isListScrolled ? 'onScroll' : 'flat'}
					options={(
						<IconButton
							icon="sync"
							title="Sync recipes"
							onClick={() => setIsLoading(true)}
							isSelected={isLoading}
							style={{
								animation: isLoading ? `${spinAnimation} 1s infinite` : undefined,
							}}
						/>
					)}
				/>
			</HeaderPortal>
			<VirtualList virtualProps={{ overscan: 10 }}>
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
						label="Add recipe"
						type="button"
						variant="primary"
						size={isListScrolled ? undefined : 'expanded'}
						onClick={() =>
							navigate(
								PATHS.RECIPES.SCRAPE.buildPath({}, { url: 'https://aniastarmach.pl/przepis/tarta-z-truskawkami/' }),
								{
									unstable_viewTransition: true,
								},
							)}
					/>
				</FabContainer>
			</ContentOverlayPortal>
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
