import { styled } from '@macaron-css/react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { type CSSProperties, type FunctionComponent, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IngredientsSection } from 'features/recipes/components/IngredientsSection'
import { type InsightItem, RecipeInsights } from 'features/recipes/components/RecipeInsights'
import { StepsSection } from 'features/recipes/components/StepsSection'
import { type Recipe } from 'features/recipes/types'
import { Chip } from 'lib/components/Chip'
import { Typography } from 'lib/components/Typography'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'
import { isDefined } from 'lib/utils'

const Gallery = lazy(() => import('./Gallery'))

type RecipeContentProps = {
	recipe: Recipe
	style?: CSSProperties
}

export const RecipeContent: FunctionComponent<RecipeContentProps> = ({ recipe, style }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

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
			<Cover src={recipe.image} />
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
					<TagsContainer
						type="multiple"
						value={[]}
					>
						{recipe.tags.map(tag => (
							<ToggleGroup.Item
								key={tag}
								value={tag}
								asChild
							>
								<StyledChip
									text={tag}
									variant="outlined"
									onClick={() => navigate(PATHS.RECIPES.SEARCH.buildPath({}, { query: tag }))}
								/>
							</ToggleGroup.Item>
						))}
					</TagsContainer>
				</Section>
			)}
			<IngredientsSection
				ingredients={recipe.ingredients}
				initialServingsCount={recipe.servings}
			/>
			<StepsSection steps={recipe.instructions} />
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

const Cover = styled('img', {
	base: {
		width: '100%',
		height: 200,
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
