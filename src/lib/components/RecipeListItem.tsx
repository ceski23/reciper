import { styled } from '@macaron-css/react'
import { animated, useInView } from '@react-spring/web'
import type { FunctionComponent, ReactNode } from 'react'
import * as providers from 'features/recipes/providers/websites'
import type { Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'
import { ListItem } from './list/items'

type RecipeListItemProps = {
	recipe: Recipe
	details?: ReactNode
}

export const RecipeListItem: FunctionComponent<RecipeListItemProps> = ({ recipe, details }) => {
	const defaultDetails = [
		`${recipe.ingredients.length} ingredients`,
		recipe.prepTime ? `${recipe.prepTime} minutes` : undefined,
	].filter(isDefined).join('  •  ')
	const [ref, style] = useInView(() => ({
		from: {
			opacity: 0,
			y: 50,
		},
		to: {
			opacity: 1,
			y: 0,
		},
	}), {
		once: true,
	})
	const provider = Object.values(providers).find(provider => provider.matcher.test(String(recipe.url)))

	return (
		<AnimatedListItem
			style={style}
			ref={ref}
			overline={provider?.name}
			title={recipe.name}
			text={details ?? defaultDetails}
			leadingElement={<RecipeImage src={recipe.image} />}
			size="3line"
			to="/recipes/$id"
			params={{ id: recipe.id }}
		/>
	)
}

const RecipeImage = styled('img', {
	base: {
		width: 56,
		height: 56,
		borderRadius: 8,
		objectFit: 'cover',
	},
})

const AnimatedListItem = animated(ListItem.Link)
