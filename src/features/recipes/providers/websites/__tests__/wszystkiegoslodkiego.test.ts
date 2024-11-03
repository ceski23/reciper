import { describe, expect, it } from 'vitest'
import { recipe1, recipe2 } from './wszystkiegoslodkiego.fixtures'
import { wszystkiegoslodkiego } from '../wszystkiegoslodkiego'

describe('should parse recipes from Wszystkiego Słodkiego', async () => {
	it('should parse recipe for Ciasto z dyni', async () => {
		expect(await wszystkiegoslodkiego.scrape(new DOMParser().parseFromString(recipe1, 'text/html'))).toMatchSnapshot()
	})

	it('should parse recipe for Tiramisu', async () => {
		expect(await wszystkiegoslodkiego.scrape(new DOMParser().parseFromString(recipe2, 'text/html'))).toMatchSnapshot()
	})
})
