import { expect } from 'vitest';

import { lemoniada, tartaZKremem } from 'services/recipes/providers/fixtures/doradcasmaku';
import { DoradcaSmakuProvider } from 'services/recipes/providers/websites/doradcasmaku';

const scrapeRecipe = async (data: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');
  const partialRecipe = await DoradcaSmakuProvider.scrapper(doc);
  partialRecipe.id = '1';

  return partialRecipe;
};

describe('scrapper', () => {
  it('should scrape valid recipe', async () => {
    const recipe = await scrapeRecipe(lemoniada);
    expect(recipe).toMatchSnapshot();
  });

  it('should scrape valid recipe with ingredients groups', async () => {
    const recipe = await scrapeRecipe(tartaZKremem);
    expect(recipe).toMatchSnapshot();
  });
});
