import { describe, expect, it } from 'vitest'
import { extractMicrodata } from '../microdata'
import { recipe1 } from './microdata.fixtures'

describe('should scrape recipes using Microdata format', () => {
	const scrapeRecipe = async (data: string) => extractMicrodata(new DOMParser().parseFromString(data, 'text/html'))

	it('should scrape valid recipe for Gofry bananowe', async () => {
		expect(await scrapeRecipe(recipe1)).toMatchSnapshot()
	})

	it('should not found recipe', async () => {
		await expect(scrapeRecipe(/* html */ `
          <div>
            <p>This is not recipe</p>
          </div>
        `)).rejects.toThrow('Couldn\'t find recipe')
	})

	it('should detect recipe\'s title', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <h2 itemprop="name">Test recipe</h2>
                </div>
            `)

			expect(recipe.name).toBe('Test recipe')
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <meta itemprop="name" content="Test recipe" />
                </div>
            `)

			expect(recipe.name).toBe('Test recipe')
		}
	})

	it('should detect recipe\'s image', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <img itemprop="image" src="test.jpg" />
                </div>
            `)

			expect(recipe.image).toBe('test.jpg')
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <meta itemprop="image" content="test.jpg" />
                </div>
            `)

			expect(recipe.image).toBe('test.jpg')
		}
	})

	it('should detect recipe\'s description', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <p itemprop="description">Testing test</p>
                </div>
            `)

			expect(recipe.description).toBe('Testing test')
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <meta itemprop="description" content="Testing test" />
                </div>
            `)

			expect(recipe.description).toBe('Testing test')
		}
	})

	it('should detect recipe\'s instructions', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                  <span itemprop="recipeInstructions">Test test test</span>
                </div>
            `)

			expect(recipe.instructions).toEqual([
				{ text: 'Test test test' },
			])
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <div itemscope itemtype="http://schema.org/Recipe">
                <span itemprop="recipeInstructions">Test1</span>
                <span itemprop="recipeInstructions">Test2</span>
                <span itemprop="recipeInstructions">Test3</span>
                </div>
            `)

			expect(recipe.instructions).toEqual([
				{ text: 'Test1' },
				{ text: 'Test2' },
				{ text: 'Test3' },
			])
		}
	})

	it('should detect recipe\'s preparation time', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <div itemscope itemtype="http://schema.org/Recipe">
            <meta itemprop="prepTime" content="PT10M" />
          </div>
        `)

		expect(recipe.prepTime).toBe(10)
	})

	it('should detect recipe\'s rating', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <div itemscope itemtype="http://schema.org/Recipe">
            <span itemprop="ratingValue">4.8</span>
          </div>
        `)

		expect(recipe.rating).toBe(4.8)
	})

	it('should detect recipe\'s calories', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <div itemscope itemtype="http://schema.org/Recipe">
            <span itemprop="calories">540 calories</span>
          </div>
        `)

		expect(recipe.calories).toBe(540)
	})

	it('should detect recipe\'s ingredients', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <div itemscope itemtype="http://schema.org/Recipe">
            <span itemprop="recipeIngredient">Test1</span>
            <span itemprop="recipeIngredient">Test2</span>
          </div>
        `)

		expect(recipe.ingredients).toStrictEqual([
			{ text: 'Test1' },
			{ text: 'Test2' },
		])
	})
})
