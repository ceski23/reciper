import { expect } from 'vitest';

import { ciastoKruche, lemoniada } from 'services/recipes/providers/fixtures/kwestiasmaku';
import { KwestiaSmakuProvider } from 'services/recipes/providers/websites/kwestiasmaku';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await KwestiaSmakuProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(lemoniada);
    expect(recipe).toMatchSnapshot();
  });

  it('should scrape valid recipe with sub-recipes', async () => {
    const recipe = await scrapeRecipe(ciastoKruche);
    expect(recipe).toMatchSnapshot();
  });
});
