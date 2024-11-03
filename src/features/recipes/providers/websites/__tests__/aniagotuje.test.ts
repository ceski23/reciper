import { describe, expect, it } from 'vitest'
import { recipe1, recipe2, recipe3, recipe4, recipe5 } from './aniagotuje.fixtures'
import { aniagotuje } from '../aniagotuje'

describe('should parse recipes from aniagotuje', async () => {
	it('should parse recipe for Tarta dyniowa', async () => {
		expect(await aniagotuje.scrape(new DOMParser().parseFromString(recipe1, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Wołowina po burgundzku', async () => {
		expect(await aniagotuje.scrape(new DOMParser().parseFromString(recipe2, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Tort truskawkowy', async () => {
		expect(await aniagotuje.scrape(new DOMParser().parseFromString(recipe3, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Placki dyniowe', async () => {
		expect(await aniagotuje.scrape(new DOMParser().parseFromString(recipe4, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Zupa krem z pieczonych pomidorów', async () => {
		expect(await aniagotuje.scrape(new DOMParser().parseFromString(recipe5, 'text/html'))).toMatchSnapshot()
	})
})
