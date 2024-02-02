import { styled } from '@macaron-css/react'
import { type FunctionComponent, useState } from 'react'
import { type Recipe } from 'features/recipes/types'
import { Icon } from 'lib/components/Icon'
import { Typography } from 'lib/components/Typography'
import { theme } from 'lib/styles'

type IngredientItemProps = {
	ingredient: Recipe['ingredients'][number]
}

export const IngredientItem: FunctionComponent<IngredientItemProps> = ({ ingredient }) => {
	const [isDone, setIsDone] = useState(false)

	return (
		<Container
			variant={isDone ? 'done' : undefined}
			onClick={() => setIsDone(prev => !prev)}
		>
			<IngredientIcon name={isDone ? 'check' : 'ingredient'} />
			<IngredientText>
				{ingredient.text}
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
	},
})
