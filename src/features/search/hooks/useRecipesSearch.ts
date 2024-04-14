import { type Meta, Query, SearcherFactory } from '@m31coding/fuzzy-search'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { recipesQuery } from 'features/recipes/recipes'
import { type Recipe } from 'features/recipes/types'

export type SearchFilters = {
	ingredients: Array<string>
	maxPreparationTime: number
}

export const useRecipesSearch = (query: string) => {
	// eslint-disable-next-line react/hook-use-state
	const [searcher] = useState(() => SearcherFactory.createDefaultSearcher<Recipe, string>())
	const { data: recipes } = useQuery(recipesQuery())
	const [indexingMetadata, setIndexingMetadata] = useState<Meta>()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const results = useMemo(() => searcher.getMatches(new Query(query, 20)), [searcher, query, indexingMetadata])

	useEffect(() => {
		if (recipes === undefined) return

		setIndexingMetadata(searcher.indexEntities(
			recipes,
			recipe => recipe.id,
			recipe => [
				recipe.name,
				...recipe.tags,
			],
		))
	}, [recipes, searcher])

	return results.matches
}
