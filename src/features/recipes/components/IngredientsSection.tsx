import { styled } from '@macaron-css/react'
import { groupBy } from 'ramda'
import { type FunctionComponent, useState } from 'react'
import { type Recipe } from 'features/recipes/samples'
import { IconButton } from 'lib/components/IconButton'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'
import Icon from '~virtual/svg-component'

type IngredientsSectionProps = {
	ingredients: Recipe['ingredients']
	initialServingsCount?: number
}

export const IngredientsSection: FunctionComponent<IngredientsSectionProps> = ({ ingredients, initialServingsCount }) => {
	const [servingsCount, setServingsCount] = useState(initialServingsCount ?? 1)

	const groups = groupBy(item => item.group ?? '', ingredients)

	return Object.entries(groups).map(([name, ingredients]) =>
		ingredients
			? (
				<Container key={name}>
					<Header>
						<Typography.TitleLarge>
							{name || 'Ingredients'}
						</Typography.TitleLarge>
						<HeaderCount>{ingredients.length} products</HeaderCount>
					</Header>
					<Spinbox>
						<IconButton
							icon="minus"
							title="Decrease servings"
							onClick={() => setServingsCount(prev => Math.max(prev - 1, 1))}
						/>
						<Typography.LabelLarge>{servingsCount} servings</Typography.LabelLarge>
						<IconButton
							icon="plus"
							title="Increase servings"
							onClick={() => setServingsCount(prev => prev + 1)}
						/>
					</Spinbox>
					<IngredientsList>
						{ingredients.map((ingredient, index) => (
							<IngredientItem key={index}>
								<IngredientIcon name="ingredient" />
								<IngredientText>
									{ingredient.text}
								</IngredientText>
							</IngredientItem>
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

const IngredientItem = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
		alignItems: 'center',
	},
})

const IngredientIcon = styled(Icon, {
	base: {
		width: 48,
		height: 48,
		borderRadius: 12,
		padding: 12,
		backgroundColor: theme.colors.secondaryContainer,
		color: theme.colors.onPrimaryContainer,
	},
})

const IngredientText = styled(Typography.BodyMedium, {
	base: {
		flex: 1,
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
