import { describe, expect, it } from 'vitest'
import { recipe1, recipe2, recipe3, recipe4, recipe5 } from './kwestiasmaku.fixtures'
import { kwestiasmaku } from '../kwestiasmaku'

describe('should parse recipes from kwestiasmaku', async () => {
	it('should parse recipe for Krem Pomidorowy', async () => {
		expect(await kwestiasmaku.scrape(new DOMParser().parseFromString(recipe1, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Clafoutis', async () => {
		expect(await kwestiasmaku.scrape(new DOMParser().parseFromString(recipe2, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Wiosenna sałatka ziemniaczana ze szparagami i rzodkiewkami', async () => {
		expect(await kwestiasmaku.scrape(new DOMParser().parseFromString(recipe3, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Babeczki twarogowe z jabłkami', async () => {
		expect(await kwestiasmaku.scrape(new DOMParser().parseFromString(recipe4, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Kurczak w sosie bazyliowym z pomidorkami koktajlowymi', async () => {
		expect(await kwestiasmaku.scrape(new DOMParser().parseFromString(recipe5, 'text/html'))).toMatchSnapshot()
	})
})
