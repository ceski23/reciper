import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type FunctionComponent } from 'react'
import { Chip } from 'lib/components/Chip'
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
		/>
		<TagsSection>
			<Typography.TitleMedium>
				Most common tags
			</Typography.TitleMedium>
			<TagsContainer type="multiple">
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
		</TagsSection>
	</Container>
)

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		padding: 16,
		gap: 24,
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

const TagsSection = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
	},
})
