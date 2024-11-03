import { type ExpectationResult } from '@vitest/expect'
import { safeParse } from 'valibot'
import { expect, vi } from 'vitest'
import { recipeScheme } from 'features/recipes/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
vi.mock(import('lib/utils/images'), async _importOriginal => ({
	// TODO: make this work
	// ...await importOriginal(),
	getColorFromImage: async () => '#ffffff',
}))

expect.extend({
	toBeValidRecipe(recipe: unknown): ExpectationResult {
		const { success, issues } = safeParse(recipeScheme, recipe)
		const messages = issues?.map(issue => `${issue.path?.map(a => a.key)?.join('.')}: ${issue.message}`)

		return {
			pass: success,
			message: () => success ? 'Recipe is valid' : `Recipe is invalid\n\n${messages?.join('\n')}`,
		}
	},
})
