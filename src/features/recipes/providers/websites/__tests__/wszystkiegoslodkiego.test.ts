import { describe, expect, it } from 'vitest'
import { recipe1, recipe2 } from './wszystkiegoslodkiego.fixtures'
import { wszystkiegoslodkiego } from '../wszystkiegoslodkiego'
import { createRecipe, scrapeRecipe } from './utils'

describe('should parse recipes from Wszystkiego Słodkiego', async () => {
	it('should parse recipe for Ciasto z dyni', async () => {
		const partialRecipe = await scrapeRecipe(wszystkiegoslodkiego, recipe1)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Tiramisu', async () => {
		const partialRecipe = await scrapeRecipe(wszystkiegoslodkiego, recipe2)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})
})
