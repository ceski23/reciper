import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import chickenSoup from 'assets/images/chicken_soup.jpg'
import { Fragment, type FunctionComponent, useState } from 'react'
import { Gallery } from 'features/recipes/components/Gallery'
import { IngredientsSection } from 'features/recipes/components/IngredientsSection'
import { RecipeInsights } from 'features/recipes/components/RecipeInsights'
import { StepsSection } from 'features/recipes/components/StepsSection'
import { Chip } from 'lib/components/Chip'
import { HeaderPortal } from 'lib/components/HeaderPortal'
import { IconButton } from 'lib/components/IconButton'
import { Menu } from 'lib/components/Menu'
import { TopAppBar } from 'lib/components/TopAppBar'
import { Typography } from 'lib/components/Typography'
import { useIsContainerScrolled } from 'lib/hooks/useIsContainerScrolled'
import { useNotifications } from 'lib/hooks/useNotifications'
import { theme } from 'lib/styles'

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

export const Recipe: FunctionComponent = () => {
	const [isMoreOpen, setIsMoreOpen] = useState(false)
	const [isListScrolled, setIsListScrolled] = useState(false)
	const renderProbe = useIsContainerScrolled(setIsListScrolled)
	const { notify } = useNotifications()

	const handleShareRecipe = () => {
		navigator.share({
			title: 'Rosół z kury',
			text:
				'Cudownie aromatyczny, pyszny i bardzo zdrowy rosół z kury lub też rosół z kurczaka. To przepis uniwersalny. Rosół możesz podać z makaronem, zacierkami lub też wykorzystać bulion jako baza do innych zup i sosów.',
			url: 'https://aniagotuje.pl/przepis/rosol-z-kury',
		}).catch(() => notify('There was an error while sharing recipe, try again'))
	}

	return (
		<Fragment>
			<HeaderPortal>
				<TopAppBar
					configuration="large"
					title="Rosół z kury"
					elevation={isListScrolled ? 'onScroll' : 'flat'}
					options={(
						<Menu.Root
							open={isMoreOpen}
							onOpenChange={setIsMoreOpen}
						>
							<Menu.Trigger asChild>
								<IconButton
									icon="more"
									title="More"
									isSelected={isMoreOpen}
								/>
							</Menu.Trigger>
							<Menu.Content open={isMoreOpen}>
								<Menu.Item
									text="Edit recipe"
									icon="pencil"
								/>
								{navigator.share !== undefined && (
									<Menu.Item
										text="Share recipe"
										icon="share"
										onClick={handleShareRecipe}
									/>
								)}
								<Menu.Item
									text="Delete recipe"
									icon="delete"
								/>
							</Menu.Content>
						</Menu.Root>
					)}
				/>
			</HeaderPortal>
			{renderProbe}
			<ContentContainer>
				<Cover src={chickenSoup} />
				<RecipeInsights
					items={[
						{ icon: 'timer', text: '2 hours' },
						{ icon: 'fire', text: '1500 kcal' },
						{ icon: 'star', text: '4.9' },
						{ icon: 'utensils', text: '2 servings' },
					]}
				/>
				<Description>
					Cudownie aromatyczny, pyszny i bardzo zdrowy rosół z kury lub też rosół z kurczaka. To przepis uniwersalny. Rosół możesz podać z
					makaronem, zacierkami lub też wykorzystać bulion jako baza do innych zup i sosów.
				</Description>
				<Section>
					<Typography.TitleLarge>
						Most common tags
					</Typography.TitleLarge>
					<TagsContainer
						type="multiple"
						value={[]}
					>
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
				<IngredientsSection />
				<StepsSection />
				<Section>
					<Typography.TitleLarge>
						Gallery
					</Typography.TitleLarge>
					<Gallery />
				</Section>
			</ContentContainer>
		</Fragment>
	)
}

const ContentContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		paddingInline: 16,
		paddingBottom: 32,
		gap: 32,
	},
})

const Cover = styled('img', {
	base: {
		width: '100%',
		height: 'auto',
		maxHeight: 200,
		objectFit: 'cover',
		borderRadius: 12,
	},
})

const Description = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurface,
		textAlign: 'justify',
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
	},
})
