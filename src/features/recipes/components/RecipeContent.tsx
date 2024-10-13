import { Composite, CompositeItem, CompositeProvider } from '@ariakit/react'
import { styled } from '@macaron-css/react'
import { group } from 'radash'
import { type CSSProperties, type FunctionComponent, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { IngredientsSection } from 'features/recipes/components/IngredientsSection'
import { type InsightItem, RecipeInsights } from 'features/recipes/components/RecipeInsights'
import { StepsSection } from 'features/recipes/components/StepsSection'
import type { Recipe } from 'features/recipes/types'
import { Chip } from 'lib/components2/Chip'
import { Skeleton } from 'lib/components2/Skeleton'
import { Typography } from 'lib/components2/Typography'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'

const Gallery = lazy(() => import('./Gallery'))
const RecipeCover = lazy(() => import('./RecipeCover'))

type RecipeContentProps = {
	recipe: Recipe
	style?: CSSProperties
}

export const RecipeContent: FunctionComponent<RecipeContentProps> = ({ recipe, style }) => {
	const { t } = useTranslation()

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
			{recipe.image && (
				<Suspense fallback={<Skeleton style={{ height: '200px' }} />}>
					<RecipeCover image={recipe.image} />
				</Suspense>
			)}
			<RecipeInsights items={[prepTime, calories, rating, servings].filter(isDefined)} />
			{recipe.description && (
				<Description>
					{recipe.description}
				</Description>
			)}
			{recipe.tags.length > 0 && (
				<Section>
					<Typography.TitleLarge>
						{t('recipes.mostCommonTags')}
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
			<IngredientsSection ingredients={recipe.ingredients} />
			{Object
				.entries(group(recipe.instructions, item => item.group ?? ''))
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
					<Suspense>
						<Gallery images={recipe.gallery} />
					</Suspense>
				</Section>
			)}
		</ContentContainer>
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
