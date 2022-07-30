import { expect } from 'vitest';

import { isValidRecipe } from 'services/recipes';
import { butterbeer } from 'services/recipes/providers/fixtures/microdata';
import scrapper from 'services/recipes/providers/microdata';

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
      <div>
        <p>This is not recipe</p>
      </div>
    `)).rejects.toThrow('Couldn\'t find recipe');
  });

  it('should detect recipe\'s title', async () => {
    let recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <h2 itemprop="name">Test recipe</h2>
      </div>
    `);
    expect(recipe.name).toBe('Test recipe');

    recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <meta itemprop="name" content="Test recipe" />
      </div>
    `);
    expect(recipe.name).toBe('Test recipe');
  });

  it('should detect recipe\'s image', async () => {
    let recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <img itemprop="image" src="test.jpg" />
      </div>
    `);
    expect(recipe.image).toBe('test.jpg');

    recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <meta itemprop="image" content="test.jpg" />
      </div>
    `);
    expect(recipe.image).toBe('test.jpg');
  });

  it('should detect recipe\'s description', async () => {
    let recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <p itemprop="description">Testing test</p>
      </div>
    `);
    expect(recipe.description).toBe('Testing test');

    recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <meta itemprop="description" content="Testing test" />
      </div>
    `);
    expect(recipe.description).toBe('Testing test');
  });

  it('should detect recipe\'s instructions', async () => {
    let recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <span itemprop="recipeInstructions">Test test test</span>
      </div>
    `);

    expect(recipe.instructions).toStrictEqual([
      { text: 'Test test test' },
    ]);

    recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <span itemprop="recipeInstructions">Test1</span>
        <span itemprop="recipeInstructions">Test2</span>
        <span itemprop="recipeInstructions">Test3</span>
      </div>
    `);

    expect(recipe.instructions).toStrictEqual([
      { text: 'Test1' },
      { text: 'Test2' },
      { text: 'Test3' },
    ]);
  });

  it('should detect recipe\'s preparation time', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <meta itemprop="prepTime" content="PT10M" />
      </div>
    `);
    expect(recipe.prepTime).toBe(10);
  });

  it('should detect recipe\'s rating', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <span itemprop="ratingValue">4.8</span>
      </div>
    `);
    expect(recipe.rating).toBe(4.8);
  });

  it('should detect recipe\'s calories', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <span itemprop="calories">540 calories</span>
      </div>
    `);
    expect(recipe.calories).toBe(540);
  });

  it('should detect recipe\'s ingredients', async () => {
    const recipe = await scrapeRecipe(/* html */`
      <div itemscope itemtype="http://schema.org/Recipe">
        <span itemprop="recipeIngredient">Test1</span>
        <span itemprop="recipeIngredient">Test2</span>
      </div>
    `);

    expect(recipe.ingredients).toStrictEqual([
      { text: 'Test1' },
      { text: 'Test2' },
    ]);
  });
});
