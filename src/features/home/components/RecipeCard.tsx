import { styled } from '@macaron-css/react'
import { animated, useInView, useSpring } from '@react-spring/web'
import { type FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { type Recipe } from 'features/recipes/types'
import { Typography } from 'lib/components/Typography'
import { useRipples } from 'lib/hooks/useRipples'
import { PATHS } from 'lib/routing/paths'
import { theme } from 'lib/styles'

type RecipeCardProps = {
	recipe: Recipe
}

export const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe }) => {
	const { eventHandlers, renderRipples } = useRipples()
	const [ref, inView] = useInView()
	const style = useSpring({
		to: {
			opacity: inView ? 1 : 0,
		},
	})

	const details = [
		`${recipe.ingredients.length} ingredients`,
		recipe.prepTime ? `${recipe.prepTime} minutes` : undefined,
	].filter(item => item !== undefined).join('  •  ')

	return (
		<Card
			style={style}
			ref={ref}
			to={PATHS.RECIPES.RECIPE.buildPath({ id: recipe.id })}
			unstable_viewTransition
			{...eventHandlers}
		>
			{renderRipples}
			<RecipeImage src={recipe.image} />
			<Info>
				<Name>
					{recipe.name}
				</Name>
				<Details>
					{details}
				</Details>
			</Info>
		</Card>
	)
}

const Card = styled(animated(Link), {
	base: {
		width: 220,
		height: 250,
		backgroundColor: theme.colors.surfaceContainerHighest,
		color: theme.colors.onSurface,
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 12,
		overflow: 'hidden',
		flexShrink: 0,
		scrollSnapAlign: 'center',
		textDecoration: 'unset',
		position: 'relative',
	},
})

const RecipeImage = styled('img', {
	base: {
		width: '100%',
		flex: 1,
		minHeight: 0,
		objectFit: 'cover',
	},
})

const Info = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		gap: 4,
		padding: 16,
	},
})

const Name = styled(Typography.TitleMedium, {
	base: {
		color: theme.colors.onSurface,
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
})

const Details = styled(Typography.BodyMedium, {
	base: {
		color: theme.colors.onSurfaceVariant,
	},
})
