import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { ScrapeRecipe } from 'features/recipes/ScrapeRecipe'

export const Route = createFileRoute('/recipes/scrape')({
	component: ScrapeRecipe,
	validateSearch: search =>
		v.parse(
			v.object({
				url: v.optional(v.string([v.url()])),
			}),
			search,
		),
})
