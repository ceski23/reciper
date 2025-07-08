import { describe, expect, it } from 'vitest'
import { recipe1, recipe2, recipe3, recipe4, recipe5 } from './kwestiasmaku.fixtures'
import { kwestiasmaku } from '../kwestiasmaku'
import { createRecipe, scrapeRecipe } from './utils'

describe('should parse recipes from kwestiasmaku', async () => {
	it('should parse recipe for Krem Pomidorowy', async () => {
		const partialRecipe = await scrapeRecipe(kwestiasmaku, recipe1)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Clafoutis', async () => {
		const partialRecipe = await scrapeRecipe(kwestiasmaku, recipe2)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Wiosenna sałatka ziemniaczana ze szparagami i rzodkiewkami', async () => {
		const partialRecipe = await scrapeRecipe(kwestiasmaku, recipe3)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Babeczki twarogowe z jabłkami', async () => {
		const partialRecipe = await scrapeRecipe(kwestiasmaku, recipe4)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should parse recipe for Kurczak w sosie bazyliowym z pomidorkami koktajlowymi', async () => {
		const partialRecipe = await scrapeRecipe(kwestiasmaku, recipe5)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})
})
