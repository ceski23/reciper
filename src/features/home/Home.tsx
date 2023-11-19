import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import chickenSoup from 'assets/images/chicken_soup.jpg'
import { type FunctionComponent } from 'react'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { Gallery } from 'features/recipes/components/Gallery'
import { Chip } from 'lib/components/Chip'
import { List } from 'lib/components/list/List'
import { RecipeListItem } from 'lib/components/RecipeListItem'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import { FakeSearchBar } from './components/FakeSearchBar'

const mockedTags = [
	'Girls dinner',
	'Polish cuisine',
	'Pork',
	'Fit',
	'Italian',
	'Dessert',
	'For kids',
	'Chicken',
	'New Year\'s Eve',
	'Quick breakfast',
	'Dinner',
]

export const Home: FunctionComponent = () => (
	<Container>
		<FakeSearchBar
			leadingIcon="search"
			placeholder="What do you want to eat?"
			style={{ gridColumn: '2' }}
		/>
		<FullbleedSection>
			<Gallery />
			<Typography.TitleMedium style={{ paddingInline: 16 }}>
				Recently added
			</Typography.TitleMedium>
			<CardsList>
				{Array.from({ length: 10 }, (_, index) => (
					<RecipeCard
						key={index}
						name="Sunday chicken soup"
						details={['6 ingredients', '2 hours']}
						image={chickenSoup}
					/>
				))}
			</CardsList>
		</FullbleedSection>
		<Section>
			<Typography.TitleMedium>
				Most common tags
			</Typography.TitleMedium>
			<TagsContainer type="single">
				{mockedTags.map(tag => (
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
				{Array.from({ length: 10 }, (_, index) => <RecipeListItem key={index} />)}
			</List>
		</FullbleedSection>
	</Container>
)

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
