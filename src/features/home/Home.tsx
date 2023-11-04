import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type FunctionComponent } from 'react'
import { RecipeListItem } from 'features/recipes/RecipeListItem'
import { Chip } from 'lib/components/Chip'
import { List } from 'lib/components/list/List'
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
							variant="suggestion"
							styleVariant="outlined"
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
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
		gridColumn: '1 / -1',
	},
})
