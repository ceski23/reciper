// eslint-disable-next-line max-classes-per-file
import { expect } from 'vitest';

import { isValidRecipe } from 'services/recipes';
import { butterbeer } from 'services/recipes/providers/fixtures/jsonld';
import scrapper from 'services/recipes/providers/jsonld';

vi.stubGlobal('Image', class {
  onload: () => void;

  constructor() {
    this.onload = vi.fn();
    setTimeout(() => this.onload());
  }
});

vi.mock('colorthief', () => ({
  default: class {
    // eslint-disable-next-line class-methods-use-this
    getColor = () => [0, 0, 0];

    getPalette = () => [this.getColor()];
  },
}));

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(butterbeer);
    expect(recipe).toSatisfy(isValidRecipe);
  });

  it('should not found recipe', async () => {
    await expect(scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Nothing"
        }
      </script>
    `)).rejects.toThrow('No JSON-LD data available');
  });

  it('should detect recipe\'s title', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "name": "Test recipe"
        }
      </script>
    `);
    expect(recipe.name).toBe('Test recipe');
  });

  it('should detect recipe\'s image', async () => {
    let recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "image": "test.jpg"
        }
      </script>
    `);
    expect(recipe.image).toBe('test.jpg');

    recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "image": ["test.jpg", "test2.png"]
        }
      </script>
    `);
    expect(recipe.image).toBe('test.jpg');
  });

  it('should detect recipe\'s description', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "description": "Testing test"
        }
      </script>
    `);
    expect(recipe.description).toBe('Testing test');
  });

  it('should detect recipe\'s instructions', async () => {
    let recipe = await scrapeRecipe(/* html */`
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
    `);

    expect(recipe.instructions).toStrictEqual([
      { text: 'Test1' },
      { text: 'Test2' },
      { text: 'Test3' },
    ]);

    recipe = await scrapeRecipe(/* html */`
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
    `);

    expect(recipe.instructions).toStrictEqual([
      { text: 'Test1' },
    ]);

    // TODO: test for another forms of instructions (HowToStep etc.)
  });

  it('should detect recipe\'s preparation time', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "prepTime": "PT10M"
        }
      </script>
    `);
    expect(recipe.prepTime).toBe(10);
  });

  it('should detect recipe\'s servings', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "recipeYield": "1 loaf"
        }
      </script>
    `);
    expect(recipe.servings).toBe(1);
  });

  it('should detect recipe\'s rating', async () => {
    const recipe = await scrapeRecipe(/* html */`
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
    `);
    expect(recipe.rating).toBe(4);
  });

  it('should detect recipe\'s calories', async () => {
    const recipe = await scrapeRecipe(/* html */`
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
    `);
    expect(recipe.calories).toBe(240);
  });

  it('should detect recipe\'s ingredients', async () => {
    const recipe = await scrapeRecipe(/* html */`
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
    `);

    expect(recipe.ingredients).toStrictEqual([
      { text: 'Test1' },
      { text: 'Test2' },
    ]);
  });

  it('should detect recipe\'s tags', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "recipeCategory": "Test1",
          "recipeCuisine": "Test2"
        }
      </script>
    `);
    expect(recipe.tags).toStrictEqual(['test1', 'test2']);
  });

  it('should detect recipe\'s images', async () => {
    let recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "image": "test.jpg"
        }
      </script>
    `);
    expect(recipe.gallery).toStrictEqual(['test.jpg']);

    recipe = await scrapeRecipe(/* html */`
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
    `);
    expect(recipe.gallery).toStrictEqual(['test.jpg']);

    recipe = await scrapeRecipe(/* html */`
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
    `);
    expect(recipe.gallery).toStrictEqual(['test1.jpg', 'test2.jpg']);

    recipe = await scrapeRecipe(/* html */`
      <script type="application/ld+json">
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "image": ["test1.jpg", "test2.jpg"]
        }
      </script>
    `);
    expect(recipe.gallery).toStrictEqual(['test1.jpg', 'test2.jpg']);
  });
});
