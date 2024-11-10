import { useCheckboxContext } from '@ariakit/react'
import * as Ariakit from '@ariakit/react'
import { Icon } from '@components/Icon'
import { Link } from '@components/Link'
import { styled } from '@macaron-css/react'
import { animated, useInView } from '@react-spring/web'
import { theme } from '@styles/theme'
import { toggle } from 'radash'
import { type FunctionComponent, type ReactNode } from 'react'
import * as providers from 'features/recipes/providers/websites'
import type { Recipe } from 'features/recipes/types'
import { isDefined } from 'lib/utils'
import { List } from './list'

type RecipeListItemProps = {
	recipe: Recipe
	details?: ReactNode
	isSelectionMode?: boolean
}

export const RecipeListItem: FunctionComponent<RecipeListItemProps> = ({
	recipe,
	isSelectionMode,
	details = [
		`${recipe.ingredients.length} ingredients`,
		recipe.prepTime ? `${recipe.prepTime} minutes` : undefined,
	].filter(isDefined).join('  •  '),
}) => {
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
	const store = useCheckboxContext() as Ariakit.CheckboxStore<Array<string>> | undefined
	const isSelected = store?.useState().value.includes(recipe.id)
	const toggleSelection = () => store?.setValue(prev => toggle(prev, recipe.id))

	const handleLeadingElementClick = (event: React.MouseEvent) => {
		if (!store) return

		event.stopPropagation()
		event.preventDefault()

		toggleSelection()
	}

	return (
		<animated.div
			style={style}
			ref={ref}
		>
			<AnimatedListItem
				overline={provider?.name}
				title={recipe.name}
				text={details}
				leadingElement={isSelected
					? (
						<Ariakit.Checkbox render={<Checkbox onClick={handleLeadingElementClick} />}>
							<CheckboxIcon name="check" />
						</Ariakit.Checkbox>
					)
					: recipe.image
					? (
						<RecipeImage
							src={recipe.image}
							onClick={handleLeadingElementClick}
						/>
					)
					: (
						<RecipeImageFallback>
							<Icon
								name="recipes"
								size={32}
							/>
						</RecipeImageFallback>
					)}
				size="3line"
				onClick={isSelectionMode ? toggleSelection : undefined}
				variant="clickable"
				render={isSelectionMode ? undefined : (
					<Link
						to="/recipes/$id"
						params={{ id: recipe.id }}
					/>
				)}
			/>
		</animated.div>
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

const RecipeImageFallback = styled('div', {
	base: {
		display: 'flex',
		width: 56,
		height: 56,
		borderRadius: 8,
		backgroundColor: theme.colors.secondaryContainer,
		color: theme.colors.onSecondaryContainer,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

const Checkbox = styled('div', {
	base: {
		width: 56,
		height: 56,
		borderRadius: 8,
		backgroundColor: theme.colors.primary,
		color: theme.colors.onPrimary,
		padding: 12,
	},
})

const CheckboxIcon = styled(Icon, {
	base: {
		width: '100%',
		height: '100%',
	},
})

const AnimatedListItem = animated(List.SimpleItem)
