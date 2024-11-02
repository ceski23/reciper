import * as Ariakit from '@ariakit/react'
import { Icon } from '@components/Icon'
import { Link } from '@components/Link'
import { styled } from '@macaron-css/react'
import { animated, useInView, useSpring } from '@react-spring/web'
import type { CSSProperties, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import type { Recipe } from 'features/recipes/types'
import { Typography } from 'lib/components/Typography'
import { useDynamicTheme } from 'lib/hooks'
import { useRipples } from 'lib/hooks/useRipples'
import { theme } from 'lib/styles'

type RecipeCardProps = {
	recipe: Recipe
	style?: CSSProperties
}

export const RecipeCard: FunctionComponent<RecipeCardProps> = ({ recipe, style: customStyle }) => {
	const { t } = useTranslation()
	const { eventHandlers, renderRipples } = useRipples()
	const [ref, inView] = useInView()
	const dynamicStyles = useDynamicTheme(recipe.color)
	const style = useSpring({
		to: {
			opacity: inView ? 1 : 0,
		},
	})

	const details = [
		t('recipes.details.ingredients', { count: recipe.ingredients.length }),
		recipe.prepTime ? t('recipes.details.prepTime', { count: recipe.prepTime }) : undefined,
	].filter(item => item !== undefined).join('  •  ')

	return (
		<Card
			style={{
				...customStyle,
				...dynamicStyles,
				...style,
			}}
			{...eventHandlers}
			render={(
				<Link
					ref={ref}
					to="/recipes/$id"
					params={{ id: recipe.id }}
				/>
			)}
		>
			{renderRipples}
			{recipe.image
				? <RecipeImage src={recipe.image} />
				: (
					<RecipeImageFallback>
						<Icon
							name="recipes"
							size={80}
						/>
					</RecipeImageFallback>
				)}
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

const Card = styled(animated(Ariakit.Role), {
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

const RecipeImageFallback = styled('div', {
	base: {
		display: 'flex',
		width: '100%',
		height: '100%',
		borderRadius: 8,
		backgroundColor: theme.colors.secondaryContainer,
		color: theme.colors.onSecondaryContainer,
		justifyContent: 'center',
		alignItems: 'center',
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
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
})
