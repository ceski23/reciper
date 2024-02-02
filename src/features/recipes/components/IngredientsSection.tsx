import { styled } from '@macaron-css/react'
import { group } from 'radash'
import { type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Recipe } from 'features/recipes/types'
import { IconButton } from 'lib/components/IconButton'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import { IngredientItem } from './IngredientItem'

type IngredientsSectionProps = {
	ingredients: Recipe['ingredients']
	initialServingsCount?: number
}

export const IngredientsSection: FunctionComponent<IngredientsSectionProps> = ({ ingredients, initialServingsCount }) => {
	const { t } = useTranslation()
	const [servingsCount, setServingsCount] = useState(initialServingsCount ?? 1)

	const groups = group(ingredients, item => item.group ?? '')

	return Object.entries(groups).map(([name, ingredients]) =>
		ingredients
			? (
				<Container key={name}>
					<Header>
						<Typography.TitleLarge>
							{name || t('recipes.ingredients.title')}
						</Typography.TitleLarge>
						<HeaderCount>{t('recipes.ingredients.amount', { count: ingredients.length })}</HeaderCount>
					</Header>
					<Spinbox>
						<IconButton
							icon="minus"
							title={t('recipes.ingredients.decrease')}
							onClick={() => setServingsCount(prev => Math.max(prev - 1, 1))}
						/>
						<Typography.LabelLarge>
							{t('recipes.ingredients.servings', { count: servingsCount })}
						</Typography.LabelLarge>
						<IconButton
							icon="plus"
							title={t('recipes.ingredients.increase')}
							onClick={() => setServingsCount(prev => prev + 1)}
						/>
					</Spinbox>
					<IngredientsList>
						{ingredients.map((ingredient, index) => (
							<IngredientItem
								ingredient={ingredient}
								key={index}
							/>
						))}
					</IngredientsList>
				</Container>
			)
			: undefined
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
		color: theme.colors.onBackground,
	},
})

const Header = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
})

const HeaderCount = styled(Typography.LabelMedium, {
	base: {
		color: theme.colors.onSurfaceVariant,
	},
})

const Spinbox = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.colors.secondaryContainer,
		borderRadius: 12,
		paddingInline: 16,
		paddingBlock: 8,
		gap: 16,
	},
})

// const Grammage = styled('span', {
// 	base: {
// 		fontWeight: 'bold',
// 	},
// })

const IngredientsList = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 16,
	},
})
