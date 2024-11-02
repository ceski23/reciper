import { Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { useQuery } from '@tanstack/react-query'
import { counting, isEmpty, sort } from 'radash'
import { type FunctionComponent, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { RecipeListItemSkeleton } from 'features/recipes/components/RecipeListItemSkeleton'
import { recipesQuery } from 'features/recipes/recipes'
import type { Recipe } from 'features/recipes/types'
import { Chip } from 'lib/components/Chip'
import { Icon } from 'lib/components/Icon'
import { List } from 'lib/components/list'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'
import { computeStyle } from 'lib/utils/dom'
import { FakeSearchBar } from './components/FakeSearchBar'
import { RecipeCardSkeleton } from './components/RecipeCardSkeleton'
import { TagsSkeleton } from './components/TagsSkeleton'

const recipeHasRating = (recipe: Recipe): recipe is Recipe & Required<Pick<Recipe, 'rating'>> => isDefined(recipe.rating)

export const Home: FunctionComponent = () => {
	const themeColor = useMemo(() => computeStyle('backgroundColor', theme.colors.background), [])
	const { t } = useTranslation()
	const recipes = useQuery(recipesQuery())
	const getRecentRecipes = (recipes: Array<Recipe>, amount: number) =>
		sort(recipes, recipe => recipe.addedDate, true)
			.slice(0, amount)
	const getTopRecipes = (recipes: Array<Recipe>, amount: number) =>
		sort(recipes.filter(recipeHasRating), recipe => recipe.rating, true)
			.slice(0, amount)
	const getMostCommonTags = (recipes: Array<Recipe>, amount: number) =>
		sort(
			Object
				.entries(counting(recipes.flatMap(recipe => recipe.tags), tag => tag)),
			([, count]) => count,
			true,
		).slice(0, amount).map(([key]) => key)

	return (
		<Container>
			<Helmet>
				<meta
					name="theme-color"
					content={themeColor}
				/>
			</Helmet>
			<FakeSearchBar
				leadingIcon="search"
				placeholder={t('home.searchBarPlaceholder')}
				style={{ gridColumn: '2' }}
			/>
			{recipes.status === 'success' && isEmpty(recipes.data) && (
				<EmptyState>
					<Typography.TitleLarge>
						{t('home.emptyMessage')}
					</Typography.TitleLarge>
				</EmptyState>
			)}
			{(recipes.isLoading || !isEmpty(recipes.data)) && (
				<FullbleedSection>
					<Typography.TitleMedium style={{ paddingInline: 16 }}>
						{t('home.recentRecipes')}
					</Typography.TitleMedium>
					<CardsList>
						{recipes.status === 'pending' && Array.from({ length: 3 }, (_, index) => <RecipeCardSkeleton key={index} />)}
						{recipes.status === 'success' && getRecentRecipes(recipes.data, 10).map(recipe => (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
							/>
						))}
					</CardsList>
				</FullbleedSection>
			)}
			{(recipes.isLoading || !isEmpty(recipes.data)) && (
				<Section>
					<Typography.TitleMedium>
						{t('home.mostCommonTags')}
					</Typography.TitleMedium>
					<CompositeProvider>
						<TagsContainer>
							{recipes.status === 'pending' && <TagsSkeleton />}
							{recipes.status === 'success' && getMostCommonTags(recipes.data, 15).map(tag => (
								<CompositeItem
									key={tag}
									render={(
										<StyledChip
											text={tag}
											variant="outlined"
											to="/recipes/search"
											search={{ query: tag }}
										/>
									)}
								/>
							))}
						</TagsContainer>
					</CompositeProvider>
				</Section>
			)}
			{(recipes.isLoading || !isEmpty(recipes.data)) && (
				<FullbleedSection>
					<Typography.TitleMedium style={{ paddingInline: 16 }}>
						{t('home.topRecipes')}
					</Typography.TitleMedium>
					<List.Root>
						{recipes.status === 'pending' && Array.from({ length: 5 }, (_, index) => <RecipeListItemSkeleton key={index} />)}
						{recipes.status === 'success' && getTopRecipes(recipes.data, 10).map(recipe => (
							<RecipeListItem
								key={recipe.id}
								recipe={recipe}
								details={(
									<ListItemDetail>
										{recipe.rating}
										<ListItemIcon name="star" />
									</ListItemDetail>
								)}
							/>
						))}
					</List.Root>
				</FullbleedSection>
			)}
		</Container>
	)
}

const Container = styled('div', {
	base: {
		display: 'grid',
		gridTemplateColumns: '16px 1fr 16px',
		paddingBlock: 16,
		rowGap: 24,
	},
})

const StyledChip = styled(Chip, {
	base: {
		flex: '1 0 auto',
		textDecoration: 'unset',
	},
})

const TagsContainer = styled(Composite, {
	base: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
})

const Section = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
		gridColumn: '2',
	},
})

const FullbleedSection = styled(Section, {
	base: {
		gridColumn: '1 / -1',
	},
})

const CardsList = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
		paddingInline: 16,
		overflowX: 'scroll',
		scrollSnapType: 'x mandatory',
	},
})

const ListItemIcon = styled(Icon, {
	base: {
		width: 16,
		height: 16,
	},
})

const ListItemDetail = styled('span', {
	base: {
		display: 'flex',
		alignItems: 'center',
		gap: 4,
	},
})

const EmptyState = styled('div', {
	base: {
		gridColumn: '1 / -1',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBlock: '128px',
	},
})
