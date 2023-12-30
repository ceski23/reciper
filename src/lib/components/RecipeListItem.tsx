import { styled } from '@macaron-css/react'
import { animated, useInView } from '@react-spring/web'
import chickenSoup from 'assets/images/chicken_soup.jpg'
import { PATHS } from 'lib/routing/paths'
import { ListItem } from './list/items'

export const RecipeListItem = () => {
	const [ref /* inView */] = useInView()
	// TODO: Fix inifinite loop
	// const style = useSpring({
	// 	to: {
	// 		opacity: inView ? 1 : 0,
	// 		y: inView ? 0 : 50,
	// 	},
	// })

	return (
		<AnimatedListItem
			// style={style}
			ref={ref}
			overline="Kwestia smaku"
			title="Sunday chicken soup"
			text="12 ingredients  •  30 minutes"
			leadingElement={<RecipeImage src={chickenSoup} />}
			size="3line"
			to={PATHS.RECIPES.RECIPE.buildPath({ id: 'rosół' })}
		/>
	)
}

const RecipeImage = styled('img', {
	base: {
		width: 56,
		height: 56,
		borderRadius: 8,
	},
})

const AnimatedListItem = animated(ListItem.Link)
