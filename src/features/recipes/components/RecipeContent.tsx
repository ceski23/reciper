import { Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { mq } from '@styles/utils'
import { useMediaQuery } from '@uidotdev/usehooks'
import { groupBy } from 'es-toolkit'
import { type CSSProperties, type FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { IngredientsSection } from 'features/recipes/components/IngredientsSection'
import { type InsightItem, RecipeInsights } from 'features/recipes/components/RecipeInsights'
import { StepsSection } from 'features/recipes/components/StepsSection'
import type { Recipe } from 'features/recipes/types'
import { Chip } from 'lib/components/Chip'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'
import Gallery from './Gallery'
import RecipeCover from './RecipeCover'

type RecipeContentProps = {
	recipe: Recipe
	style?: CSSProperties
}

export const RecipeContent: FunctionComponent<RecipeContentProps> = ({ recipe, style }) => {
	const { t } = useTranslation()
	const shouldShowTwoColumns = useMediaQuery(mq.atLeast('lg'))

	const prepTime: InsightItem | undefined = recipe.prepTime
		? {
			icon: 'timer',
			text: t('recipes.details.prepTime', { count: recipe.prepTime }),
		}
		: undefined
	const calories: InsightItem | undefined = recipe.calories
		? {
			icon: 'fire',
			text: t('recipes.details.calories', { count: recipe.calories }),
		}
		: undefined
	const rating: InsightItem | undefined = recipe.rating
		? {
			icon: 'star',
			text: recipe.rating.toFixed(1),
		}
		: undefined
	const servings: InsightItem | undefined = recipe.servings
		? {
			icon: 'utensils',
			text: t('recipes.details.servings', { count: recipe.servings }),
		}
		: undefined

	return (
		<ContentContainer style={style}>
			<ContentColumn>
				{recipe.image && <RecipeCover image={recipe.image} />}
				<RecipeInsights items={[prepTime, calories, rating, servings].filter(isDefined)} />
				{recipe.description && (
					<Description>
						{recipe.description}
					</Description>
				)}
				{recipe.tags.length > 0 && (
					<Section>
						<Typography.TitleLarge>
							{t('recipes.tags')}
						</Typography.TitleLarge>
						<CompositeProvider>
							<TagsContainer>
								{recipe.tags.map(tag => (
									<CompositeItem
										key={tag}
										render={(
											<Tag
												text={tag}
												variant="outlined"
												to="/search"
												search={{ query: tag }}
											/>
										)}
									/>
								))}
							</TagsContainer>
						</CompositeProvider>
					</Section>
				)}
				{!shouldShowTwoColumns ? <IngredientsSection ingredients={recipe.ingredients} /> : null}
				{Object
					.entries(groupBy(recipe.instructions, item => item.group ?? ''))
					.map(([name, steps]) =>
						steps
							? (
								<StepsSection
									key={name}
									name={name}
									steps={recipe.instructions}
								/>
							)
							: null
					)}
				{recipe.gallery.length > 0 && (
					<Section>
						<Typography.TitleLarge>
							{t('recipes.gallery')}
						</Typography.TitleLarge>
						<Gallery images={recipe.gallery} />
					</Section>
				)}
			</ContentColumn>
			{shouldShowTwoColumns
				? (
					<RightColumn>
						<IngredientsSection ingredients={recipe.ingredients} />
					</RightColumn>
				)
				: null}
		</ContentContainer>
	)
}

const ContentContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		paddingInline: 16,
		paddingBottom: 32,
		gap: 32,
		'@media': {
			[mq.atLeast('md')]: {
				paddingInline: 0,
			},
			[mq.atLeast('lg')]: {
				overflow: 'auto',
			},
			[mq.atLeast('xl')]: {
				paddingInline: 0,
			},
		},
	},
})

const ContentColumn = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 32,
		flex: 1,
	},
})

const RightColumn = styled(ContentColumn, {
	base: {
		position: 'sticky',
		top: 0,
		overflow: 'auto',
	},
})

const Description = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurface,
		textAlign: 'justify',
	},
})

const Tag = styled(Chip, {
	base: {
		flex: '1 0 auto',
		textDecoration: 'unset',
		':last-child': {
			flexGrow: 0,
		},
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
	},
})
