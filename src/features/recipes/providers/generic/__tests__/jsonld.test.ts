import { describe, expect, it } from 'vitest'
import { createRecipe } from 'features/recipes/providers/websites/__tests__/utils'
import { extractJsonLD } from '../jsonld'
import { recipe1, recipe2, recipe3, recipe4, recipe5 } from './jsonld.fixtures'

describe('should scrape recipes using LD+JSON format', () => {
	const scrapeRecipe = async (data: string) => extractJsonLD(new DOMParser().parseFromString(data, 'text/html'))

	it('should scrape valid recipe for Shepherd’s Pie', async () => {
		const partialRecipe = await scrapeRecipe(recipe1)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should scrape valid recipe for Homemade Buttery Flaky Pie Crust', async () => {
		const partialRecipe = await scrapeRecipe(recipe2)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should scrape valid recipe for Pecan Pie', async () => {
		const partialRecipe = await scrapeRecipe(recipe3)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should scrape valid recipe for Apple Cranberry Pie', async () => {
		const partialRecipe = await scrapeRecipe(recipe4)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should scrape valid recipe for Creamy Chicken Casserole', async () => {
		const partialRecipe = await scrapeRecipe(recipe5)

		expect(partialRecipe).toMatchSnapshot()
		expect(createRecipe(partialRecipe)).toBeValidRecipe()
	})

	it('should not found recipe', async () => {
		await expect(scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Nothing"
            }
          </script>
        `)).rejects.toThrow('No JSON-LD data available')
	})

	it('should detect recipe\'s title', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "name": "Test recipe"
            }
          </script>
        `)

		expect(recipe.name).toBe('Test recipe')
	})

	it('should detect recipe\'s image', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "image": "test.jpg"
                  }
                </script>
              `)

			expect(recipe.image).toBe('test.jpg')
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "image": ["test.jpg", "test2.png"]
                  }
                </script>
              `)

			expect(recipe.image).toBe('test.jpg')
		}
	})

	it('should detect recipe\'s description', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "description": "Testing test"
            }
          </script>
        `)

		expect(recipe.description).toBe('Testing test')
	})

	it('should detect recipe\'s instructions', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "recipeInstructions": [
                      { "@type": "HowToStep", "text": "Test1" },
                      { "@type": "HowToStep", "text": "Test2" },
                      { "@type": "HowToStep", "text": "Test3" }
                    ]
                  }
                </script>
              `)

			expect(recipe.instructions).toStrictEqual([
				{ text: 'Test1' },
				{ text: 'Test2' },
				{ text: 'Test3' },
			])
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "recipeInstructions": {
                      "@type": "HowToSection",
                      "steps": "Test1"
                    }
                  }
                </script>
              `)

			expect(recipe.instructions).toStrictEqual([
				{ text: 'Test1' },
			])
		}
		// TODO: test for another forms of instructions (HowToStep etc.)
	})

	it('should detect recipe\'s preparation time', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "prepTime": "PT10M"
            }
          </script>
        `)

		expect(recipe.prepTime).toBe(10)
	})

	it('should detect recipe\'s servings', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "recipeYield": "1 loaf"
            }
          </script>
        `)

		expect(recipe.servings).toBe(1)
	})

	it('should detect recipe\'s rating', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4"
              }
            }
          </script>
        `)

		expect(recipe.rating).toBe(4)
	})

	it('should detect recipe\'s calories', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "nutrition": {
                "@type": "NutritionInformation",
                "calories": "240 calories"
              }
            }
          </script>
        `)

		expect(recipe.calories).toBe(240)
	})

	it('should detect recipe\'s ingredients', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "recipeIngredient": [
                "Test1",
                "Test2"
              ]
            }
          </script>
        `)

		expect(recipe.ingredients).toStrictEqual([
			{ text: 'Test1' },
			{ text: 'Test2' },
		])
	})

	it('should detect recipe\'s tags', async () => {
		const recipe = await scrapeRecipe(/* html */ `
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "recipeCategory": "Test1",
              "recipeCuisine": "Test2"
            }
          </script>
        `)

		expect(recipe.tags).toStrictEqual(['test1', 'test2'])
	})

	it('should detect recipe\'s images', async () => {
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "image": "test.jpg"
                  }
                </script>
              `)

			expect(recipe.gallery).toStrictEqual(['test.jpg'])
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "image": {
                      "@type": "ImageObject",
                      "url": "test.jpg",
                      "width": 1,
                      "height": 1
                    }
                  }
                </script>
              `)

			expect(recipe.gallery).toStrictEqual(['test.jpg'])
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "image": [
                      {
                        "@type": "ImageObject",
                        "url": "test1.jpg",
                        "width": 1,
                        "height": 1
                      },
                      {
                        "@type": "ImageObject",
                        "url": "test2.jpg",
                        "width": 1,
                        "height": 1
                      }
                    ]
                  }
                </script>
              `)

			expect(recipe.gallery).toStrictEqual(['test1.jpg', 'test2.jpg'])
		}
		{
			const recipe = await scrapeRecipe(/* html */ `
                <script type="application/ld+json">
                  {
                    "@context": "https://schema.org/",
                    "@type": "Recipe",
                    "image": ["test1.jpg", "test2.jpg"]
                  }
                </script>
              `)

			expect(recipe.gallery).toStrictEqual(['test1.jpg', 'test2.jpg'])
		}
	})
})
