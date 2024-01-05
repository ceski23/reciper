import { styled } from '@macaron-css/react'
import { animated, useInView } from '@react-spring/web'
import { type FunctionComponent } from 'react'
import { PROVIDERS } from 'features/recipes/providers/scrapper'
import { type Recipe } from 'features/recipes/types'
import { PATHS } from 'lib/routing/paths'
import { ListItem } from './list/items'

type RecipeListItemProps = {
	recipe: Recipe
}

export const RecipeListItem: FunctionComponent<RecipeListItemProps> = ({ recipe }) => {
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

	const provider = PROVIDERS.find(provider => provider.matcher.test(String(recipe.url)))

	const details = [
		`${recipe.ingredients.length} ingredients`,
		recipe.prepTime ? `${recipe.prepTime} minutes` : undefined,
	].filter(item => item !== undefined).join('  •  ')

	return (
		<AnimatedListItem
			style={style}
			ref={ref}
			overline={provider?.name}
			title={recipe.name}
			text={details}
			leadingElement={<RecipeImage src={recipe.image} />}
			size="3line"
			to={PATHS.RECIPES.RECIPE.buildPath({ id: recipe.id })}
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
