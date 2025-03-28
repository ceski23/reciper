import * as Ariakit from '@ariakit/react'
import { List } from '@components/list'
import { RecipeListItem } from '@components/RecipeListItem'
import { SegmentedButton } from '@components/SegmentedButton'
import { useIsMobile } from '@hooks/useIsMobile'
import { globalStyle } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { uiStore } from '@stores/ui'
import { theme } from '@styles/theme'
import { mq } from '@styles/utils'
import { type ComponentPropsWithoutRef, forwardRef, type ReactElement } from 'react'
import { match, P } from 'ts-pattern'
import { type Recipe } from 'features/recipes/types'
import { RecipeListItemSkeleton } from './components/RecipeListItemSkeleton'
import { RecipesGrid } from './RecipesGrid'

type RecipesContainerProps = {
	recipes?: Array<Recipe>
	isLoading?: boolean
	scrollRestorationId?: string
	listProps?: ComponentPropsWithoutRef<typeof List.Root> & {
		isSelecting?: boolean
	}
	listHeader?: ReactElement
}

export const RecipesContainer = forwardRef<HTMLDivElement, RecipesContainerProps>(({
	recipes,
	isLoading,
	scrollRestorationId = 'recipesList',
	listProps: {
		isSelecting,
		...listProps
	} = {},
	listHeader,
}, ref) => {
	const { recipesViewMode, setRecipesViewMode } = uiStore.useStore()
	const isMobile = useIsMobile()

	return (
		<Container>
			{!isMobile && (
				<Toolbar>
					<Ariakit.RadioProvider
						value={recipesViewMode}
						setValue={value => setRecipesViewMode(value === 'list' ? value : 'grid')}
					>
						<Ariakit.RadioGroup render={<SegmentedButton.Root />}>
							<Ariakit.Radio
								value="grid"
								render={(
									<SegmentedButton.Segment
										label="Grid view"
										icon="viewGrid"
										density="-2"
									/>
								)}
							/>
							<Ariakit.Radio
								value="list"
								render={(
									<SegmentedButton.Segment
										label="List view"
										icon="viewList"
										density="-2"
									/>
								)}
							/>
						</Ariakit.RadioGroup>
					</Ariakit.RadioProvider>
				</Toolbar>
			)}
			{match([isLoading, recipes, recipesViewMode])
				.with([true, P._, P._], () => (
					<div>
						{Array.from({ length: 8 }, (_, index) => <RecipeListItemSkeleton key={index} />)}
					</div>
				))
				.with([P._, P.nonNullable, 'grid'], ([, recipes]) => (
					<StyledRecipesGrid
						recipes={recipes}
						ref={ref}
					/>
				))
				.with([P._, P.nonNullable, 'list'], ([, recipes]) => (
					<RecipesList
						virtual={{ overscan: 2 }}
						scrollRestorationId={scrollRestorationId}
						ref={ref}
						{...listProps}
					>
						{listHeader}
						{recipes.map(recipe => (
							<RecipeListItem
								key={recipe.id}
								recipe={recipe}
								isSelectionMode={isSelecting}
							/>
						))}
					</RecipesList>
				))
				.otherwise(() => null)}
		</Container>
	)
})

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		height: '100%',
		paddingBottom: 16,
	},
})

const RecipesList = styled(List.Root, {
	base: {
		'@media': {
			[mq.atLeast('md')]: {
				backgroundColor: theme.colors.surfaceContainerLow,
				borderRadius: 12,
				overflow: 'hidden',
				maxWidth: '800px',
			},
		},
	},
})

const Toolbar = styled('div', {
	base: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
})

const StyledRecipesGrid = styled(RecipesGrid, {
	base: {
		paddingInline: 16,
		'@media': {
			[mq.atLeast('md')]: {
				paddingInline: 0,
			},
		},
	},
})

globalStyle(`${Container}:has([data-transitioning="transitioning"]) a:not([data-transitioning="transitioning"])`, {
	opacity: 0.5,
	filter: 'grayscale(0.5)',
})
