import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { Search, searchParamsSchema } from 'features/search/Search'

export const Route = createFileRoute('/search')({
	component: Search,
	validateSearch: search => v.parse(searchParamsSchema, search),
})
