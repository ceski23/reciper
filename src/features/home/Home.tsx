import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useQuery } from '@tanstack/react-query'
import { countBy, identity } from 'ramda'
import { Fragment, type FunctionComponent } from 'react'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { recipesQuery } from 'features/recipes/recipes'
import { type Recipe } from 'features/recipes/types'
import { Chip } from 'lib/components/Chip'
import { List } from 'lib/components/list/List'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'
import { FakeSearchBar } from './components/FakeSearchBar'
import Icon from '~virtual/svg-component'

const recipeHasRating = (recipe: Recipe): recipe is Recipe & Required<Pick<Recipe, 'rating'>> => isDefined(recipe.rating)

export const Home: FunctionComponent = () => {
	const recipes = useQuery(recipesQuery())
	const getRecentRecipes = (recipes: Array<Recipe>, amount: number) =>
		[...recipes]
			.sort((a, b) => b.addedDate - a.addedDate)
			.slice(0, amount)
	const getTopRecipes = (recipes: Array<Recipe>, amount: number) =>
		recipes
			.filter(recipeHasRating)
			.sort((a, b) => b.rating - a.rating)
			.slice(0, amount)
	const getMostCommonTags = (recipes: Array<Recipe>, amount: number) =>
		Object
			.entries(countBy<string>(identity)(recipes.flatMap(recipe => recipe.tags)))
			.sort(([, a], [, b]) => b - a)
			.slice(0, amount)
			.map(([key]) => key)

	return (
		<Container>
			<FakeSearchBar
				leadingIcon="search"
				placeholder="What do you want to eat?"
				style={{ gridColumn: '2' }}
			/>
			{recipes.data === undefined || recipes.data.length === 0 ? 'No recipes' : (
				<Fragment>
					<FullbleedSection>
						<Typography.TitleMedium style={{ paddingInline: 16 }}>
							Recently added
						</Typography.TitleMedium>
						<CardsList>
							{getRecentRecipes(recipes.data, 10).map(recipe => (
								<RecipeCard
									key={recipe.id}
									recipe={recipe}
								/>
							))}
						</CardsList>
					</FullbleedSection>
					<Section>
						<Typography.TitleMedium>
							Most common tags
						</Typography.TitleMedium>
						<TagsContainer
							type="multiple"
							value={[]}
						>
							{getMostCommonTags(recipes.data, 15).map(tag => (
								<ToggleGroup.Item
									key={tag}
									value={tag}
									asChild
								>
									<StyledChip
										text={tag}
										variant="outlined"
									/>
								</ToggleGroup.Item>
							))}
						</TagsContainer>
					</Section>
					<FullbleedSection>
						<Typography.TitleMedium style={{ paddingInline: 16 }}>
							Top rated
						</Typography.TitleMedium>
						<List>
							{getTopRecipes(recipes.data, 10).map(recipe => (
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
						</List>
					</FullbleedSection>
				</Fragment>
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
	},
})

const TagsContainer = styled(ToggleGroup.Root, {
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

const ListItemDetail = styled('div', {
	base: {
		display: 'flex',
		alignItems: 'center',
		gap: 4,
	},
})
