import { styled } from '@macaron-css/react'
import { Fragment, type FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { parseIngredient } from 'features/recipes/ingredients/parser'
import type { Recipe } from 'features/recipes/types'
import { Icon } from 'lib/components2/Icon'
import { Typography } from 'lib/components2/Typography'
import { styleUtils, theme } from 'lib/styles'

type IngredientItemProps = {
	ingredient: Recipe['ingredients'][number]
	servingsCount: number
}

export const IngredientItem: FunctionComponent<IngredientItemProps> = ({ ingredient, servingsCount }) => {
	const [isDone, setIsDone] = useState(false)
	const [, i18n] = useTranslation()
	const parsedIngredient = parseIngredient(ingredient.text)

	return (
		<Container
			variant={isDone ? 'done' : undefined}
			onClick={() => setIsDone(prev => !prev)}
		>
			<IngredientIcon name={isDone ? 'check' : 'ingredient'} />
			<IngredientText>
				{'quantity' in parsedIngredient
					? (
						<Fragment>
							{parsedIngredient.parsed.begin && <span>{parsedIngredient.parsed.begin}</span>}
							<QuantitySegment>
								{(parsedIngredient.quantity * servingsCount).toLocaleString(i18n.language, { maximumFractionDigits: 2 })}
							</QuantitySegment>
							{parsedIngredient.parsed.end && <span>{parsedIngredient.parsed.end}</span>}
						</Fragment>
					)
					: parsedIngredient.original}
			</IngredientText>
		</Container>
	)
}

const Container = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 16,
		alignItems: 'center',
		cursor: 'pointer',
		transition: 'background-color .2s, opacity .2s',
	},
	variants: {
		variant: {
			done: {
				opacity: 0.5,
				textDecoration: 'line-through',
			},
		},
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
		gap: 4,
	},
})

const QuantitySegment = styled('span', {
	base: {
		fontWeight: 600,
		color: theme.colors.primary,
		backgroundColor: styleUtils.transparentize(theme.colors.primary, 0.12),
		paddingInline: 4,
		paddingBlock: 2,
		borderRadius: 4,
		selectors: {
			'&:has(+ *)': {
				marginRight: 4,
			},
			'* + &': {
				marginLeft: 4,
			},
		},
	},
})
