import { useResizeObserver } from '@hooks/useResizeObserver'
import { styled } from '@macaron-css/react'
import { useElementScrollRestoration } from '@tanstack/react-router'
import { cluster } from 'radashi'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'
import { VList, type VListHandle } from 'virtua'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { type Recipe } from 'features/recipes/types'

type RecipesGridProps = {
	recipes: Array<Recipe>
}

const calcColumns = (width: number) => {
	if (width < 400) {
		return 1
	} else if (width < 600) {
		return 2
	} else if (width < 750) {
		return 3
	} else {
		return 4
	}
}

export const RecipesGrid: FunctionComponent<RecipesGridProps> = ({ recipes }) => {
	const scrollEntry = useElementScrollRestoration({ id: 'recipesGrid' })
	const virtualListRefCallback = useCallback((handle: VListHandle | null) => scrollEntry && handle?.scrollTo(scrollEntry.scrollY), [scrollEntry])
	const contentRef = useResizeObserver<HTMLDivElement>(({ width }) => setColumns(calcColumns(width)))
	const [columns, setColumns] = useState(() => calcColumns(contentRef.current?.getBoundingClientRect().width ?? 0))
	const clusteredRecipes = useMemo(() => cluster(recipes, columns), [recipes, columns])

	return (
		<GridWrapper ref={contentRef}>
			<VList
				ref={virtualListRefCallback}
				data-scroll-restoration-id="recipesGrid"
			>
				{clusteredRecipes.map((group, index) => (
					<Row
						key={index}
						style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
					>
						{group.map(recipe => (
							<RecipeCard
								key={recipe.id}
								recipe={recipe}
								wrapperStyle={{ minWidth: 0 }}
							/>
						))}
					</Row>
				))}
			</VList>
		</GridWrapper>
	)
}

const GridWrapper = styled('div', {
	base: {
		height: '100%',
	},
})

const Row = styled('div', {
	base: {
		display: 'grid',
		gap: 16,
		marginTop: 16,
		':first-child': {
			marginLeft: 16,
		},
		':last-child': {
			marginRight: 16,
		},
	},
})
