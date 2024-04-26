import { type Meta, Query, SearcherFactory } from '@m31coding/fuzzy-search'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { recipesQuery } from 'features/recipes/recipes'
import { type Recipe } from 'features/recipes/types'
import { type SearchParams } from 'features/search/Search'
import { isDefined } from 'lib/utils'

export const useRecipesSearch = ({ query, maxPreparationTime }: SearchParams) => {
	// eslint-disable-next-line react/hook-use-state
	const [searcher] = useState(() => SearcherFactory.createDefaultSearcher<Recipe, string>())
	const { data: recipes } = useQuery(recipesQuery())
	const [indexingMetadata, setIndexingMetadata] = useState<Meta>()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const filteredByQuery = useMemo(() => searcher.getMatches(new Query(query ?? '', 20)).matches, [
		searcher,
		query,
		indexingMetadata,
		maxPreparationTime,
	])
	const results = filteredByQuery.filter(recipe => {
		if (isDefined(recipe.entity.prepTime) && isDefined(maxPreparationTime) && recipe.entity.prepTime > maxPreparationTime) {
			return false
		}

		return true
	})

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

	return results
}
