import { useResizeObserver } from '@hooks/useResizeObserver'
import { globalStyle } from '@macaron-css/core'
import { styled } from '@macaron-css/react'
import { useElementScrollRestoration } from '@tanstack/react-router'
import mergeRefs from 'merge-refs'
import { cluster } from 'radashi'
import { forwardRef, useCallback, useMemo, useState } from 'react'
import { VList, type VListHandle } from 'virtua'
import { RecipeCard } from 'features/home/components/RecipeCard'
import { type Recipe } from 'features/recipes/types'

type RecipesGridProps = {
	recipes: Array<Recipe>
	className?: string
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

export const RecipesGrid = forwardRef<HTMLDivElement, RecipesGridProps>(({ recipes, className }, ref) => {
	const scrollEntry = useElementScrollRestoration({ id: 'recipesGrid' })
	const virtualListRefCallback = useCallback((handle: VListHandle | null) => scrollEntry && handle?.scrollTo(scrollEntry.scrollY), [scrollEntry])
	const contentRef = useResizeObserver<HTMLDivElement>(size => {
		if (size === undefined) return
		const newColumns = calcColumns(size.width)
		newColumns !== columns && setColumns(newColumns)
	})
	const [columns, setColumns] = useState<number>()
	const clusteredRecipes = useMemo(() => columns === undefined ? [] : cluster(recipes, columns), [recipes, columns])

	return (
		<GridWrapper
			ref={mergeRefs(ref, contentRef)}
			className={className}
		>
			{columns !== undefined && (
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
			)}
		</GridWrapper>
	)
})

const GridWrapper = styled('div', {
	base: {
		height: '100%',
		borderRadius: 12,
		overflow: 'auto',
	},
})

const Row = styled('div', {
	base: {
		display: 'grid',
		gap: 16,
		marginBottom: 16,
	},
})

globalStyle(`${GridWrapper}:has([data-transitioning="transitioning"]) a:not([data-transitioning="transitioning"])`, {
	opacity: 0.5,
	filter: 'grayscale(0.5)',
})
