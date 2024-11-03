import { describe, expect, it } from 'vitest'
import { recipe1, recipe2, recipe3, recipe4, recipe5 } from './aniagotuje.fixtures'
import { aniagotuje } from '../aniagotuje'
import { createRecipe, scrapeRecipe } from './utils'

describe('should parse recipes from aniagotuje', async () => {
	it('should parse recipe for Tarta dyniowa', async () => {
		const partialRecipe = await scrapeRecipe(aniagotuje, recipe1)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Wołowina po burgundzku', async () => {
		const partialRecipe = await scrapeRecipe(aniagotuje, recipe2)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Tort truskawkowy', async () => {
		const partialRecipe = await scrapeRecipe(aniagotuje, recipe3)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Placki dyniowe', async () => {
		const partialRecipe = await scrapeRecipe(aniagotuje, recipe4)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Zupa krem z pieczonych pomidorów', async () => {
		const partialRecipe = await scrapeRecipe(aniagotuje, recipe5)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})
})
